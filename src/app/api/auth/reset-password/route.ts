import { NextRequest, NextResponse } from "next/server";
import { resetPasswordWithToken } from "@/lib/admin";

export async function POST(request: NextRequest) {
  const { token, newPassword } = await request.json();
  const result = await resetPasswordWithToken(token, newPassword);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
