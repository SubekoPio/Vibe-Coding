import Link from "next/link";
import { getPortfolio } from "@/lib/portfolio";
import { getSubscribers } from "@/lib/subscribers";
import { getMessages } from "@/lib/messages";
import { getBlogPosts } from "@/lib/blog";
import { getTestimonials } from "@/lib/testimonials";
import {
  FolderKanban,
  User,
  Wrench,
  Briefcase,
  Users,
  Settings,
  Mail,
  BookOpen,
  Quote,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const data = await getPortfolio();
  const subscribers = await getSubscribers();
  const messages = await getMessages();
  const posts = await getBlogPosts();
  const testimonials = await getTestimonials();
  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { label: "Projects", value: data.projects.length, href: "/admin/projects", icon: FolderKanban },
    { label: "Blog posts", value: posts.length, href: "/admin/blog", icon: BookOpen },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials", icon: Quote },
    { label: "Messages", value: unread ? `${unread} new` : messages.length, href: "/admin/messages", icon: Mail },
    { label: "Subscribers", value: subscribers.length, href: "/admin/subscribers", icon: Users },
    { label: "Skills", value: data.skills.length, href: "/admin/skills", icon: Wrench },
    { label: "Experience", value: data.experience.length, href: "/admin/experience", icon: Briefcase },
    { label: "Profile", value: "Edit", href: "/admin/profile", icon: User },
    { label: "Settings", value: "Password", href: "/admin/settings", icon: Settings },
  ];

  return (
    <article>
      <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        Manage blog, testimonials, projects, WhatsApp, and subscriber welcome emails.
      </p>
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <li key={label}>
            <Link href={href} className="card block p-5 transition-colors hover:border-[var(--color-accent)]/40">
              <Icon size={20} className="mb-3 text-[var(--color-accent)]" />
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="text-sm text-[var(--color-muted)]">{label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
