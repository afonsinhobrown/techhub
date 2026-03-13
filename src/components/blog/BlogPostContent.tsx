"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  Share2,
  MessageCircle,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";
import { formatDate } from "@/lib/utils-helpers";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogPostContentProps {
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readingTime: number;
  slug: string;
}

export function BlogPostContent({
  title,
  content,
  category,
  date,
  author,
  readingTime,
  slug,
}: BlogPostContentProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <Badge
          variant="secondary"
          className="bg-purple-600/20 text-purple-400 mb-4"
        >
          {category}
        </Badge>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(date)}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min de leitura</span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="h-64 md:h-80 bg-gradient-to-br from-purple-600/30 to-green-500/30 rounded-xl mb-8 flex items-center justify-center">
        <span className="text-8xl opacity-30">📝</span>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match;

              if (isInline) {
                return (
                  <code
                    className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg !bg-card border border-border"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-border pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-base leading-relaxed mb-4">{children}</p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 mb-4">
                {children}
              </ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-muted-foreground my-4">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Share Section */}
      <Separator className="my-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-purple-400" />
          <span className="font-medium">Compartilhe este artigo</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={shareOnTwitter}
            className="gap-2"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={shareOnLinkedIn}
            className="gap-2"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </Button>
          <Button variant="outline" size="sm" onClick={copyLink} className="gap-2">
            <Link2 className="w-4 h-4" />
            Copiar
          </Button>
        </div>
      </div>

      {/* Discord CTA */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-green-500/20 rounded-xl border border-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#5865F2] flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">
              Continue a discussão no Discord
            </h3>
            <p className="text-muted-foreground mb-4">
              Gostou do artigo? Tem dúvidas ou quer adicionar algo? Junte-se à
              nossa comunidade e participe das conversas.
            </p>
            <a
              href="https://discord.gg/techhub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] text-white font-medium hover:bg-[#4752C4] transition-colors"
            >
              Discutir no Discord
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
