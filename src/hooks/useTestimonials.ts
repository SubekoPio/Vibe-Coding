"use client";

import { useCallback, useEffect, useState } from "react";
import type { Testimonial } from "@/lib/types";

export function useTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save(next: Testimonial[]) {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaving(false);
    setMessage(res.ok ? "Saved successfully" : "Failed to save");
    if (res.ok) setItems(next);
  }

  return { items, setItems, loading, saving, message, save, reload: load };
}
