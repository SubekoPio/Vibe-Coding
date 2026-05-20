import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card glow flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-0.5">
      {project.imageUrl ? (
        <Link
          href={`/projects/${project.id}`}
          className="relative block h-44 w-full overflow-hidden border-b border-[var(--color-border)]"
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            unoptimized={project.imageUrl.startsWith("/uploads")}
          />
        </Link>
      ) : (
        <Link
          href={`/projects/${project.id}`}
          className="flex h-44 items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm text-[var(--color-muted)]"
        >
          {project.title}
        </Link>
      )}
      <section className="flex flex-1 flex-col p-6">
        <header className="mb-3 flex items-start justify-between gap-4">
          <Link href={`/projects/${project.id}`}>
            <h3 className="text-lg font-semibold text-white hover:text-[var(--color-accent)]">
              {project.title}
            </h3>
          </Link>
          {project.featured && (
            <span className="shrink-0 rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
              Featured
            </span>
          )}
        </header>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
          {project.description}
        </p>
        <ul className="mb-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-[var(--color-border)] px-2 py-0.5 font-mono text-xs text-[var(--color-muted)]"
            >
              {tech}
            </li>
          ))}
        </ul>
        <footer className="flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)] hover:underline"
          >
            Details <ArrowRight size={14} />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              <Github size={14} />
              Code
            </a>
          )}
        </footer>
      </section>
    </article>
  );
}
