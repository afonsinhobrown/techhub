import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ShoppingBag,
  Headphones,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { getAdminStats, getAdminArticles, getAdminProducts, getAdminSubscribers } from "@/lib/admin";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  const recentArticles = (await getAdminArticles()).slice(0, 3);
  const recentProducts = (await getAdminProducts()).slice(0, 3);
  const recentSubscribers = (await getAdminSubscribers()).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex">
        <AdminSidebar />

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Visão geral da sua plataforma
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/artigos/novo">
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4" />
                  Novo Artigo
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Artigos</p>
                    <p className="text-3xl font-bold">{stats.articlesCount}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Produtos</p>
                    <p className="text-3xl font-bold">{stats.productsCount}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Episódios</p>
                    <p className="text-3xl font-bold">{stats.episodesCount}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Assinantes</p>
                    <p className="text-3xl font-bold">{stats.subscribersCount}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Card */}
          <Card className="bg-card border-border mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-green-600/20 flex items-center justify-center">
                    <DollarSign className="w-7 h-7 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Faturamento Total</p>
                    <p className="text-3xl font-bold text-green-400">
                      MT {stats.totalRevenue.toLocaleString("pt-MZ", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">{stats.purchasesCount} vendas</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Articles */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Artigos Recentes</CardTitle>
                <Link href="/admin/artigos">
                  <Button variant="ghost" size="sm">Ver todos</Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background"
                  >
                    <div>
                      <p className="font-medium line-clamp-1">{article.title}</p>
                      <p className="text-sm text-muted-foreground">{article.category}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${article.published ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                      {article.published ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Products */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Produtos</CardTitle>
                <Link href="/admin/produtos">
                  <Button variant="ghost" size="sm">Ver todos</Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{product.type}</p>
                    </div>
                    <p className="font-bold text-green-400">
                      MT {product.price.toLocaleString("pt-MZ", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Subscribers */}
          <Card className="bg-card border-border mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Assinantes Recentes</CardTitle>
              <Link href="/admin/assinantes">
                <Button variant="ghost" size="sm">Ver todos</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-sm text-muted-foreground">Email</th>
                      <th className="text-left py-2 text-sm text-muted-foreground">Nome</th>
                      <th className="text-left py-2 text-sm text-muted-foreground">Status</th>
                      <th className="text-left py-2 text-sm text-muted-foreground">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSubscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-border/50">
                        <td className="py-3 text-sm">{sub.email}</td>
                        <td className="py-3 text-sm text-muted-foreground">{sub.name || "-"}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded ${sub.confirmed ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                            {sub.confirmed ? "Confirmado" : "Pendente"}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {new Date(sub.created_at).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
