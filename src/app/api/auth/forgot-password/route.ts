import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken, buildResetUrl } from "@/lib/admin";
import { getPortfolio } from "@/lib/portfolio";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const normalized = String(email || "")
    .trim()
    .toLowerCase();

  const { profile } = await getPortfolio();
  const adminEmail = (process.env.ADMIN_EMAIL || profile.email).toLowerCase();

  // Always return success to avoid email enumeration
  const success = () =>
    NextResponse.json({
      ok: true,
      message: "If that email is registered, you will receive a reset link shortly.",
    });

  if (!normalized || normalized !== adminEmail) {
    return success();
  }

  const token = await createPasswordResetToken();
  const origin = request.nextUrl.origin;
  const resetUrl = buildResetUrl(token, origin);

  // Optional: send via Resend if configured
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>",
        to: normalized,
        subject: "Reset your admin password",
        html: `<p>Click to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 1 hour.</p>`,
      }),
    });
  }

  const body: Record<string, unknown> = {
    ok: true,
    message: "If that email is registered, you will receive a reset link shortly.",
  };

  // Dev helper when email is not configured
  if (process.env.NODE_ENV === "development" && !resendKey) {
    body.devResetUrl = resetUrl;
  }

  return NextResponse.json(body);
}
