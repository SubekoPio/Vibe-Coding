"use client";

import Image from "next/image";
import { usePortfolio } from "@/hooks/usePortfolio";
import { generateId } from "@/lib/utils";
import { FileUpload } from "@/components/admin/FileUpload";
import type { Skill } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export default function AdminSkillsPage() {
  const { data, setData, loading, saving, message, save } = usePortfolio();

  if (loading || !data) return <p className="text-[var(--color-muted)]">Loading…</p>;

  function updateSkill(index: number, patch: Partial<Skill>) {
    const skills = [...data!.skills];
    skills[index] = { ...skills[index], ...patch };
    setData({ ...data!, skills });
  }

  function addSkill() {
    const skill: Skill = { id: generateId(), name: "", category: "other", imageUrl: "" };
    setData({ ...data!, skills: [...data!.skills, skill] });
  }

  function removeSkill(index: number) {
    const skills = data!.skills.filter((_, i) => i !== index);
    setData({ ...data!, skills });
  }

  return (
    <article>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button type="button" onClick={addSkill} className="btn-secondary text-sm">
          <Plus size={16} />
          Add skill
        </button>
      </header>

      <ul className="space-y-4">
        {data.skills.map((s, i) => (
          <li key={s.id} className="card space-y-3 p-4">
            <section className="flex flex-wrap items-center gap-3">
              {s.imageUrl ? (
                <Image src={s.imageUrl} alt="" width={40} height={40} className="h-10 w-10 object-contain" unoptimized />
              ) : null}
              <input
                className="input flex-1 min-w-[140px]"
                placeholder="Skill name"
                value={s.name}
                onChange={(e) => updateSkill(i, { name: e.target.value })}
              />
              <select
                className="input w-auto"
                value={s.category}
                onChange={(e) => updateSkill(i, { category: e.target.value as Skill["category"] })}
              >
                <option value="languages">Languages</option>
                <option value="frameworks">Frameworks</option>
                <option value="tools">Tools</option>
                <option value="other">Other</option>
              </select>
              <button type="button" onClick={() => removeSkill(i)} className="btn-danger">
                <Trash2 size={14} />
              </button>
            </section>
            <FileUpload
              label="Skill icon"
              accept="image/*"
              endpoint="/api/upload/skill"
              extraFormData={{ skillId: s.id }}
              hint="Optional logo or icon"
              onSuccess={(url) => updateSkill(i, { imageUrl: url })}
            />
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
