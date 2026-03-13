import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await db.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.confirmed) {
        return NextResponse.json(
          { error: "Este email já está cadastrado" },
          { status: 400 }
        );
      }
      // Resend confirmation
      // In production, you would send an actual email here
      return NextResponse.json({
        success: true,
        message: "Email de confirmação reenviado!",
      });
    }

    // Create new subscriber
    const token = randomUUID();
    await db.subscriber.create({
      data: {
        email,
        name: name || null,
        token,
        confirmed: false,
      },
    });

    // In production, send confirmation email here
    // For now, auto-confirm for demo
    await db.subscriber.update({
      where: { email },
      data: {
        confirmed: true,
        confirmedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Inscrição realizada com sucesso!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Erro ao processar inscrição" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Token inválido" },
      { status: 400 }
    );
  }

  const subscriber = await db.subscriber.findFirst({
    where: { token },
  });

  if (!subscriber) {
    return NextResponse.json(
      { error: "Token não encontrado" },
      { status: 404 }
    );
  }

  await db.subscriber.update({
    where: { id: subscriber.id },
    data: {
      confirmed: true,
      confirmedAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    message: "Email confirmado com sucesso!",
  });
}
