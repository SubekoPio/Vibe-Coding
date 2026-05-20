"use client";

import { useBlog } from "@/hooks/useBlog";
import { generateId } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminBlogPage() {
  const { posts, setPosts, loading, saving, message, save } = useBlog();

  if (loading) return <p className="text-[var(--color-muted)]">Loading…</p>;

  function update(i: number, patch: Partial<BlogPost>) {
    const next = [...posts];
    next[i] = { ...next[i], ...patch };
    if (patch.title && !patch.slug) next[i].slug = slugify(patch.title);
    setPosts(next);
  }

  function add() {
    const post: BlogPost = {
      id: generateId(),
      slug: "new-post",
      title: "New post",
      excerpt: "",
      content: "",
      coverImageUrl: "",
      publishedAt: new Date().toISOString(),
      published: false,
      tags: [],
    };
    setPosts([post, ...posts]);
  }

  function remove(i: number) {
    if (!confirm("Delete this post?")) return;
    setPosts(posts.filter((_, j) => j !== i));
  }

  return (
    <article>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <button type="button" onClick={add} className="btn-secondary text-sm">
          <Plus size={16} />
          New post
        </button>
      </header>

      <ul className="space-y-6">
        {posts.map((p, i) => (
          <li key={p.id} className="card space-y-3 p-5">
            <header className="flex justify-between">
              <h2 className="font-medium text-white">{p.title}</h2>
              <button type="button" onClick={() => remove(i)} className="btn-danger">
                <Trash2 size={14} />
              </button>
            </header>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={p.published} onChange={(e) => update(i, { published: e.target.checked })} />
              Published
            </label>
            <input className="input" placeholder="Title" value={p.title} onChange={(e) => update(i, { title: e.target.value })} />
            <input className="input" placeholder="Slug" value={p.slug} onChange={(e) => update(i, { slug: e.target.value })} />
            <input className="input" placeholder="Excerpt" value={p.excerpt} onChange={(e) => update(i, { excerpt: e.target.value })} />
            <textarea className="input min-h-[120px]" placeholder="Content (paragraphs separated by blank lines)" value={p.content} onChange={(e) => update(i, { content: e.target.value })} />
            <input className="input" placeholder="Cover image URL" value={p.coverImageUrl} onChange={(e) => update(i, { coverImageUrl: e.target.value })} />
            <input
              className="input"
              placeholder="Tags (comma-separated)"
              value={p.tags.join(", ")}
              onChange={(e) =>
                update(i, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
              }
            />
          </li>
        ))}
      </ul>

      <footer className="mt-6 flex items-center gap-4">
        <button type="button" className="btn-primary" disabled={saving} onClick={() => save(posts)}>
          {saving ? "Saving…" : "Save all"}
        </button>
        {message && <span className="text-sm text-[var(--color-accent)]">{message}</span>}
      </footer>
    </article>
  );
}
