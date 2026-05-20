import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, saveTestimonials } from "@/lib/testimonials";
import { requireAdmin } from "@/lib/session";
import type { Testimonial } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await getTestimonials());
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = (await request.json()) as Testimonial[];
  await saveTestimonials(items);
  return NextResponse.json({ ok: true });
}
