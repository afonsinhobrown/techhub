"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Pencil,
  Trash2,
  MessageCircle,
  Heart,
  Eye,
  Pin,
  Lock,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  "Desenvolvimento",
  "IA",
  "Carreira",
  "Mercado",
  "Design",
  "DevOps",
  "Mobile",
  "Outros",
];

type Discussion = {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  author_name: string;
  replies: number;
  likes: number;
  views: number;
  pinned: boolean;
  locked: boolean;
  published: boolean;
  timeAgo: string;
};

interface AdminDiscussoesClientProps {
  initialDiscussions: Discussion[];
}

export function AdminDiscussoesClient({ initialDiscussions }: AdminDiscussoesClientProps) {
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Create discussion
  const handleCreate = async (formData: FormData) => {
    setIsCreating(true);
    try {
      const res = await fetch("/api/discussions/admin", {
        method: "POST",
        body: JSON.stringify({
          title: formData.get("title"),
          content: formData.get("content"),
          excerpt: formData.get("excerpt"),
          category: formData.get("category"),
          authorName: formData.get("authorName"),
          pinned: formData.get("pinned") === "on",
          locked: formData.get("locked") === "on",
          published: formData.get("published") === "on",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const { discussion } = await res.json();
        setDiscussions([discussion, ...discussions]);
        window.location.reload();
      }
    } finally {
      setIsCreating(false);
    }
  };

  // Update discussion
  const handleUpdate = async (id: string, formData: FormData) => {
    setEditingId(id);
    try {
      const res = await fetch(`/api/discussions/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: formData.get("title"),
          content: formData.get("content"),
          excerpt: formData.get("excerpt"),
          category: formData.get("category"),
          authorName: formData.get("authorName"),
          pinned: formData.get("pinned") === "on",
          locked: formData.get("locked") === "on",
          published: formData.get("published") === "on",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        window.location.reload();
      }
    } finally {
      setEditingId(null);
    }
  };

  // Delete discussion
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/discussions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDiscussions(discussions.filter((d) => d.id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Discussões</h1>
              <p className="text-muted-foreground">
                Gerencie as discussões da comunidade
              </p>
            </div>

            {/* Create Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4" />
                  Nova Discussão
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Nova Discussão</DialogTitle>
                </DialogHeader>
                <form action={handleCreate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input id="title" name="title" placeholder="Título da discussão" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorName">Nome do Autor *</Label>
                    <Input id="authorName" name="authorName" placeholder="Nome que aparecerá na discussão" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Conteúdo completo da discussão..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Resumo (opcional)</Label>
                    <Input id="excerpt" name="excerpt" placeholder="Resumo curto para o feed" />
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Switch id="published" name="published" defaultChecked />
                      <Label htmlFor="published">Publicado</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="pinned" name="pinned" />
                      <Label htmlFor="pinned">Fixado</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="locked" name="locked" />
                      <Label htmlFor="locked">Trancado</Label>
                    </div>
                  </div>

                  <Button type="submit" disabled={isCreating} className="w-full bg-purple-600 hover:bg-purple-700">
                    {isCreating ? "Criando..." : "Criar Discussão"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Discussions List */}
          <div className="space-y-4">
            {discussions.length === 0 ? (
              <Card className="bg-card">
                <CardContent className="py-12 text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma discussão ainda</h3>
                  <p className="text-muted-foreground">
                    Clique em "Nova Discussão" para criar a primeira.
                  </p>
                </CardContent>
              </Card>
            ) : (
              discussions.map((discussion) => (
                <Card key={discussion.id} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-purple-600/20 text-purple-400"
                          >
                            {discussion.category}
                          </Badge>
                          {discussion.pinned && (
                            <Badge className="bg-green-600/20 text-green-400 gap-1">
                              <Pin className="w-3 h-3" />
                              Fixado
                            </Badge>
                          )}
                          {discussion.locked && (
                            <Badge className="bg-yellow-600/20 text-yellow-400 gap-1">
                              <Lock className="w-3 h-3" />
                              Trancado
                            </Badge>
                          )}
                          {!discussion.published && (
                            <Badge className="bg-red-600/20 text-red-400">
                              Rascunho
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {discussion.timeAgo}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold mb-1">
                          {discussion.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {discussion.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Por: {discussion.author_name}</span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {discussion.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {discussion.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {discussion.views}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {/* Edit Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Editar Discussão</DialogTitle>
                            </DialogHeader>
                            <form action={(fd) => handleUpdate(discussion.id, fd)} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Título</Label>
                                  <Input
                                    name="title"
                                    defaultValue={discussion.title}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Categoria</Label>
                                  <Select name="category" defaultValue={discussion.category} required>
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
                              </div>

                              <div className="space-y-2">
                                <Label>Nome do Autor</Label>
                                <Input
                                  name="authorName"
                                  defaultValue={discussion.author_name}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Conteúdo</Label>
                                <Textarea
                                  name="content"
                                  defaultValue={discussion.content}
                                  rows={4}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Resumo</Label>
                                <Input
                                  name="excerpt"
                                  defaultValue={discussion.excerpt || ""}
                                />
                              </div>

                              <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    name="published"
                                    defaultChecked={discussion.published}
                                  />
                                  <Label>Publicado</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    name="pinned"
                                    defaultChecked={discussion.pinned}
                                  />
                                  <Label>Fixado</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    name="locked"
                                    defaultChecked={discussion.locked}
                                  />
                                  <Label>Trancado</Label>
                                </div>
                              </div>

                              <Button type="submit" disabled={editingId === discussion.id} className="w-full bg-purple-600 hover:bg-purple-700">
                                Salvar Alterações
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>

                        {/* Delete Dialog */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir discussão?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. A discussão será permanentemente removida.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDelete(discussion.id)}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
