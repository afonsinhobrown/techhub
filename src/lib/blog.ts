import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  published: boolean;
  content: string;
  readingTime: number;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      category: data.category || "Geral",
      excerpt: data.excerpt || "",
      author: data.author || "TechHub Team",
      coverImage: data.coverImage,
      published: data.published ?? true,
      content,
      readingTime: calculateReadingTime(content),
    };
  });

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    category: data.category || "Geral",
    excerpt: data.excerpt || "",
    author: data.author || "TechHub Team",
    coverImage: data.coverImage,
    published: data.published ?? true,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}
