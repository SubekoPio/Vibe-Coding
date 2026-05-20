import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { deleteMessage, getMessages, markMessageRead } from "@/lib/messages";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getMessages());
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, read } = await request.json();
  await markMessageRead(id, Boolean(read));
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
