"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [devUrl, setDevUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setDevUrl("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);
    setMessage(data.message || "Check your email for a reset link.");
    if (data.devResetUrl) setDevUrl(data.devResetUrl);
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm space-y-6 p-8">
        <header className="text-center">
          <KeyRound className="mx-auto mb-3 text-[var(--color-accent)]" size={32} />
          <h1 className="text-xl font-semibold">Reset password</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Enter your admin email to receive a reset link
          </p>
        </header>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Email</span>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Sending…" : "Send reset link"}
        </button>
        {message && <p className="text-sm text-[var(--color-accent)]">{message}</p>}
        {devUrl && (
          <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-xs break-all text-[var(--color-muted)]">
            Dev reset link:{" "}
            <a href={devUrl} className="text-[var(--color-accent)] hover:underline">
              {devUrl}
            </a>
          </p>
        )}
        <p className="text-center text-sm">
          <Link href="/admin/login" className="text-[var(--color-muted)] hover:text-white">
            ← Back to login
          </Link>
        </p>
      </form>
    </section>
  );
}
