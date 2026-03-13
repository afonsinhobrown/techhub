import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getProductById } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils-helpers";
import {
  ArrowLeft,
  ShoppingBag,
  FileCode,
  Users,
  Video,
  Check,
  Clock,
  Download,
  MessageCircle,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const typeIcons: Record<string, React.ReactNode> = {
  software: <FileCode className="w-6 h-6" />,
  course: <Video className="w-6 h-6" />,
  consulting: <Users className="w-6 h-6" />,
};

const typeLabels: Record<string, string> = {
  software: "Sistema Pronto",
  course: "Curso Gravado",
  consulting: "Consultoria",
};

const typeFeatures: Record<string, string[]> = {
  software: [
    "Código fonte completo",
    "Documentação detalhada",
    "Atualizações gratuitas",
    "Suporte via Discord",
    "Acesso vitalício",
  ],
  course: [
    "Aulas em vídeo HD",
    "Material de apoio",
    "Projetos práticos",
    "Certificado de conclusão",
    "Acesso vitalício",
  ],
  consulting: [
    "Sessões 1:1",
    "Análise personalizada",
    "Plano de ação",
    "Suporte via chat",
    "Gravação das sessões",
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Produto não encontrado | TechHub",
    };
  }

  return {
    title: `${product.name} | TechHub`,
    description: product.description || "Produto TechHub",
    openGraph: {
      title: product.name,
      description: product.description || "",
      type: "product",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const icon = typeIcons[product.type] || <ShoppingBag className="w-6 h-6" />;
  const label = typeLabels[product.type] || "Produto";
  const features = typeFeatures[product.type] || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="container px-4 mx-auto max-w-5xl pt-8">
          <Link href="/produtos">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para produtos
            </Button>
          </Link>
        </div>

        <div className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - Product Info */}
              <div>
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-green-600/30 to-purple-500/30 rounded-2xl mb-8 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-green-600/40 flex items-center justify-center">
                    {icon}
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className="bg-green-600/20 text-green-400 mb-4"
                >
                  {label}
                </Badge>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {product.name}
                </h1>

                <p className="text-lg text-muted-foreground mb-8">
                  {product.description ||
                    "Descrição não disponível no momento."}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  <h3 className="font-semibold">O que está incluso:</h3>
                  <ul className="space-y-2">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-600/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Purchase Card */}
              <div>
                <div className="sticky top-24 border border-border rounded-2xl bg-card p-6">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Preço</p>
                    <p className="text-4xl font-bold text-green-400">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pagamento único • Acesso vitalício
                    </p>
                  </div>

                  <Button className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 gap-2 mb-4">
                    <ShoppingBag className="w-5 h-5" />
                    Comprar Agora
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Entrega imediata
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Download
                    </span>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">Dúvidas?</p>
                        <p className="text-muted-foreground">
                          Entre em contato pelo Discord ou email.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
