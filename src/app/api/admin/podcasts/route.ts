import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST - Criar novo episódio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, spotify_url, apple_url, youtube_url, duration, episode_number } = body;

    if (!title || !episode_number) {
      return NextResponse.json(
        { error: "Título e número do episódio são obrigatórios" },
        { status: 400 }
      );
    }

    const id = `ep_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const episode = await db.podcast_episodes.create({
      data: {
        id,
        title,
        description,
        spotify_url,
        apple_url,
        youtube_url,
        duration,
        episode_number,
        published_at: new Date(),
      },
    });

    return NextResponse.json({ episode }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar episódio:", error);
    return NextResponse.json(
      { error: "Erro ao criar episódio" },
      { status: 500 }
    );
  }
}
