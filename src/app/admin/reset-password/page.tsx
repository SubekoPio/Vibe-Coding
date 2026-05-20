"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield } from "lucide-react";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Reset failed");
      return;
    }

    router.push("/admin/login");
  }

  if (!token) {
    return (
      <p className="text-center text-sm text-red-400">
        Invalid reset link.{" "}
        <Link href="/admin/forgot-password" className="text-[var(--color-accent)] hover:underline">
          Request a new one
        </Link>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card w-full max-w-sm space-y-6 p-8">
      <header className="text-center">
        <Shield className="mx-auto mb-3 text-[var(--color-accent)]" size={32} />
        <h1 className="text-xl font-semibold">Set new password</h1>
      </header>
      <label className="block">
        <span className="mb-1.5 block text-xs text-[var(--color-muted)]">New password</span>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Confirm password</span>
        <input
          type="password"
          className="input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          minLength={8}
          required
        />
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Saving…" : "Update password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <Suspense fallback={<p className="text-[var(--color-muted)]">Loading…</p>}>
        <ResetForm />
      </Suspense>
    </section>
  );
}
