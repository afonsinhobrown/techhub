import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageCircle,
  BookOpen,
  Zap,
  Shield,
  Heart,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Comunidade | TechHub",
  description:
    "Junte-se à nossa comunidade no Discord. Discussões técnicas, networking e troca de conhecimento.",
  openGraph: {
    title: "Comunidade | TechHub",
    description: "Junte-se à nossa comunidade no Discord.",
    type: "website",
  },
};

const communityStats = [
  { label: "Membros", value: "500+" },
  { label: "Online agora", value: "50+" },
  { label: "Canais ativos", value: "20+" },
  { label: "Eventos/mês", value: "4+" },
];

const features = [
  {
    icon: MessageCircle,
    title: "Discussões Técnicas",
    description:
      "Troque ideias sobre arquitetura, padrões e melhores práticas com outros desenvolvedores.",
  },
  {
    icon: BookOpen,
    title: "Estudos em Grupo",
    description:
      "Participe de grupos de estudo sobre tecnologias específicas e prepare-se para certificações.",
  },
  {
    icon: Zap,
    title: "Code Reviews",
    description:
      "Peça feedback no seu código e ajude outros a melhorar suas implementações.",
  },
  {
    icon: Shield,
    title: "Carreira & Mercado",
    description:
      "Discussões sobre salários, entrevistas, negociações e tendências do mercado.",
  },
];

const rules = [
  "Seja respeitoso com todos os membros",
  "Sem spam ou autopromoção excessiva",
  "Use os canais apropriados para cada assunto",
  "Contribua construtivamente para discussões",
  "Ajude quem está começando",
];

export default function ComunidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-green-500/10" />

          <div className="container px-4 mx-auto max-w-7xl relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge
                variant="secondary"
                className="bg-[#5865F2]/20 text-[#5865F2] mb-6"
              >
                <Users className="w-3 h-3 mr-1" />
                Comunidade Discord
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Junte-se a centenas de desenvolvedores
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Discussões técnicas, networking, ajuda mútua e muito mais.
                Nossa comunidade é o lugar ideal para evoluir como
                desenvolvedor.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://discord.gg/techhub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-[#5865F2] hover:bg-[#4752C4] h-14 px-8 text-lg gap-2"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Entrar no Discord
                  </Button>
                </a>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                  Saiba mais
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b border-border">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {communityStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-purple-400">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container px-4 mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              O que você encontra na comunidade
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="bg-card border-border hover:border-purple-500/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="py-16 bg-card">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">
                Regras da Comunidade
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Para manter um ambiente saudável e produtivo para todos.
              </p>

              <Card className="bg-background border-border">
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-medium text-green-400">
                            {i + 1}
                          </span>
                        </div>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container px-4 mx-auto max-w-7xl">
            <Card className="bg-gradient-to-r from-purple-600/20 to-green-500/20 border-purple-500/30">
              <CardContent className="p-8 md:p-12 text-center">
                <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Pronto para fazer parte?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Junte-se a nós e comece a evoluir junto com uma comunidade de
                  desenvolvedores apaixonados.
                </p>
                <a
                  href="https://discord.gg/techhub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-[#5865F2] hover:bg-[#4752C4] h-14 px-8 text-lg gap-2"
                  >
                    Entrar no Discord
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
