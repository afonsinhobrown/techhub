import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado | TechHub",
    };
  }

  return {
    title: `${post.title} | TechHub Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="container px-4 mx-auto max-w-3xl pt-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Voltar para o blog
            </Button>
          </Link>
        </div>

        {/* Article Content */}
        <article className="py-8 px-4">
          <BlogPostContent
            title={post.title}
            content={post.content}
            category={post.category}
            date={post.date}
            author={post.author}
            readingTime={post.readingTime}
            slug={post.slug}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
