"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPost } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

interface LatestPostsProps {
  posts: BlogPost[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Últimos Artigos
            </h2>
            <p className="text-muted-foreground">
              Conteúdo fresco sobre desenvolvimento e tecnologia
            </p>
          </div>
          <Link href="/blog" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                date={post.date}
                readingTime={post.readingTime}
                coverImage={post.coverImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border rounded-xl bg-card">
            <p className="text-muted-foreground">
              Nenhum artigo publicado ainda. Em breve!
            </p>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              Ver todos os artigos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
