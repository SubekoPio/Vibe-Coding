import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const result = await addSubscriber(email, siteUrl);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const message = result.welcomeSent
    ? "Thanks for subscribing! Check your inbox for a confirmation."
    : "You're subscribed! (Welcome email will send when email is configured.)";

  return NextResponse.json({ ok: true, message, welcomeSent: result.welcomeSent });
}
