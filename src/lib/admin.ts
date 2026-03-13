import { db } from "@/lib/db";

// Stats
export async function getAdminStats() {
  const [
    articlesCount,
    productsCount,
    episodesCount,
    subscribersCount,
    purchasesCount,
    totalRevenue,
  ] = await Promise.all([
    db.article.count(),
    db.product.count({ where: { active: true } }),
    db.podcastEpisode.count(),
    db.subscriber.count({ where: { confirmed: true } }),
    db.purchase.count({ where: { status: "paid" } }),
    db.purchase.aggregate({
      where: { status: "paid" },
      _sum: { amount: true },
    }),
  ]);

  return {
    articlesCount,
    productsCount,
    episodesCount,
    subscribersCount,
    purchasesCount,
    totalRevenue: totalRevenue._sum.amount || 0,
  };
}

// Articles
export async function getAdminArticles() {
  return db.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });
}

export async function createArticle(data: {
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  published?: boolean;
  authorId: string;
}) {
  return db.article.create({ data });
}

export async function updateArticle(
  id: string,
  data: {
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string;
    coverImage?: string;
    category?: string;
    published?: boolean;
    publishedAt?: Date;
  }
) {
  return db.article.update({ where: { id }, data });
}

export async function deleteArticle(id: string) {
  return db.article.delete({ where: { id } });
}

// Products Admin
export async function getAdminProducts() {
  return db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { purchases: true } },
    },
  });
}

export async function createProduct(data: {
  name: string;
  description?: string;
  price: number;
  priceIdStripe?: string;
  type: string;
  fileUrl?: string;
  imageUrl?: string;
  active?: boolean;
}) {
  return db.product.create({ data });
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    priceIdStripe?: string;
    type?: string;
    fileUrl?: string;
    imageUrl?: string;
    active?: boolean;
  }
) {
  return db.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  return db.product.delete({ where: { id } });
}

// Subscribers
export async function getAdminSubscribers() {
  return db.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Purchases
export async function getAdminPurchases() {
  return db.purchase.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      product: { select: { name: true, type: true } },
    },
  });
}
