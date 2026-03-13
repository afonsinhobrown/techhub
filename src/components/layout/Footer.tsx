import Link from "next/link";
import { Code2, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

const footerLinks = {
  produto: [
    { name: "Blog", href: "/blog" },
    { name: "Podcast", href: "/podcast" },
    { name: "Produtos", href: "/produtos" },
    { name: "Comunidade", href: "/comunidade" },
  ],
  empresa: [
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
    { name: "Privacidade", href: "/privacidade" },
    { name: "Termos", href: "/termos" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Email", href: "mailto:contato@techhub.dev", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        {/* Newsletter Section */}
        <div className="flex flex-col items-center justify-center py-8 mb-12 border-b border-border">
          <h3 className="text-2xl font-bold text-center mb-2">
            Fique por dentro das novidades
          </h3>
          <p className="text-muted-foreground text-center mb-6 max-w-md">
            Receba artigos, dicas e atualizações direto no seu email. Sem spam, só conteúdo de qualidade.
          </p>
          <NewsletterForm variant="inline" />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">TECNOINCUBADORA</span>
                <span className="text-xl font-bold gradient-text -mt-0.5">TechHub</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Tecnologia, IA e desenvolvimento sem frescura. Uma iniciativa da TECNOINCUBADORA.
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-purple-600/20 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discord CTA */}
          <div>
            <h4 className="font-semibold mb-4">Comunidade</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Junte-se a centenas de desenvolvedores no nosso Discord.
            </p>
            <a
              href="https://discord.gg/techhub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] text-white text-sm font-medium hover:bg-[#4752C4] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Entrar no Discord
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TECNOINCUBADORA. TechHub é uma iniciativa da TECNOINCUBADORA.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Feito com 💜 por desenvolvedores, para desenvolvedores.
          </p>
        </div>
      </div>
    </footer>
  );
}
