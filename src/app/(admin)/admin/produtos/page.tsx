import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getAdminProducts, deleteProduct } from "@/lib/admin";

const typeLabels: Record<string, string> = {
  software: "Sistema",
  course: "Curso",
  consulting: "Consultoria",
};

export default async function AdminProdutosPage() {
  const products = await getAdminProducts();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex">
        <AdminSidebar />

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Produtos</h1>
              <p className="text-muted-foreground">
                Gerencie produtos, cursos e consultorias
              </p>
            </div>
            <Link href="/admin/produtos/novo">
              <Button className="gap-2 bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4" />
                Novo Produto
              </Button>
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-card border-border">
                <CardContent className="p-6">
                  {/* Product Image Placeholder */}
                  <div className="h-32 bg-gradient-to-br from-green-600/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl">
                      {product.type === "software" ? "💻" : product.type === "course" ? "🎓" : "🤝"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                      {typeLabels[product.type] || product.type}
                    </Badge>
                    <span className={`text-xs px-2 py-1 rounded ${product.active ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}>
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description || "Sem descrição"}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-green-400">
                      R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product._count.purchases} vendas
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/produtos/${product.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Eye className="w-3 h-3" />
                        Ver
                      </Button>
                    </Link>
                    <Link href={`/admin/produtos/${product.id}/editar`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Edit className="w-3 h-3" />
                        Editar
                      </Button>
                    </Link>
                    <form action={async () => { "use server"; await deleteProduct(product.id); }}>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {products.length === 0 && (
            <Card className="bg-card border-border">
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">Nenhum produto encontrado</p>
                <Link href="/admin/produtos/novo">
                  <Button variant="link" className="mt-2">Criar primeiro produto</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
