"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Podcast {
  id: string;
  title: string;
  description: string | null;
  spotify_url: string | null;
  apple_url: string | null;
  duration: number | null;
  episode_number: number;
  youtube_url?: string | null;
}

export default function EditarPodcastPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetch(`/api/admin/podcasts/${p.id}`)
        .then((res) => res.json())
        .then((data) => setPodcast(data.podcast));
    });
  }, [params]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/podcasts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          spotify_url: formData.get("spotify_url"),
          apple_url: formData.get("apple_url"),
          youtube_url: formData.get("youtube_url"),
          duration: parseInt(formData.get("duration") as string) || null,
          episode_number: parseInt(formData.get("episode_number") as string),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin/podcasts");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!podcast) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <Link href="/admin/podcasts">
            <Button variant="ghost" size="sm" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <h1 className="text-3xl font-bold mb-8">Editar Episódio</h1>

          <Card className="bg-card border-border max-w-2xl">
            <CardContent className="p-6">
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input id="title" name="title" required defaultValue={podcast.title} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="episode_number">Número do Episódio *</Label>
                  <Input id="episode_number" name="episode_number" type="number" required defaultValue={podcast.episode_number} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" rows={3} defaultValue={podcast.description || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (segundos)</Label>
                  <Input id="duration" name="duration" type="number" defaultValue={podcast.duration || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube_url">URL do YouTube (Vídeo)</Label>
                  <Input id="youtube_url" name="youtube_url" defaultValue={podcast.youtube_url || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spotify_url">URL do Spotify</Label>
                  <Input id="spotify_url" name="spotify_url" defaultValue={podcast.spotify_url || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apple_url">URL do Apple Podcasts</Label>
                  <Input id="apple_url" name="apple_url" defaultValue={podcast.apple_url || ""} />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
