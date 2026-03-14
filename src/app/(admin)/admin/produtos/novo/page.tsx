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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NovoProdutoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      description: formData.get("description") || null,
      price: parseFloat(formData.get("price") as string) || 0,
      type: selectedType,
      image_url: formData.get("image_url") || null,
      file_url: formData.get("file_url") || null,
    };

    if (!data.name || !data.price || !data.type) {
      setError("Nome, preço e tipo são obrigatórios");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/admin/produtos");
        router.refresh();
      } else {
        setError(result.error || "Erro ao criar produto");
      }
    } catch (err) {
      setError("Erro de conexão");
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
          <Link href="/admin/produtos">
            <Button variant="ghost" size="sm" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <h1 className="text-3xl font-bold mb-8">Novo Produto</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <Card className="bg-card border-border max-w-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input id="name" name="name" required placeholder="Nome do produto" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (MT) *</Label>
                    <Input id="price" name="price" type="number" step="0.01" required placeholder="1500.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select name="type" required value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Sistema</SelectItem>
                        <SelectItem value="course">Curso</SelectItem>
                        <SelectItem value="consulting">Consultoria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" rows={3} placeholder="Descrição do produto" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL da Imagem</Label>
                  <Input id="image_url" name="image_url" placeholder="https://..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file_url">URL do Arquivo (para sistemas/cursos)</Label>
                  <Input id="file_url" name="file_url" placeholder="https://..." />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
                  {loading ? "Criando..." : "Criar Produto"}
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
