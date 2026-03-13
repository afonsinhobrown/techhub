import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Headphones,
  Play,
  Clock,
  Calendar,
  ExternalLink,
  Youtube,
  Video,
} from "lucide-react";
import { getPodcastEpisodes } from "@/lib/podcast";

export const metadata: Metadata = {
  title: "Podcast | TechHub",
  description:
    "Episódios sobre desenvolvimento, IA, carreira e tecnologia. Ouça onde quiser.",
  openGraph: {
    title: "Podcast | TechHub",
    description: "Episódios sobre desenvolvimento, IA, carreira e tecnologia.",
    type: "website",
  },
};

function formatDuration(seconds: number | null | undefined): string {
  if (!seconds) return "N/A";
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
}

export default async function PodcastPage() {
  const episodes = await getPodcastEpisodes();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Podcast</h1>
                  <p className="text-muted-foreground">TechHub Talks</p>
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-8">
                Conversas descontraídas sobre desenvolvimento, IA, carreira e
                tecnologia. Ouça no seu player favorito.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2 bg-[#1DB954] hover:bg-[#1ed760]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Spotify
                  </Button>
                </a>
                <a
                  href="https://podcasts.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 3.6a8.36 8.36 0 018.364 8.357v.003a.6.6 0 01-1.2 0 7.162 7.162 0 00-7.164-7.16.6.6 0 010-1.2zm0 3.66a4.71 4.71 0 014.708 4.71.6.6 0 01-1.2 0 3.51 3.51 0 00-3.508-3.51.6.6 0 010-1.2zm-.078 3.078a1.627 1.627 0 11.003 3.254 1.627 1.627 0 01-.003-3.254zm-3.093.992a.517.517 0 01.525.503v6.714a.525.525 0 01-.525.525h-1.5a.525.525 0 01-.525-.525v-6.68a.517.517 0 01.503-.537z" />
                    </svg>
                    Apple Podcasts
                  </Button>
                </a>
                <a
                  href="https://youtube.com/@techhub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2 bg-red-600 hover:bg-red-700 text-white border-red-600">
                    <Youtube className="w-5 h-5" />
                    YouTube
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Video Trailer Section */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-6">
              <Video className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold">Trailer do Podcast</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Video Player */}
              <div className="aspect-video bg-black rounded-xl overflow-hidden border border-border shadow-lg">
                <video
                  className="w-full h-full"
                  controls
                  playsInline
                  poster="/images/podcast-thumbnail.png"
                  preload="auto"
                >
                  <source src="/videos/podcast-trailer.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold mb-3">
                  TechHub Talks: Onde Tecnologia encontra Comunidade
                </h3>
                <p className="text-muted-foreground mb-4">
                  Jovens profissionais negros discutindo as últimas tendências em IA,
                  desenvolvimento de software e carreira tech. Uma conversa autêntica
                  sobre os desafios e oportunidades no mundo da tecnologia.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                    Inteligência Artificial
                  </Badge>
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                    Desenvolvimento
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                    Carreira
                  </Badge>
                </div>
                <a
                  href="https://youtube.com/@techhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span>Inscreva-se no canal do TechHub</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes List */}
        <section className="py-12">
          <div className="container px-4 mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold mb-8">Todos os Episódios</h2>

            {episodes.length > 0 ? (
              <div className="space-y-4">
                {episodes.map((episode) => (
                  <Card
                    key={episode.id}
                    className="bg-card border-border hover:border-purple-500/50 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Play Button */}
                        <button className="w-14 h-14 rounded-xl bg-purple-600 hover:bg-purple-700 flex items-center justify-center flex-shrink-0 transition-colors">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="secondary"
                              className="bg-purple-600/20 text-purple-400"
                            >
                              EP {episode.episode_number.toString().padStart(2, "0")}
                            </Badge>
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {formatDuration(episode.duration)}
                            </span>
                            {episode.published_at && (
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {new Date(episode.published_at).toLocaleDateString("pt-BR")}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-bold mb-2">
                            {episode.title}
                          </h3>

                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {episode.description || "Sem descrição disponível."}
                          </p>

                          <div className="flex gap-3">
                            {episode.spotify_url && (
                              <a
                                href={episode.spotify_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Spotify
                              </a>
                            )}
                            {episode.apple_url && (
                              <a
                                href={episode.apple_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Apple
                              </a>
                            )}
                            {/* YouTube link for episodes */}
                            <a
                              href="https://youtube.com/@techhub"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              YouTube
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-border rounded-xl bg-card">
                <Headphones className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhum episódio ainda</h3>
                <p className="text-muted-foreground mb-4">
                  Novos episódios serão adicionados em breve!
                </p>
                <p className="text-muted-foreground text-sm">
                  Enquanto isso,{" "}
                  <a
                    href="https://youtube.com/@techhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300"
                  >
                    inscreva-se no nosso canal do YouTube
                  </a>{" "}
                  para ser notificado quando lançarmos.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Subscribe CTA */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Não perca nenhum episódio</h2>
              <p className="text-muted-foreground mb-6">
                Assine o podcast no seu player favorito e receba novos episódios
                automaticamente.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2 bg-[#1DB954] hover:bg-[#1ed760]">
                    Seguir no Spotify
                  </Button>
                </a>
                <a
                  href="https://youtube.com/@techhub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2 bg-red-600 hover:bg-red-700 text-white border-red-600">
                    <Youtube className="w-5 h-5" />
                    Inscrever no YouTube
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
