"use client";

import { useEffect, useState } from "react";
import { Users, Send, CheckCircle, AlertCircle } from "lucide-react";

interface Subscriber {
  email: string;
  subscribedAt: string;
  welcomeSentAt: string | null;
  welcomeError: string | null;
}

export default function AdminSubscribersPage() {
  const [list, setList] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/subscribers");
    const data = await res.json();
    setList(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function resend(email: string) {
    setResending(email);
    await fetch("/api/subscribers/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setResending(null);
    load();
  }

  return (
    <article>
      <header className="mb-6 flex items-center gap-3">
        <Users className="text-[var(--color-accent)]" size={24} />
        <h1 className="text-2xl font-bold">Subscribers</h1>
        <span className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-sm text-[var(--color-accent)]">
          {list.length}
        </span>
      </header>

      <p className="mb-6 text-sm text-[var(--color-muted)]">
        New subscribers receive a welcome email when <code className="text-[var(--color-accent)]">RESEND_API_KEY</code> is set.
      </p>

      {loading ? (
        <p className="text-[var(--color-muted)]">Loading…</p>
      ) : list.length === 0 ? (
        <p className="text-[var(--color-muted)]">No subscribers yet.</p>
      ) : (
        <ul className="card divide-y divide-[var(--color-border)] overflow-hidden">
          {list.map((s) => (
            <li key={s.email} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm">
              <section>
                <span className="block text-white">{s.email}</span>
                <time className="text-xs text-[var(--color-muted)]">
                  Subscribed {new Date(s.subscribedAt).toLocaleString()}
                </time>
              </section>
              <section className="flex items-center gap-3">
                {s.welcomeSentAt ? (
                  <span className="flex items-center gap-1 text-xs text-[var(--color-accent)]">
                    <CheckCircle size={14} />
                    Notified {new Date(s.welcomeSentAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <AlertCircle size={14} />
                    {s.welcomeError || "Not notified"}
                  </span>
                )}
                <button
                  type="button"
                  className="btn-secondary text-xs"
                  disabled={resending === s.email}
                  onClick={() => resend(s.email)}
                >
                  <Send size={12} />
                  {resending === s.email ? "Sending…" : "Resend welcome"}
                </button>
              </section>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
