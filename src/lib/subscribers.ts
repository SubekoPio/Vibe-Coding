import { promises as fs } from "fs";
import path from "path";
import { getPortfolio } from "./portfolio";
import { sendSubscriberWelcome } from "./email";

const SUBSCRIBERS_PATH = path.join(process.cwd(), "src/data/subscribers.json");

export interface Subscriber {
  email: string;
  subscribedAt: string;
  welcomeSentAt: string | null;
  welcomeError: string | null;
}

export async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(SUBSCRIBERS_PATH, "utf-8");
    const list = JSON.parse(raw) as Subscriber[];
    return list.map((s) => ({
      ...s,
      welcomeSentAt: s.welcomeSentAt ?? null,
      welcomeError: s.welcomeError ?? null,
    }));
  } catch {
    return [];
  }
}

async function writeSubscribers(list: Subscriber[]): Promise<void> {
  await fs.mkdir(path.dirname(SUBSCRIBERS_PATH), { recursive: true });
  await fs.writeFile(SUBSCRIBERS_PATH, JSON.stringify(list, null, 2), "utf-8");
}

export async function addSubscriber(
  email: string,
  siteUrl: string
): Promise<{ ok: boolean; error?: string; welcomeSent: boolean }> {
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, error: "Invalid email address", welcomeSent: false };
  }

  const list = await getSubscribers();
  const existing = list.find((s) => s.email === normalized);

  if (existing?.welcomeSentAt) {
    return { ok: true, welcomeSent: true };
  }

  const { profile } = await getPortfolio();
  const result = await sendSubscriberWelcome(normalized, profile.name, siteUrl);

  const entry: Subscriber = existing ?? {
    email: normalized,
    subscribedAt: new Date().toISOString(),
    welcomeSentAt: null,
    welcomeError: null,
  };

  if (result.sent) {
    entry.welcomeSentAt = new Date().toISOString();
    entry.welcomeError = null;
  } else {
    entry.welcomeError = result.error ?? "Failed to send welcome email";
  }

  const next = existing
    ? list.map((s) => (s.email === normalized ? entry : s))
    : [...list, entry];

  await writeSubscribers(next);

  return {
    ok: true,
    welcomeSent: result.sent,
    error: result.sent ? undefined : entry.welcomeError ?? undefined,
  };
}

export async function resendWelcome(
  email: string,
  siteUrl: string
): Promise<{ ok: boolean; error?: string }> {
  const list = await getSubscribers();
  const idx = list.findIndex((s) => s.email === email.toLowerCase());
  if (idx < 0) return { ok: false, error: "Subscriber not found" };

  const { profile } = await getPortfolio();
  const result = await sendSubscriberWelcome(email, profile.name, siteUrl);

  if (result.sent) {
    list[idx].welcomeSentAt = new Date().toISOString();
    list[idx].welcomeError = null;
  } else {
    list[idx].welcomeError = result.error ?? "Send failed";
  }
  await writeSubscribers(list);
  return { ok: result.sent, error: result.error };
}
