import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST - Criar novo produto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, type, image_url, file_url } = body;

    if (!name || !price || !type) {
      return NextResponse.json(
        { error: "Nome, preço e tipo são obrigatórios" },
        { status: 400 }
      );
    }

    const id = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const product = await db.products.create({
      data: {
        id,
        name,
        description,
        price,
        type,
        image_url,
        file_url,
        active: true,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
