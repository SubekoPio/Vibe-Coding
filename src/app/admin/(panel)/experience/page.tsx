"use client";

import { usePortfolio } from "@/hooks/usePortfolio";
import { generateId } from "@/lib/utils";
import type { Experience } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export default function AdminExperiencePage() {
  const { data, setData, loading, saving, message, save } = usePortfolio();

  if (loading || !data) return <p className="text-[var(--color-muted)]">Loading…</p>;

  function updateExp(index: number, patch: Partial<Experience>) {
    const experience = [...data!.experience];
    experience[index] = { ...experience[index], ...patch };
    setData({ ...data!, experience });
  }

  function addExp() {
    const entry: Experience = {
      id: generateId(),
      role: "",
      company: "",
      period: "",
      description: "",
      highlights: [""],
    };
    setData({ ...data!, experience: [...data!.experience, entry] });
  }

  function removeExp(index: number) {
    if (!confirm("Delete this entry?")) return;
    const experience = data!.experience.filter((_, i) => i !== index);
    setData({ ...data!, experience });
  }

  return (
    <article>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button type="button" onClick={addExp} className="btn-secondary text-sm">
          <Plus size={16} />
          Add entry
        </button>
      </header>

      <ul className="space-y-6">
        {data.experience.map((job, i) => (
          <li key={job.id} className="card space-y-3 p-5">
            <header className="flex justify-between">
              <h2 className="font-medium text-white">{job.role || "New role"}</h2>
              <button type="button" onClick={() => removeExp(i)} className="btn-danger">
                <Trash2 size={14} />
                Delete
              </button>
            </header>
            <input
              className="input"
              placeholder="Role"
              value={job.role}
              onChange={(e) => updateExp(i, { role: e.target.value })}
            />
            <input
              className="input"
              placeholder="Company"
              value={job.company}
              onChange={(e) => updateExp(i, { company: e.target.value })}
            />
            <input
              className="input"
              placeholder="Period (e.g. 2022 — Present)"
              value={job.period}
              onChange={(e) => updateExp(i, { period: e.target.value })}
            />
            <textarea
              className="input min-h-[60px]"
              placeholder="Description"
              value={job.description}
              onChange={(e) => updateExp(i, { description: e.target.value })}
            />
            <fieldset>
              <legend className="mb-2 text-xs text-[var(--color-muted)]">Highlights</legend>
              {job.highlights.map((h, hi) => (
                <input
                  key={hi}
                  className="input mb-2"
                  value={h}
                  onChange={(e) => {
                    const highlights = [...job.highlights];
                    highlights[hi] = e.target.value;
                    updateExp(i, { highlights });
                  }}
                />
              ))}
              <button
                type="button"
                className="btn-secondary text-xs"
                onClick={() => updateExp(i, { highlights: [...job.highlights, ""] })}
              >
                Add highlight
              </button>
            </fieldset>
          </li>
        ))}
      </ul>

      <footer className="mt-6 flex items-center gap-4">
        <button type="button" className="btn-primary" disabled={saving} onClick={() => save(data)}>
          {saving ? "Saving…" : "Save all"}
        </button>
        {message && <span className="text-sm text-[var(--color-accent)]">{message}</span>}
      </footer>
    </article>
  );
}
