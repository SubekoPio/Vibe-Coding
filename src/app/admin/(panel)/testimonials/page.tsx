"use client";

import { useTestimonials } from "@/hooks/useTestimonials";
import { generateId } from "@/lib/utils";
import type { Testimonial } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export default function AdminTestimonialsPage() {
  const { items, setItems, loading, saving, message, save } = useTestimonials();

  if (loading) return <p className="text-[var(--color-muted)]">Loading…</p>;

  function update(i: number, patch: Partial<Testimonial>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    setItems(next);
  }

  function add() {
    const t: Testimonial = {
      id: generateId(),
      name: "",
      role: "",
      company: "",
      quote: "",
      avatarUrl: "",
      rating: 5,
    };
    setItems([...items, t]);
  }

  function remove(i: number) {
    setItems(items.filter((_, j) => j !== i));
  }

  return (
    <article>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button type="button" onClick={add} className="btn-secondary text-sm">
          <Plus size={16} />
          Add testimonial
        </button>
      </header>

      <ul className="space-y-4">
        {items.map((t, i) => (
          <li key={t.id} className="card space-y-3 p-5">
            <header className="flex justify-between">
              <h2 className="font-medium">{t.name || "New"}</h2>
              <button type="button" onClick={() => remove(i)} className="btn-danger">
                <Trash2 size={14} />
              </button>
            </header>
            <input className="input" placeholder="Name" value={t.name} onChange={(e) => update(i, { name: e.target.value })} />
            <input className="input" placeholder="Role" value={t.role} onChange={(e) => update(i, { role: e.target.value })} />
            <input className="input" placeholder="Company" value={t.company} onChange={(e) => update(i, { company: e.target.value })} />
            <textarea className="input min-h-[80px]" placeholder="Quote" value={t.quote} onChange={(e) => update(i, { quote: e.target.value })} />
            <input className="input" placeholder="Avatar URL" value={t.avatarUrl} onChange={(e) => update(i, { avatarUrl: e.target.value })} />
            <label className="block text-sm">
              Rating (1–5)
              <input
                type="number"
                min={1}
                max={5}
                className="input mt-1"
                value={t.rating}
                onChange={(e) => update(i, { rating: Number(e.target.value) })}
              />
            </label>
          </li>
        ))}
      </ul>

      <footer className="mt-6 flex items-center gap-4">
        <button type="button" className="btn-primary" disabled={saving} onClick={() => save(items)}>
          {saving ? "Saving…" : "Save all"}
        </button>
        {message && <span className="text-sm text-[var(--color-accent)]">{message}</span>}
      </footer>
    </article>
  );
}
