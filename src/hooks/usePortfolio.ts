"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioData } from "@/lib/types";

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/portfolio");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save(next: PortfolioData) {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaving(false);
    if (res.ok) {
      setData(next);
      setMessage("Saved successfully");
    } else {
      setMessage("Failed to save");
    }
  }

  return { data, setData, loading, saving, message, save, reload: load };
}
