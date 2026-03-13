"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  X,
  Code2,
  Rss,
  Users,
  ShoppingBag,
  Headphones,
  User,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Blog", href: "/blog", icon: Rss },
  { name: "Podcast", href: "/podcast", icon: Headphones },
  { name: "Comunidade", href: "/comunidade", icon: Users },
  { name: "Produtos", href: "/produtos", icon: ShoppingBag },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">TECNOINCUBADORA</span>
            <span className="text-xl font-bold gradient-text -mt-0.5">TechHub</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              Entrar
            </Button>
          </Link>
          <Link href="/registro">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Cadastrar
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-card">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">TECNOINCUBADORA</span>
                      <span className="text-xl font-bold gradient-text -mt-0.5">TechHub</span>
                    </div>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex flex-col gap-2 flex-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 pt-6 border-t border-border">
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
                    <Settings className="w-4 h-4" />
                    Painel Admin
                  </Link>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <User className="w-4 h-4" />
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/registro" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
