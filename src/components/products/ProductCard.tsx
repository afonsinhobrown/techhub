"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils-helpers";
import { ShoppingBag, FileCode, Users, Video } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  type: string;
  imageUrl?: string | null;
}

const typeIcons: Record<string, React.ReactNode> = {
  software: <FileCode className="w-5 h-5" />,
  course: <Video className="w-5 h-5" />,
  consulting: <Users className="w-5 h-5" />,
};

const typeLabels: Record<string, string> = {
  software: "Sistema",
  course: "Curso",
  consulting: "Consultoria",
};

export function ProductCard({ id, name, description, price, type, imageUrl }: Product) {
  const icon = typeIcons[type] || <ShoppingBag className="w-5 h-5" />;
  const label = typeLabels[type] || "Produto";

  return (
    <Card className="group flex flex-col h-full bg-card border-border hover:border-green-500/50 transition-all duration-300 overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-br from-green-600/20 to-purple-500/20 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-green-600/30 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="bg-green-600/20 text-green-400 hover:bg-green-600/30"
          >
            {label}
          </Badge>
        </div>
        <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">
          {name}
        </h3>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">
          {description || "Sem descrição disponível."}
        </p>
      </CardContent>

      <CardFooter className="pt-4 border-t border-border">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-sm text-muted-foreground">A partir de</p>
            <p className="text-2xl font-bold text-green-400">
              {formatPrice(price)}
            </p>
          </div>
          <Link href={`/produtos/${id}`}>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <ShoppingBag className="w-4 h-4" />
              Ver detalhes
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
