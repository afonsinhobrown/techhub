import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Buscar episódio por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const episode = await db.podcast_episodes.findUnique({
      where: { id },
    });

    if (!episode) {
      return NextResponse.json(
        { error: "Episódio não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ podcast: episode });
  } catch (error) {
    console.error("Erro ao buscar episódio:", error);
    return NextResponse.json(
      { error: "Erro ao buscar episódio" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar episódio
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, spotify_url, apple_url, youtube_url, duration, episode_number } = body;

    const episode = await db.podcast_episodes.update({
      where: { id },
      data: {
        title,
        description,
        spotify_url,
        apple_url,
        youtube_url,
        duration,
        episode_number,
      },
    });

    return NextResponse.json({ episode });
  } catch (error) {
    console.error("Erro ao atualizar episódio:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar episódio" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar episódio
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.podcast_episodes.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar episódio:", error);
    return NextResponse.json(
      { error: "Erro ao deletar episódio" },
      { status: 500 }
    );
  }
}
