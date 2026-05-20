export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean; error?: string }> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return { sent: false, error: "Email not configured (set RESEND_API_KEY)" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>",
      to: options.to,
      subject: options.subject,
      html: options.html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { sent: false, error: err };
  }
  return { sent: true };
}

export async function sendSubscriberWelcome(
  email: string,
  siteName: string,
  siteUrl: string
): Promise<{ sent: boolean; error?: string }> {
  const tag = "div";
  const html = `<${tag} style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;color:#e8eef5;background:#0a0f14;padding:32px;border-radius:12px;">
<h1 style="color:#22d3a8;">Thanks for subscribing!</h1>
<p style="color:#8b9cb3;line-height:1.6;">You've been added to <strong>${siteName}</strong>'s newsletter. You'll get updates on projects and blog posts.</p>
<p><a href="${siteUrl}" style="background:#22d3a8;color:#0a0f14;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Visit portfolio</a></p>
</${tag}>`;

  return sendEmail({
    to: email,
    subject: `Welcome — you're subscribed to ${siteName}`,
    html,
  });
}
