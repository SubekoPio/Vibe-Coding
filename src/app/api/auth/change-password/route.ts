import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { changeAdminPassword } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();
  const result = await changeAdminPassword(currentPassword, newPassword);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
