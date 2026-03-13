import { db } from "@/lib/db";

export async function getProducts() {
  return db.products.findMany({
    where: { active: true },
    orderBy: { created_at: "desc" },
  });
}

export async function getProductById(id: string) {
  return db.products.findUnique({
    where: { id },
  });
}

export async function getProductsByType(type: string) {
  return db.products.findMany({
    where: { active: true, type },
    orderBy: { created_at: "desc" },
  });
}
