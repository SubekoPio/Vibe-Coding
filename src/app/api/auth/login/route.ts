import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { verifyAdminPassword } from "@/lib/admin";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!(await verifyAdminPassword(password))) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
