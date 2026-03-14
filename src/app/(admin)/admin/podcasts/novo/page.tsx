"use client";

import { useState } from "react";
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

export default function NovoPodcastPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/podcasts", {
        method: "POST",
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

          <h1 className="text-3xl font-bold mb-8">Novo Episódio</h1>

          <Card className="bg-card border-border max-w-2xl">
            <CardContent className="p-6">
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input id="title" name="title" required placeholder="Título do episódio" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="episode_number">Número do Episódio *</Label>
                  <Input id="episode_number" name="episode_number" type="number" required placeholder="1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" rows={3} placeholder="Descrição do episódio" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (segundos)</Label>
                  <Input id="duration" name="duration" type="number" placeholder="1800 (30 min)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube_url">URL do YouTube (Vídeo)</Label>
                  <Input id="youtube_url" name="youtube_url" placeholder="https://youtube.com/watch?v=..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spotify_url">URL do Spotify</Label>
                  <Input id="spotify_url" name="spotify_url" placeholder="https://open.spotify.com/episode/..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apple_url">URL do Apple Podcasts</Label>
                  <Input id="apple_url" name="apple_url" placeholder="https://podcasts.apple.com/..." />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                  {loading ? "Criando..." : "Criar Episódio"}
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
