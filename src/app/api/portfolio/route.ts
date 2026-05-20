import { NextRequest, NextResponse } from "next/server";
import { getPortfolio, savePortfolio } from "@/lib/portfolio";
import { requireAdmin } from "@/lib/session";
import type { PortfolioData } from "@/lib/types";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as PortfolioData;
  await savePortfolio(body);
  return NextResponse.json({ ok: true });
}
