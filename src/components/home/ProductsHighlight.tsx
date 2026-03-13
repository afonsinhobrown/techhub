"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, ArrowRight, FileCode, Video, Users } from "lucide-react";

const products = [
  {
    type: "Sistema",
    title: "SaaS Starter Kit",
    description: "Template completo para criar seu SaaS em tempo recorde",
    price: "R$ 197",
    icon: FileCode,
  },
  {
    type: "Curso",
    title: "TypeScript Avançado",
    description: "Domine TypeScript e eleve o nível do seu código",
    price: "R$ 297",
    icon: Video,
  },
  {
    type: "Consultoria",
    title: "Mentoria 1:1",
    description: "Sessões personalizadas para acelerar sua carreira",
    price: "R$ 500/h",
    icon: Users,
  },
];

export function ProductsHighlight() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Produtos em Destaque
            </h2>
            <p className="text-muted-foreground">
              Soluções criadas para acelerar sua evolução
            </p>
          </div>
          <Link href="/produtos" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <Card
              key={i}
              className="bg-card border-border hover:border-green-500/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center mb-4">
                  <product.icon className="w-6 h-6 text-green-400" />
                </div>

                <p className="text-sm text-green-400 mb-2">{product.type}</p>

                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  {product.title}
                </h3>

                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">{product.price}</p>
                  <Link href="/produtos">
                    <Button variant="ghost" size="sm" className="gap-1 text-green-400 hover:text-green-300 hover:bg-green-600/10">
                      <ShoppingBag className="w-4 h-4" />
                      Ver
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/produtos">
            <Button variant="outline" className="gap-2">
              Ver todos os produtos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
