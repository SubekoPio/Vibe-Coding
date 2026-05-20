import Link from "next/link";
import type { SocialLink } from "@/lib/types";

export function Footer({ name, socials }: { name: string; socials: SocialLink[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      <section className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-[var(--color-muted)]">
          © {year} {name}. Built with Next.js.
        </p>
        <ul className="flex gap-6">
          {socials.map((s) => (
            <li key={s.platform}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/admin"
              className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              Admin
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  );
}
