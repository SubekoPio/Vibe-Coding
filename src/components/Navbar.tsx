"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-[var(--color-accent)]">
          {name.split(" ")[0]}.
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "text-sm transition-colors",
                  pathname === link.href
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden text-[var(--color-muted)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <section className="border-t border-[var(--color-border)] px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "block text-sm",
                    pathname === link.href ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </header>
  );
}
