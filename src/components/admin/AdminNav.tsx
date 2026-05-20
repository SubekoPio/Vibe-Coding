"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Wrench,
  Briefcase,
  LogOut,
  Settings,
  Users,
  Mail,
  BookOpen,
  Quote,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
      <p className="mb-6 px-2 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
        Admin
      </p>
      <nav>
        <ul className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  pathname === href
                    ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-white"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" onClick={logout} className="btn-secondary mt-8 w-full text-xs">
        <LogOut size={14} />
        Log out
      </button>
    </aside>
  );
}
