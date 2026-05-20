"use client";

import { useCallback, useEffect, useState } from "react";
import type { BlogPost } from "@/lib/types";

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/blog");
    setPosts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save(next: BlogPost[]) {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaving(false);
    setMessage(res.ok ? "Saved successfully" : "Failed to save");
    if (res.ok) setPosts(next);
  }

  return { posts, setPosts, loading, saving, message, save, reload: load };
}
