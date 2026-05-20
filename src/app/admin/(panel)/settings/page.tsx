"use client";

import { FormEvent, useState } from "react";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to change password");
      return;
    }

    setMessage("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirm("");
  }

  return (
    <article>
      <header className="mb-6 flex items-center gap-3">
        <Settings className="text-[var(--color-accent)]" size={24} />
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>

      <form onSubmit={handleSubmit} className="card max-w-md space-y-4 p-6">
        <h2 className="text-lg font-medium">Change password</h2>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Current password</span>
          <input
            type="password"
            className="input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">New password</span>
          <input
            type="password"
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Confirm new password</span>
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
        {message && <p className="text-sm text-[var(--color-accent)]">{message}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Saving…" : "Update password"}
        </button>
      </form>
    </article>
  );
}
