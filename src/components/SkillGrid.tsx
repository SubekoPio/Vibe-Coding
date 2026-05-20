import Image from "next/image";
import type { Skill } from "@/lib/types";

const categoryLabels: Record<Skill["category"], string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
  other: "Other",
};

export function SkillGrid({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<Skill["category"], Skill[]>
  );

  const order: Skill["category"][] = ["languages", "frameworks", "tools", "other"];

  return (
    <section className="grid gap-8 sm:grid-cols-2">
      {order.map((cat) => {
        const items = grouped[cat];
        if (!items?.length) return null;
        return (
          <article key={cat} className="card p-5">
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-accent)]">
              {categoryLabels[cat]}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {items.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-2 rounded-md bg-[var(--color-surface)] px-3 py-2 text-sm text-[#e8eef5]"
                >
                  {s.imageUrl ? (
                    <Image
                      src={s.imageUrl}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="font-mono text-xs text-[var(--color-accent)]">
                      {s.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  {s.name}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
