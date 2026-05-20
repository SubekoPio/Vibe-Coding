import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, saveBlogPosts } from "@/lib/blog";
import { requireAdmin } from "@/lib/session";
import type { BlogPost } from "@/lib/types";

export async function GET() {
  const posts = await getBlogPosts();
  return NextResponse.json(posts);
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = (await request.json()) as BlogPost[];
  await saveBlogPosts(posts);
  return NextResponse.json({ ok: true });
}
