import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Meu Perfil | TechHub",
  description: "Visualize e edite seu perfil",
};

export default function PerfilPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 mx-auto max-w-3xl">
          {/* Profile Header */}
          <Card className="bg-card border-border mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">Usuário Demo</h1>
                  <p className="text-muted-foreground">@usuario_demo</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      usuario@email.com
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Membro desde Mar 2024
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShoppingBag className="w-4 h-4" />
                      2 produtos
                    </div>
                  </div>
                </div>
                <div className="md:ml-auto">
                  <Button variant="outline" className="gap-2">
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-purple-400">2</p>
                <p className="text-sm text-muted-foreground">Produtos</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-green-400">15</p>
                <p className="text-sm text-muted-foreground">Artigos Lidos</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-purple-400">7</p>
                <p className="text-sm text-muted-foreground">Dias Ativo</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Atividade Recente</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                  <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Comprou "SaaS Starter Kit"</p>
                    <p className="text-sm text-muted-foreground">Há 2 dias</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                  <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Assinou a newsletter</p>
                    <p className="text-sm text-muted-foreground">Há 5 dias</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
