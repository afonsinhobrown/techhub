"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden border-b border-border">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-green-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

      <div className="container px-4 mx-auto max-w-7xl relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">
                Nova plataforma de tecnologia
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Tecnologia, IA e Desenvolvimento{" "}
              <span className="gradient-text">sem frescura</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Artigos técnicos, podcast, comunidade ativa e produtos para
              desenvolvedores que querem evoluir de verdade. Conteúdo de quem vive
              na trincheira.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Link href="/blog">
                <Button size="lg" className="h-14 px-8 text-lg bg-purple-600 hover:bg-purple-700 gap-2">
                  <Code2 className="w-5 h-5" />
                  Explorar Artigos
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/comunidade">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg gap-2">
                  <Users className="w-5 h-5" />
                  Entrar na Comunidade
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-purple-400">50+</p>
                <p className="text-sm text-muted-foreground">Artigos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-green-400">500+</p>
                <p className="text-sm text-muted-foreground">Membros</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-purple-400">20+</p>
                <p className="text-sm text-muted-foreground">Episódios</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-green-400">10+</p>
                <p className="text-sm text-muted-foreground">Produtos</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src="/images/hero-community.png"
                alt="Comunidade TechHub - Desenvolvedores negros colaborando em tecnologia"
                width={672}
                height={384}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-purple-600/30 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-xl bg-green-500/30 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
