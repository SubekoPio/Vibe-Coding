"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Invalid password");
      return;
    }

    const from = searchParams.get("from") || "/admin";
    router.push(from);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="card w-full max-w-sm space-y-6 p-8">
      <header className="text-center">
        <Lock className="mx-auto mb-3 text-[var(--color-accent)]" size={32} />
        <h1 className="text-xl font-semibold">Admin login</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">Enter your admin password</p>
      </header>
      <label className="block">
        <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Password</span>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
        />
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm">
        <Link href="/admin/forgot-password" className="text-[var(--color-accent)] hover:underline">
          Forgot password?
        </Link>
      </p>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <Suspense fallback={<p className="text-[var(--color-muted)]">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
