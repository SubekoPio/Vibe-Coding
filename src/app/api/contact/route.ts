import { NextRequest, NextResponse } from "next/server";
import { addMessage } from "@/lib/messages";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await addMessage(body);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Message sent. I'll get back to you soon!" });
}
