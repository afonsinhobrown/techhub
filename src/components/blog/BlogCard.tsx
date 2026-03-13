"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils-helpers";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  coverImage?: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  date,
  readingTime,
}: BlogCardProps) {
  return (
    <Card className="group flex flex-col h-full bg-card border-border hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
      {/* Cover Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-purple-600/20 to-green-500/20 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-20">📝</span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"
          >
            {category}
          </Badge>
        </div>
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>

      <CardFooter className="pt-4 border-t border-border">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readingTime} min
            </span>
          </div>
          <Link href={`/blog/${slug}`}>
            <Button
              variant="ghost"
              size="sm"
              className="group/btn gap-1 text-purple-400 hover:text-purple-300 hover:bg-purple-600/10"
            >
              Ler
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
