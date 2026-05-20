"use client";

import Image from "next/image";
import type { Skill } from "@/lib/types";
import { Carousel } from "./Carousel";

function SkillTile({ skill }: { skill: Skill }) {
  return (
    <article className="card mx-2 flex flex-col items-center p-8 text-center">
      {skill.imageUrl ? (
        <Image
          src={skill.imageUrl}
          alt={skill.name}
          width={64}
          height={64}
          className="mb-4 h-16 w-16 object-contain"
          unoptimized={skill.imageUrl.startsWith("/uploads")}
        />
      ) : (
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 font-mono text-xl font-bold text-[var(--color-accent)]">
          {skill.name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <h3 className="font-semibold text-white">{skill.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-muted)]">{skill.category}</p>
    </article>
  );
}

export function SkillsCarousel({ skills }: { skills: Skill[] }) {
  const slides: Skill[][] = [];
  for (let i = 0; i < skills.length; i += 4) {
    slides.push(skills.slice(i, i + 4));
  }

  return (
    <Carousel
      autoPlayMs={4500}
      items={slides.map((group, gi) => (
        <ul key={gi} className="grid list-none grid-cols-2 gap-0 p-0 md:grid-cols-4">
          {group.map((skill) => (
            <li key={skill.id}>
              <SkillTile skill={skill} />
            </li>
          ))}
        </ul>
      ))}
    />
  );
}
