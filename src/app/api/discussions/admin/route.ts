import { NextRequest, NextResponse } from "next/server";
import { createDiscussion, getAllDiscussionsAdmin, countDiscussions } from "@/lib/discussions";

// GET /api/discussions/admin - Listar todas para admin
export async function GET() {
  try {
    const discussions = await getAllDiscussionsAdmin();
    const total = await countDiscussions();
    
    return NextResponse.json({ 
      discussions,
      total 
    });
  } catch (error) {
    console.error("Erro ao buscar discussões:", error);
    return NextResponse.json(
      { error: "Erro ao buscar discussões" },
      { status: 500 }
    );
  }
}

// POST /api/discussions/admin - Criar nova discussão
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { title, content, excerpt, category, authorName, pinned, locked, published } = body;

    if (!title || !content || !category || !authorName) {
      return NextResponse.json(
        { error: "Título, conteúdo, categoria e autor são obrigatórios" },
        { status: 400 }
      );
    }

    const discussion = await createDiscussion({
      title,
      content,
      excerpt,
      category,
      authorName,
      pinned: pinned || false,
      locked: locked || false,
      published: published ?? true,
    });

    return NextResponse.json({ discussion }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar discussão:", error);
    return NextResponse.json(
      { error: "Erro ao criar discussão" },
      { status: 500 }
    );
  }
}
