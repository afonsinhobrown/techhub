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

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  type: string;
  image_url: string | null;
  file_url: string | null;
  active: boolean;
}

export default function EditarProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [active, setActive] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetch(`/api/admin/products/${p.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.product);
          setActive(data.product?.active ?? true);
        });
    });
  }, [params]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: formData.get("name"),
          description: formData.get("description"),
          price: parseFloat(formData.get("price") as string),
          type: formData.get("type"),
          image_url: formData.get("image_url"),
          file_url: formData.get("file_url"),
          active,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin/produtos");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!product) return <div className="min-h-screen flex flex-col bg-background"><Header /><main className="flex-1 flex items-center justify-center">Carregando...</main><Footer /></div>;

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

          <h1 className="text-3xl font-bold mb-8">Editar Produto</h1>

          <Card className="bg-card border-border max-w-2xl">
            <CardContent className="p-6">
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input id="name" name="name" required defaultValue={product.name} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (MT) *</Label>
                    <Input id="price" name="price" type="number" step="0.01" required defaultValue={product.price} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select name="type" required defaultValue={product.type}>
                      <SelectTrigger>
                        <SelectValue />
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
                  <Textarea id="description" name="description" rows={3} defaultValue={product.description || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL da Imagem</Label>
                  <Input id="image_url" name="image_url" defaultValue={product.image_url || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file_url">URL do Arquivo</Label>
                  <Input id="file_url" name="file_url" defaultValue={product.file_url || ""} />
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="active" checked={active} onCheckedChange={setActive} />
                  <Label htmlFor="active">Produto ativo</Label>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
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
