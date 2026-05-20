import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import { getPortfolio } from "@/lib/portfolio";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { projects } = await getPortfolio();
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { projects, profile } = await getPortfolio();
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${profile.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const { projects } = await getPortfolio();
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
      >
        <ArrowLeft size={16} />
        All projects
      </Link>

      {project.imageUrl && (
        <figure className="relative mb-8 h-56 w-full overflow-hidden rounded-xl border border-[var(--color-border)] sm:h-72">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized={project.imageUrl.startsWith("/uploads")}
          />
        </figure>
      )}

      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold">{project.title}</h1>
        <p className="text-lg text-[var(--color-muted)]">{project.description}</p>
      </header>

      <ul className="mb-8 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-[var(--color-border)] px-3 py-1 font-mono text-sm text-[var(--color-accent)]"
          >
            {tech}
          </li>
        ))}
      </ul>

      <section className="prose prose-invert mb-10 max-w-none">
        <p className="leading-relaxed text-[#e8eef5]">{project.longDescription}</p>
      </section>

      <nav className="flex flex-wrap gap-4">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <ExternalLink size={18} />
            View live
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Github size={18} />
            Source code
          </a>
        )}
      </nav>
    </article>
  );
}
