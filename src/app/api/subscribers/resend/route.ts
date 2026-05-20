import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { resendWelcome } from "@/lib/subscribers";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email } = await request.json();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const result = await resendWelcome(email, siteUrl);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
