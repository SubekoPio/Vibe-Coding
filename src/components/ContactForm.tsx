"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, body }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setMessage(data.message);
      setName("");
      setEmail("");
      setSubject("");
      setBody("");
    } else {
      setStatus("error");
      setMessage(data.error || "Failed to send");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Name</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
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
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Subject</span>
        <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Message</span>
        <textarea
          className="input min-h-[140px]"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="btn-primary" disabled={status === "loading"}>
        <Send size={16} />
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {message && (
        <p className={`text-sm ${status === "error" ? "text-red-400" : "text-[var(--color-accent)]"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
