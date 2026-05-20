import { promises as fs } from "fs";
import path from "path";
import { generateId } from "./utils";

const MESSAGES_PATH = path.join(process.cwd(), "src/data/messages.json");

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export async function getMessages(): Promise<ContactMessage[]> {
  try {
    const raw = await fs.readFile(MESSAGES_PATH, "utf-8");
    return JSON.parse(raw) as ContactMessage[];
  } catch {
    return [];
  }
}

export async function addMessage(input: {
  name: string;
  email: string;
  subject: string;
  body: string;
}): Promise<{ ok: boolean; error?: string }> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const subject = input.subject.trim();
  const body = input.body.trim();

  if (!name || !email || !body) {
    return { ok: false, error: "Name, email, and message are required" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Invalid email address" };
  }

  const list = await getMessages();
  list.unshift({
    id: generateId(),
    name,
    email,
    subject: subject || "Portfolio inquiry",
    body,
    createdAt: new Date().toISOString(),
    read: false,
  });

  await fs.mkdir(path.dirname(MESSAGES_PATH), { recursive: true });
  await fs.writeFile(MESSAGES_PATH, JSON.stringify(list, null, 2), "utf-8");
  return { ok: true };
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  const list = await getMessages();
  const idx = list.findIndex((m) => m.id === id);
  if (idx >= 0) {
    list[idx].read = read;
    await fs.writeFile(MESSAGES_PATH, JSON.stringify(list, null, 2), "utf-8");
  }
}

export async function deleteMessage(id: string): Promise<void> {
  const list = await getMessages();
  await fs.writeFile(
    MESSAGES_PATH,
    JSON.stringify(
      list.filter((m) => m.id !== id),
      null,
      2
    ),
    "utf-8"
  );
}
