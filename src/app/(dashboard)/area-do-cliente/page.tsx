import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  ShoppingBag,
  Download,
  Settings,
  FileCode,
  Video,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Área do Cliente | TechHub",
  description: "Gerencie seus produtos e configurações",
};

// Mock data - in production, fetch from database
const userProducts = [
  {
    id: "1",
    name: "SaaS Starter Kit",
    type: "software",
    purchaseDate: "2024-03-10",
    downloadUrl: "#",
  },
  {
    id: "2",
    name: "TypeScript Avançado",
    type: "course",
    purchaseDate: "2024-02-15",
    accessUrl: "#",
  },
];

export default function AreaClientePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Área do Cliente</h1>
            <p className="text-muted-foreground">
              Gerencie seus produtos e configurações de conta
            </p>
          </div>

          <Tabs defaultValue="produtos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="produtos" className="gap-2">
                <ShoppingBag className="w-4 h-4" />
                Produtos
              </TabsTrigger>
              <TabsTrigger value="perfil" className="gap-2">
                <User className="w-4 h-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="configuracoes" className="gap-2">
                <Settings className="w-4 h-4" />
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="produtos">
              <Card className="bg-card border-border">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Seus Produtos</h2>
                </CardHeader>
                <CardContent>
                  {userProducts.length > 0 ? (
                    <div className="space-y-4">
                      {userProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-background"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center">
                              {product.type === "software" ? (
                                <FileCode className="w-6 h-6 text-green-400" />
                              ) : (
                                <Video className="w-6 h-6 text-green-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Comprado em{" "}
                                {new Date(product.purchaseDate).toLocaleDateString(
                                  "pt-BR"
                                )}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            {product.type === "software" ? (
                              <>
                                <Download className="w-4 h-4" />
                                Download
                              </>
                            ) : (
                              <>
                                <ExternalLink className="w-4 h-4" />
                                Acessar
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Nenhum produto ainda</h3>
                      <p className="text-muted-foreground mb-4">
                        Explore nossa loja e encontre produtos para acelerar sua
                        evolução
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Ver Produtos
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="perfil">
              <Card className="bg-card border-border">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Seu Perfil</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Usuário Demo</h3>
                      <p className="text-muted-foreground">usuario@email.com</p>
                      <Badge className="mt-2 bg-purple-600/20 text-purple-400">
                        Membro desde Mar 2024
                      </Badge>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Nome</label>
                      <input
                        type="text"
                        defaultValue="Usuário Demo"
                        className="px-4 py-2 rounded-lg border border-border bg-background"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        defaultValue="usuario@email.com"
                        className="px-4 py-2 rounded-lg border border-border bg-background"
                      />
                    </div>
                    <Button className="w-fit bg-purple-600 hover:bg-purple-700">
                      Salvar Alterações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="configuracoes">
              <Card className="bg-card border-border">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Configurações</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Notificações</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span>Newsletter por email</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span>Notificações de novos artigos</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span>Atualizações de produtos</span>
                        <input type="checkbox" className="toggle" />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-border">
                    <h3 className="font-medium">Segurança</h3>
                    <Button variant="outline">Alterar Senha</Button>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-border">
                    <h3 className="font-medium text-destructive">Zona de Perigo</h3>
                    <Button variant="destructive">Excluir Conta</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
