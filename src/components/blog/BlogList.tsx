"use client";

import { Button } from "@/components/ui/button";
import { BlogCard } from "./BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPost[];
  categories: string[];
  currentCategory?: string;
}

export function BlogList({ posts, categories, currentCategory }: BlogListProps) {
  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a href="/blog">
          <Button
            variant={!currentCategory ? "default" : "outline"}
            size="sm"
            className={!currentCategory ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            Todos
          </Button>
        </a>
        {categories.map((category) => (
          <a key={category} href={`/blog?categoria=${category.toLowerCase()}`}>
            <Button
              variant={
                currentCategory?.toLowerCase() === category.toLowerCase()
                  ? "default"
                  : "outline"
              }
              size="sm"
              className={
                currentCategory?.toLowerCase() === category.toLowerCase()
                  ? "bg-purple-600 hover:bg-purple-700"
                  : ""
              }
            >
              {category}
            </Button>
          </a>
        ))}
      </div>

      {/* Posts Grid */}
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum artigo encontrado nesta categoria.
          </p>
        </div>
      )}

      {/* Pagination (placeholder for future implementation) */}
      {posts.length >= 10 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>
          <span className="text-muted-foreground">Página 1</span>
          <Button variant="outline" size="sm">
            Próxima
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
