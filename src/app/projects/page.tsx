import { getPortfolio } from "@/lib/portfolio";
import { ProjectCard } from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const { projects } = await getPortfolio();

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">Projects</h1>
      <p className="mb-12 max-w-2xl text-[var(--color-muted)]">
        A selection of things I&apos;ve designed, built, and shipped.
      </p>
      <ul className="grid list-none gap-6 p-0 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.id}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </article>
  );
}
