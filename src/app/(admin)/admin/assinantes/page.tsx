import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAdminSubscribers } from "@/lib/admin";

export default async function AdminAssinantesPage() {
  const subscribers = await getAdminSubscribers();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex">
        <AdminSidebar />

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Assinantes</h1>
              <p className="text-muted-foreground">
                Gerencie os inscritos na newsletter
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Total: <span className="font-bold text-foreground">{subscribers.length}</span> | 
                Confirmados: <span className="font-bold text-green-400">{subscribers.filter(s => s.confirmed).length}</span>
              </p>
            </div>
          </div>

          {/* Subscribers Table */}
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Email</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Nome</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Confirmado em</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Cadastrado em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-4 px-6 font-medium">{subscriber.email}</td>
                        <td className="py-4 px-6 text-muted-foreground">{subscriber.name || "-"}</td>
                        <td className="py-4 px-6">
                          <span className={`text-xs px-2 py-1 rounded ${subscriber.confirmed ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                            {subscriber.confirmed ? "Confirmado" : "Pendente"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">
                          {subscriber.confirmedAt ? new Date(subscriber.confirmedAt).toLocaleDateString("pt-BR") : "-"}
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">
                          {new Date(subscriber.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {subscribers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum assinante encontrado</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Export Button */}
          <div className="mt-6 flex justify-end">
            <a
              href="/api/admin/subscribers/export"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Exportar CSV
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
