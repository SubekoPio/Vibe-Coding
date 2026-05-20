import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { getSubscribers } from "@/lib/subscribers";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscribers = await getSubscribers();
  return NextResponse.json(subscribers);
}
