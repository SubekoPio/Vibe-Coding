import { promises as fs } from "fs";
import path from "path";
import type { BlogPost } from "./types";

const BLOG_PATH = path.join(process.cwd(), "src/data/blog.json");

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(BLOG_PATH, "utf-8");
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug && p.published);
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(path.dirname(BLOG_PATH), { recursive: true });
  await fs.writeFile(BLOG_PATH, JSON.stringify(posts, null, 2), "utf-8");
}
