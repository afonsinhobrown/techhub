import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST - Criar novo artigo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, category, cover_image, published } = body;

    if (!title || !slug || !category) {
      return NextResponse.json(
        { error: "Título, slug e categoria são obrigatórios" },
        { status: 400 }
      );
    }

    const id = `art_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const article = await db.articles.create({
      data: {
        id,
        title,
        slug,
        content,
        excerpt,
        category,
        cover_image,
        published: published ?? false,
        author_id: "admin_001",
        published_at: published ? new Date() : null,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    return NextResponse.json(
      { error: "Erro ao criar artigo" },
      { status: 500 }
    );
  }
}
