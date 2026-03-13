"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils-helpers";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  Headphones,
  Users,
  MessageCircle,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Artigos", href: "/admin/artigos", icon: FileText },
  { name: "Produtos", href: "/admin/produtos", icon: ShoppingBag },
  { name: "Podcasts", href: "/admin/podcasts", icon: Headphones },
  { name: "Discussões", href: "/admin/discussoes", icon: MessageCircle },
  { name: "Assinantes", href: "/admin/assinantes", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <span className="font-bold">TechHub Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Link href="/">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <ChevronLeft className="w-4 h-4" />
            Voltar ao Site
          </Button>
        </Link>
      </div>
    </aside>
  );
}
