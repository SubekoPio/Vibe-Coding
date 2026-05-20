"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id: string, read: boolean) {
    await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <article>
      <header className="mb-6 flex items-center gap-3">
        <Mail className="text-[var(--color-accent)]" size={24} />
        <h1 className="text-2xl font-bold">Messages</h1>
        {unread > 0 && (
          <span className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-sm text-[var(--color-accent)]">
            {unread} unread
          </span>
        )}
      </header>

      {loading ? (
        <p className="text-[var(--color-muted)]">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-[var(--color-muted)]">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`card p-5 ${m.read ? "opacity-75" : "border-[var(--color-accent)]/30"}`}
            >
              <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <section>
                  <h2 className="font-medium text-white">{m.name}</h2>
                  <a href={`mailto:${m.email}`} className="text-sm text-[var(--color-accent)]">
                    {m.email}
                  </a>
                </section>
                <time className="text-xs text-[var(--color-muted)]">
                  {new Date(m.createdAt).toLocaleString()}
                </time>
              </header>
              <p className="mb-2 text-sm font-medium text-[#e8eef5]">{m.subject}</p>
              <p className="mb-4 whitespace-pre-wrap text-sm text-[var(--color-muted)]">{m.body}</p>
              <footer className="flex gap-2">
                <button
                  type="button"
                  className="btn-secondary text-xs"
                  onClick={() => toggleRead(m.id, !m.read)}
                >
                  Mark as {m.read ? "unread" : "read"}
                </button>
                <button type="button" className="btn-danger" onClick={() => remove(m.id)}>
                  <Trash2 size={14} />
                  Delete
                </button>
              </footer>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
