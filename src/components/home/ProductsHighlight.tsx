import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, ArrowRight, FileCode, Video, Users, Lock } from "lucide-react";
import { db } from "@/lib/db";

const typeIcons: Record<string, React.ReactNode> = {
  software: <FileCode className="w-6 h-6 text-green-400" />,
  course: <Video className="w-6 h-6 text-green-400" />,
  consulting: <Users className="w-6 h-6 text-green-400" />,
};

const typeLabels: Record<string, string> = {
  software: "Sistema",
  course: "Curso",
  consulting: "Consultoria",
};

export async function ProductsHighlight() {
  // Buscar produtos ativos do banco
  const allProducts = await db.products.findMany({
    where: { active: true },
    orderBy: { created_at: "desc" },
    take: 6,
  });

  // Se não há produtos, não mostrar a seção
  if (allProducts.length === 0) {
    return null;
  }

  // Mostrar 3 públicos, o resto fica bloqueado
  const visibleCount = 3;
  const visible = allProducts.slice(0, visibleCount);
  const hasLocked = allProducts.length > visibleCount;
  const lockedCount = allProducts.length - visibleCount;

  return (
    <section className="py-16 md:py-24 bg-card border-y border-border">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Produtos em Destaque
            </h2>
            <p className="text-muted-foreground">
              Soluções criadas para acelerar tua evolução
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visible.map((product) => (
            <Card
              key={product.id}
              className="bg-background border-border hover:border-green-500/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center mb-4">
                  {typeIcons[product.type] || <ShoppingBag className="w-6 h-6 text-green-400" />}
                </div>

                <p className="text-sm text-green-400 mb-2">
                  {typeLabels[product.type] || product.type}
                </p>

                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  {product.name}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {product.description || "Sem descrição"}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-green-400">
                    MT {product.price.toLocaleString("pt-MZ", { minimumFractionDigits: 2 })}
                  </p>
                  <Link href={`/produtos/${product.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1 text-green-400 hover:text-green-300 hover:bg-green-600/10">
                      <ShoppingBag className="w-4 h-4" />
                      Ver
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Locked Products - Requires Login */}
        {hasLocked && (
          <Card className="bg-background border-border relative overflow-hidden mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-purple-500/10 backdrop-blur-sm z-10" />
            <CardContent className="p-6 relative z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">
                      +{lockedCount} produtos disponíveis
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faça login ou cadastre-se para ver todos os produtos
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/registro">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
