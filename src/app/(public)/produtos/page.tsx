import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/products";

// Forçar renderização dinâmica para dados atualizados
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Produtos | TechHub",
  description:
    "Sistemas prontos, cursos e consultorias. Soluções desenvolvidas para ajudar você a evoluir mais rápido.",
  openGraph: {
    title: "Produtos | TechHub",
    description: "Sistemas prontos, cursos e consultorias.",
    type: "website",
  },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Produtos e Soluções
              </h1>
              <p className="text-xl text-muted-foreground">
                Sistemas prontos, cursos gravados e consultorias para acelerar
                sua evolução como desenvolvedor. Tudo criado com base em
                experiências reais.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container px-4 mx-auto max-w-7xl">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    type={product.type}
                    imageUrl={product.image_url}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-border rounded-xl bg-card">
                <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Em breve!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Novos produtos estão sendo preparados. Seja notificado quando
                  lançarmos assinando nossa newsletter.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
