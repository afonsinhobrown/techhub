import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageCircle,
  Heart,
  Eye,
  Lock,
  Pin,
} from "lucide-react";
import Link from "next/link";
import { getDiscussions } from "@/lib/discussions";

export async function DiscussionsFeed() {
  // Buscar discussões do banco de dados
  const allDiscussions = await getDiscussions(10);

  // Se não há discussões, não mostrar a seção
  if (allDiscussions.length === 0) {
    return null;
  }

  // Mostrar 5 públicas, o resto fica "bloqueado"
  const visibleCount = 5;
  const visible = allDiscussions.slice(0, visibleCount);
  const hasLocked = allDiscussions.length > visibleCount;
  const lockedCount = allDiscussions.length - visibleCount;

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Discussões da Comunidade</h2>
            <p className="text-muted-foreground">
              O que a galera está debatendo agora
            </p>
          </div>
          <Link href="/comunidade" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Ver comunidade
            </Button>
          </Link>
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {visible.map((discussion) => {
            const initials = discussion.author_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (
              <Card
                key={discussion.id}
                className="bg-background border-border hover:border-purple-500/50 transition-all cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-500 flex-shrink-0">
                      <AvatarFallback className="bg-transparent text-white text-sm font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="secondary"
                          className="bg-purple-600/20 text-purple-400 text-xs"
                        >
                          {discussion.category}
                        </Badge>
                        {discussion.pinned && (
                          <Badge className="bg-green-600/20 text-green-400 text-xs gap-1">
                            <Pin className="w-3 h-3" />
                            Fixado
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {discussion.timeAgo}
                        </span>
                      </div>

                      <h3 className="font-semibold text-base mb-1 line-clamp-1 hover:text-purple-400 transition-colors">
                        {discussion.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {discussion.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {discussion.author_name}
                        </span>
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
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Locked Discussion - Requires Login */}
          {hasLocked && (
            <Card className="bg-background border-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-green-500/10 backdrop-blur-sm z-10" />
              <CardContent className="p-4 relative z-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">
                        +{lockedCount} discussões disponíveis
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Faça login ou cadastre-se para ver todas as discussões da comunidade
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href="/login">
                      <Button variant="outline" size="sm">
                        Entrar
                      </Button>
                    </Link>
                    <Link href="/registro">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Cadastrar
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 text-center md:hidden">
          <Link href="/comunidade">
            <Button variant="outline" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Ver comunidade
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
