import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Play, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getPodcastEpisodes, deletePodcastEpisode } from "@/lib/podcast";

function formatDuration(seconds: number | null | undefined): string {
  if (!seconds) return "N/A";
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
}

export default async function AdminPodcastsPage() {
  const episodes = await getPodcastEpisodes();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex">
        <AdminSidebar />

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Podcast</h1>
              <p className="text-muted-foreground">
                Gerencie os episódios do podcast
              </p>
            </div>
            <Link href="/admin/podcasts/novo">
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
                Novo Episódio
              </Button>
            </Link>
          </div>

          {/* Episodes Table */}
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">#</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Título</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Duração</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Links</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Data</th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {episodes.map((episode) => (
                      <tr key={episode.id} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-4 px-6">
                          <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                            EP {episode.episodeNumber.toString().padStart(2, "0")}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-medium line-clamp-1">{episode.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{episode.description}</p>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">
                          {formatDuration(episode.duration)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            {episode.spotifyUrl && (
                              <a href={episode.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            {episode.appleUrl && (
                              <a href={episode.appleUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">
                          {episode.publishedAt ? new Date(episode.publishedAt).toLocaleDateString("pt-BR") : "Não publicado"}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/podcasts/${episode.id}/editar`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <form action={async () => { "use server"; await deletePodcastEpisode(episode.id); }}>
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

              {episodes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum episódio encontrado</p>
                  <Link href="/admin/podcasts/novo">
                    <Button variant="link" className="mt-2">Criar primeiro episódio</Button>
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
