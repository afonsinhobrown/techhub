"use client";

import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="py-16 md:py-24 bg-card border-t border-border">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fique por dentro das novidades
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Receba artigos, dicas e atualizações direto no seu email. Sem spam,
            só conteúdo de qualidade.
          </p>
          <NewsletterForm />
          <p className="text-sm text-muted-foreground mt-4">
            🔒 Seu email está seguro. Não compartilhamos com terceiros.
          </p>
        </div>
      </div>
    </section>
  );
}
