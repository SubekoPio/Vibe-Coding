import { AdminNav } from "@/components/admin/AdminNav";
import Link from "next/link";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)]">
      <AdminNav />
      <section className="flex-1 p-8">
        <p className="mb-6 text-right text-xs text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-accent)]">
            ← View site
          </Link>
        </p>
        {children}
      </section>
    </section>
  );
}
