import { NextRequest, NextResponse } from "next/server";
import { getDiscussionById, updateDiscussion, deleteDiscussion, incrementViews, incrementLikes } from "@/lib/discussions";

// GET /api/discussions/[id] - Buscar discussão por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const discussion = await getDiscussionById(id);

    if (!discussion) {
      return NextResponse.json(
        { error: "Discussão não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ discussion });
  } catch (error) {
    console.error("Erro ao buscar discussão:", error);
    return NextResponse.json(
      { error: "Erro ao buscar discussão" },
      { status: 500 }
    );
  }
}

// PUT /api/discussions/[id] - Atualizar discussão
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const discussion = await updateDiscussion(id, body);

    return NextResponse.json({ discussion });
  } catch (error) {
    console.error("Erro ao atualizar discussão:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar discussão" },
      { status: 500 }
    );
  }
}

// DELETE /api/discussions/[id] - Deletar discussão
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteDiscussion(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar discussão:", error);
    return NextResponse.json(
      { error: "Erro ao deletar discussão" },
      { status: 500 }
    );
  }
}

// PATCH /api/discussions/[id] - Ações especiais (views, likes)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    if (action === "view") {
      await incrementViews(id);
    } else if (action === "like") {
      await incrementLikes(id);
    } else {
      return NextResponse.json(
        { error: "Ação inválida" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao executar ação:", error);
    return NextResponse.json(
      { error: "Erro ao executar ação" },
      { status: 500 }
    );
  }
}
