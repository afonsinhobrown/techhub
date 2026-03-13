"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  variant?: "default" | "inline" | "compact";
}

export function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-500">
        <Check className="w-5 h-5" />
        <span>Email confirmado! Verifique sua caixa de entrada.</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={status === "loading"} className="bg-purple-600 hover:bg-purple-700">
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Assinar"
          )}
        </Button>
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        <Button type="submit" size="sm" disabled={status === "loading"}>
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Assinar"
          )}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-12 h-12 text-base"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          "Quero receber novidades"
        )}
      </Button>
      {status === "error" && (
        <p className="text-sm text-destructive text-center">
          Ocorreu um erro. Tente novamente.
        </p>
      )}
    </form>
  );
}
