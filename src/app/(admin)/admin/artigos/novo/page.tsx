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

export default function NovoArtigoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const title = formData.get("title") as string;
      const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const res = await fetch("/api/admin/articles", {
        method: "POST",
        body: JSON.stringify({
          title,
          slug,
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

          <h1 className="text-3xl font-bold mb-8">Novo Artigo</h1>

          <Card className="bg-card border-border max-w-2xl">
            <CardContent className="p-6">
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input id="title" name="title" required placeholder="Título do artigo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
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
                  <Input id="excerpt" name="excerpt" placeholder="Breve resumo do artigo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo (Markdown)</Label>
                  <Textarea id="content" name="content" rows={10} placeholder="Conteúdo do artigo em Markdown..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image">URL da Imagem de Capa</Label>
                  <Input id="cover_image" name="cover_image" placeholder="https://..." />
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="published" checked={published} onCheckedChange={setPublished} />
                  <Label htmlFor="published">Publicar imediatamente</Label>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                  {loading ? "Criando..." : "Criar Artigo"}
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
