import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Listar todos os produtos
export async function GET() {
  try {
    const products = await db.products.findMany({
      orderBy: { created_at: "desc" },
      include: {
        _count: { select: { purchases: true } },
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

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
        description: description || null,
        price: parseFloat(price),
        type,
        image_url: image_url || null,
        file_url: file_url || null,
        active: true,
        updated_at: new Date(),
      },
    });

    console.log("Produto criado:", product);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: "Erro ao criar produto: " + (error as Error).message },
      { status: 500 }
    );
  }
}
