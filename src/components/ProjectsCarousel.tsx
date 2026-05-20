import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { Carousel } from "./Carousel";
import { AnimateIn } from "./AnimateIn";

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <AnimateIn>
      <Carousel
        autoPlayMs={5500}
        items={projects.map((p) => (
          <section key={p.id} className="px-2">
            <ProjectCard project={p} />
          </section>
        ))}
      />
    </AnimateIn>
  );
}
