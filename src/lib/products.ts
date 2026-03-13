import { db } from "@/lib/db";

export async function getProducts() {
  return db.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return db.product.findUnique({
    where: { id },
  });
}

export async function getProductsByType(type: string) {
  return db.product.findMany({
    where: { active: true, type },
    orderBy: { createdAt: "desc" },
  });
}
