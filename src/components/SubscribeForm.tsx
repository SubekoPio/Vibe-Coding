"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";

export function SubscribeForm({ compact }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setMessage(data.message || "Subscribed!");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "flex flex-col gap-3 sm:flex-row" : "space-y-3"}>
      <label className={compact ? "flex-1" : "block"}>
        <span className="sr-only">Email</span>
        <input
          type="email"
          className="input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
      </label>
      <button type="submit" className="btn-primary shrink-0" disabled={status === "loading"}>
        <Mail size={16} />
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {message && (
        <p
          className={`text-sm ${status === "error" ? "text-red-400" : "text-[var(--color-accent)]"} ${compact ? "sm:basis-full" : ""}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
