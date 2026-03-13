import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TechHub - Tecnologia, IA e Comunidade",
    template: "%s | TechHub",
  },
  description:
    "Plataforma de tecnologia, IA e desenvolvimento sem frescura. Artigos, podcast, comunidade e produtos para desenvolvedores.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "tecnologia",
    "desenvolvimento",
    "IA",
    "inteligência artificial",
    "programação",
    "comunidade",
    "podcast",
    "TypeScript",
    "Next.js",
  ],
  authors: [{ name: "TechHub Team" }],
  creator: "TechHub",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://techhub.dev",
    siteName: "TechHub",
    title: "TechHub - Tecnologia, IA e Comunidade",
    description:
      "Plataforma de tecnologia, IA e desenvolvimento sem frescura.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechHub - Tecnologia, IA e Comunidade",
    description:
      "Plataforma de tecnologia, IA e desenvolvimento sem frescura.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
