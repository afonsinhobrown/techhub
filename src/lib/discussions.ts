import { db } from "./db";
import { discussions } from "@prisma/client";

export type DiscussionWithTime = discussions & {
  timeAgo: string;
};

// Formatar tempo relativo
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "agora";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("pt-BR");
}

// Buscar todas as discussões publicadas
export async function getDiscussions(limit?: number): Promise<DiscussionWithTime[]> {
  const allDiscussions = await db.discussions.findMany({
    where: { published: true },
    orderBy: [
      { pinned: "desc" },
      { created_at: "desc" },
    ],
    take: limit,
  });

  return allDiscussions.map((d) => ({
    ...d,
    timeAgo: formatTimeAgo(d.created_at),
  }));
}

// Buscar discussão por ID
export async function getDiscussionById(id: string): Promise<discussions | null> {
  return db.discussions.findUnique({
    where: { id },
  });
}

// Criar nova discussão
export async function createDiscussion(data: {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  authorName: string;
  authorId?: string;
  pinned?: boolean;
  locked?: boolean;
  published?: boolean;
}): Promise<discussions> {
  const excerpt = data.excerpt || data.content.substring(0, 150) + "...";
  const id = `disc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  
  return db.discussions.create({
    data: {
      id,
      title: data.title,
      content: data.content,
      excerpt,
      category: data.category,
      author_name: data.authorName,
      author_id: data.authorId,
      pinned: data.pinned || false,
      locked: data.locked || false,
      published: data.published ?? true,
      updated_at: new Date(),
    },
  });
}

// Atualizar discussão
export async function updateDiscussion(
  id: string,
  data: Partial<{
    title: string;
    content: string;
    excerpt: string;
    category: string;
    authorName: string;
    pinned: boolean;
    locked: boolean;
    published: boolean;
    replies: number;
    likes: number;
    views: number;
  }>
): Promise<discussions> {
  const updateData: Record<string, unknown> = { updated_at: new Date() };
  if (data.title) updateData.title = data.title;
  if (data.content) updateData.content = data.content;
  if (data.excerpt) updateData.excerpt = data.excerpt;
  if (data.category) updateData.category = data.category;
  if (data.authorName) updateData.author_name = data.authorName;
  if (data.pinned !== undefined) updateData.pinned = data.pinned;
  if (data.locked !== undefined) updateData.locked = data.locked;
  if (data.published !== undefined) updateData.published = data.published;
  if (data.replies !== undefined) updateData.replies = data.replies;
  if (data.likes !== undefined) updateData.likes = data.likes;
  if (data.views !== undefined) updateData.views = data.views;

  return db.discussions.update({
    where: { id },
    data: updateData,
  });
}

// Incrementar views
export async function incrementViews(id: string): Promise<void> {
  await db.discussions.update({
    where: { id },
    data: { views: { increment: 1 } },
  });
}

// Incrementar likes
export async function incrementLikes(id: string): Promise<void> {
  await db.discussions.update({
    where: { id },
    data: { likes: { increment: 1 } },
  });
}

// Deletar discussão
export async function deleteDiscussion(id: string): Promise<void> {
  await db.discussions.delete({
    where: { id },
  });
}

// Contar discussões
export async function countDiscussions(): Promise<number> {
  return db.discussions.count({
    where: { published: true },
  });
}

// Buscar todas para admin (incluindo não publicadas)
export async function getAllDiscussionsAdmin(): Promise<DiscussionWithTime[]> {
  const allDiscussions = await db.discussions.findMany({
    orderBy: [
      { pinned: "desc" },
      { created_at: "desc" },
    ],
  });

  return allDiscussions.map((d) => ({
    ...d,
    timeAgo: formatTimeAgo(d.created_at),
  }));
}
