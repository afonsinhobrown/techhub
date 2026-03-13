import { NextRequest, NextResponse } from "next/server";
import { getPublicDiscussions, getDiscussions } from "@/lib/discussions";

// GET /api/discussions - Listar discussões
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const publicOnly = searchParams.get("public") === "true";

    if (publicOnly) {
      const maxVisible = limit ? parseInt(limit) : 5;
      const result = await getPublicDiscussions(maxVisible);
      return NextResponse.json(result);
    }

    const discussions = await getDiscussions(limit ? parseInt(limit) : undefined);
    return NextResponse.json({ discussions });
  } catch (error) {
    console.error("Erro ao buscar discussões:", error);
    return NextResponse.json(
      { error: "Erro ao buscar discussões" },
      { status: 500 }
    );
  }
}
