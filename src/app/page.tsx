import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestPosts } from "@/components/home/LatestPosts";
import { CommunitySection } from "@/components/home/CommunitySection";
import { ProductsHighlight } from "@/components/home/ProductsHighlight";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { DiscussionsFeed } from "@/components/home/DiscussionsFeed";
import { PodcastPreview } from "@/components/home/PodcastPreview";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "TechHub - Tecnologia, IA e Comunidade",
  description:
    "Plataforma de tecnologia, IA e desenvolvimento sem frescura. Artigos, podcast, comunidade e produtos para desenvolvedores.",
  keywords: [
    "tecnologia",
    "desenvolvimento",
    "IA",
    "inteligência artificial",
    "programação",
    "comunidade",
    "podcast",
  ],
  authors: [{ name: "TechHub Team" }],
  openGraph: {
    title: "TechHub - Tecnologia, IA e Comunidade",
    description:
      "Plataforma de tecnologia, IA e desenvolvimento sem frescura.",
    type: "website",
  },
};

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DiscussionsFeed />
        <LatestPosts posts={posts} />
        <PodcastPreview />
        <CommunitySection />
        <ProductsHighlight />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
