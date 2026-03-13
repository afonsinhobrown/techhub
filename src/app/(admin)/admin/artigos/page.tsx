import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getAdminArticles, deleteArticle } from "@/lib/admin";

export default async function AdminArtigosPage() {
  const articles = await getAdminArticles();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex">
        <AdminSidebar />

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Artigos</h1>
              <p className="text-muted-foreground">
                Gerencie todos os artigos do blog
              </p>
            </div>
            <Link href="/admin/artigos/novo">
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
                Novo Artigo
              </Button>
            </Link>
          </div>

          {/* Articles Table */}
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Título</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Categoria</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Views</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Data</th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article.id} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium line-clamp-1">{article.title}</p>
                            <p className="text-xs text-muted-foreground">/{article.slug}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                            {article.category}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-xs px-2 py-1 rounded ${article.published ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                            {article.published ? "Publicado" : "Rascunho"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">
                          {article.views || 0}
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">
                          {new Date(article.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/blog/${article.slug}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/artigos/${article.id}/editar`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <form action={async () => { "use server"; await deleteArticle(article.id); }}>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {articles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum artigo encontrado</p>
                  <Link href="/admin/artigos/novo">
                    <Button variant="link" className="mt-2">Criar primeiro artigo</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
