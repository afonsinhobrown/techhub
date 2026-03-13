import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | TechHub",
  description:
    "Artigos sobre desenvolvimento, IA, carreira e tecnologia. Conteúdo de qualidade para desenvolvedores que querem evoluir.",
  openGraph: {
    title: "Blog | TechHub",
    description: "Artigos sobre desenvolvimento, IA, carreira e tecnologia.",
    type: "website",
  },
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const allPosts = getAllPosts();
  const categories = getCategories();
  const currentCategory = searchParams.categoria;

  const filteredPosts = currentCategory
    ? allPosts.filter(
        (post) => post.category.toLowerCase() === currentCategory.toLowerCase()
      )
    : allPosts;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground">
                Artigos técnicos, análises de mercado e reflexões sobre
                desenvolvimento de software. Sem frescura, direto ao ponto.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-12">
          <div className="container px-4 mx-auto max-w-7xl">
            <BlogList
              posts={filteredPosts}
              categories={categories}
              currentCategory={currentCategory}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
