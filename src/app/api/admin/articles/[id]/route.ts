import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Buscar artigo por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await db.articles.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Artigo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Erro ao buscar artigo:", error);
    return NextResponse.json(
      { error: "Erro ao buscar artigo" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, excerpt, category, cover_image, published } = body;

    const article = await db.articles.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        cover_image,
        published,
        published_at: published ? new Date() : null,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar article" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar artigo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.articles.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar artigo:", error);
    return NextResponse.json(
      { error: "Erro ao deletar artigo" },
      { status: 500 }
    );
  }
}
