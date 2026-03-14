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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = ["Desenvolvimento", "IA", "Carreira", "Mercado", "DevOps", "Mobile", "Design"];

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string;
  cover_image: string | null;
  published: boolean;
}

export default function EditarArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [published, setPublished] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetch(`/api/admin/articles/${p.id}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data.article);
          setPublished(data.article?.published ?? false);
        });
    });
  }, [params]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: formData.get("title"),
          slug: formData.get("slug"),
          content: formData.get("content"),
          excerpt: formData.get("excerpt"),
          category: formData.get("category"),
          cover_image: formData.get("cover_image"),
          published,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin/artigos");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!article) return <div className="min-h-screen flex flex-col bg-background"><Header /><main className="flex-1 flex items-center justify-center">Carregando...</main><Footer /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <Link href="/admin/artigos">
            <Button variant="ghost" size="sm" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <h1 className="text-3xl font-bold mb-8">Editar Artigo</h1>

          <Card className="bg-card border-border max-w-2xl">
            <CardContent className="p-6">
              <form action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input id="title" name="title" required defaultValue={article.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input id="slug" name="slug" required defaultValue={article.slug} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select name="category" required defaultValue={article.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Input id="excerpt" name="excerpt" defaultValue={article.excerpt || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo (Markdown)</Label>
                  <Textarea id="content" name="content" rows={10} defaultValue={article.content || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image">URL da Imagem de Capa</Label>
                  <Input id="cover_image" name="cover_image" defaultValue={article.cover_image || ""} />
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="published" checked={published} onCheckedChange={setPublished} />
                  <Label htmlFor="published">Publicado</Label>
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
