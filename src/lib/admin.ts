import { db } from "@/lib/db";

// Stats
export async function getAdminStats() {
  try {
    const [
      articlesCount,
      productsCount,
      episodesCount,
      subscribersCount,
      purchasesCount,
      totalRevenue,
    ] = await Promise.all([
      db.articles.count(),
      db.products.count({ where: { active: true } }),
      db.podcast_episodes.count(),
      db.subscribers.count({ where: { confirmed: true } }),
      db.purchases.count({ where: { status: "paid" } }),
      db.purchases.aggregate({
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
  } catch (error) {
    console.error("Erro ao buscar stats:", error);
    return {
      articlesCount: 0,
      productsCount: 0,
      episodesCount: 0,
      subscribersCount: 0,
      purchasesCount: 0,
      totalRevenue: 0,
    };
  }
}

// Articles
export async function getAdminArticles() {
  return db.articles.findMany({
    orderBy: { created_at: "desc" },
    include: { profiles: { select: { name: true, email: true } } },
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
  const id = `art_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  return db.articles.create({
    data: {
      id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      cover_image: data.coverImage,
      category: data.category,
      published: data.published ?? false,
      author_id: data.authorId,
      updated_at: new Date(),
    },
  });
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
  return db.articles.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      cover_image: data.coverImage,
      category: data.category,
      published: data.published,
      published_at: data.publishedAt,
      updated_at: new Date(),
    },
  });
}

export async function deleteArticle(id: string) {
  return db.articles.delete({ where: { id } });
}

// Products Admin
export async function getAdminProducts() {
  try {
    const products = await db.products.findMany({
      orderBy: { created_at: "desc" },
      include: {
        _count: { select: { purchases: true } },
      },
    });
    console.log("getAdminProducts - produtos encontrados:", products.length);
    return products;
  } catch (error) {
    console.error("Erro em getAdminProducts:", error);
    return [];
  }
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
  const id = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  return db.products.create({
    data: {
      id,
      name: data.name,
      description: data.description,
      price: data.price,
      price_id_stripe: data.priceIdStripe,
      type: data.type,
      file_url: data.fileUrl,
      image_url: data.imageUrl,
      active: data.active ?? true,
      updated_at: new Date(),
    },
  });
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
  return db.products.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      price_id_stripe: data.priceIdStripe,
      type: data.type,
      file_url: data.fileUrl,
      image_url: data.imageUrl,
      active: data.active,
      updated_at: new Date(),
    },
  });
}

export async function deleteProduct(id: string) {
  return db.products.delete({ where: { id } });
}

// Subscribers
export async function getAdminSubscribers() {
  return db.subscribers.findMany({
    orderBy: { created_at: "desc" },
  });
}

// Purchases
export async function getAdminPurchases() {
  return db.purchases.findMany({
    orderBy: { created_at: "desc" },
    include: {
      profiles: { select: { name: true, email: true } },
      products: { select: { name: true, type: true } },
    },
  });
}
