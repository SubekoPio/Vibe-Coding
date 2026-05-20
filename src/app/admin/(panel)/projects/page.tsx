"use client";

import { usePortfolio } from "@/hooks/usePortfolio";
import { generateId } from "@/lib/utils";
import type { Project } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";
import { FileUpload } from "@/components/admin/FileUpload";

export default function AdminProjectsPage() {
  const { data, setData, loading, saving, message, save } = usePortfolio();

  if (loading || !data) return <p className="text-[var(--color-muted)]">Loading…</p>;

  function updateProject(index: number, patch: Partial<Project>) {
    const projects = [...data!.projects];
    projects[index] = { ...projects[index], ...patch };
    setData({ ...data!, projects });
  }

  function addProject() {
    const project: Project = {
      id: generateId(),
      title: "New project",
      description: "",
      longDescription: "",
      techStack: [],
      imageUrl: "",
      liveUrl: "",
      repoUrl: "",
      featured: false,
    };
    setData({ ...data!, projects: [...data!.projects, project] });
  }

  function removeProject(index: number) {
    if (!confirm("Delete this project?")) return;
    const projects = data!.projects.filter((_, i) => i !== index);
    setData({ ...data!, projects });
  }

  return (
    <article>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button type="button" onClick={addProject} className="btn-secondary text-sm">
          <Plus size={16} />
          Add project
        </button>
      </header>

      <ul className="space-y-6">
        {data.projects.map((p, i) => (
          <li key={p.id} className="card space-y-3 p-5">
            <header className="flex items-center justify-between">
              <h2 className="font-medium text-white">{p.title || "Untitled"}</h2>
              <button type="button" onClick={() => removeProject(i)} className="btn-danger">
                <Trash2 size={14} />
                Delete
              </button>
            </header>
            <FileUpload
              label="Project image"
              accept="image/jpeg,image/png,image/webp,image/gif"
              endpoint="/api/upload/project"
              extraFormData={{ projectId: p.id }}
              hint="Optional cover image for project cards"
              onSuccess={(url) => updateProject(i, { imageUrl: url })}
            />
            <input
              className="input"
              placeholder="Title"
              value={p.title}
              onChange={(e) => updateProject(i, { title: e.target.value })}
            />
            <textarea
              className="input min-h-[60px]"
              placeholder="Short description"
              value={p.description}
              onChange={(e) => updateProject(i, { description: e.target.value })}
            />
            <textarea
              className="input min-h-[80px]"
              placeholder="Long description"
              value={p.longDescription}
              onChange={(e) => updateProject(i, { longDescription: e.target.value })}
            />
            <input
              className="input"
              placeholder="Tech stack (comma-separated)"
              value={p.techStack.join(", ")}
              onChange={(e) =>
                updateProject(i, {
                  techStack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                })
              }
            />
            <input
              className="input"
              placeholder="Live URL"
              value={p.liveUrl}
              onChange={(e) => updateProject(i, { liveUrl: e.target.value })}
            />
            <input
              className="input"
              placeholder="Repo URL"
              value={p.repoUrl}
              onChange={(e) => updateProject(i, { repoUrl: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={p.featured}
                onChange={(e) => updateProject(i, { featured: e.target.checked })}
              />
              Featured on homepage
            </label>
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
