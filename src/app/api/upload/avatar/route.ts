import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { saveUpload } from "@/lib/uploads";
import { getPortfolio, savePortfolio } from "@/lib/portfolio";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const { url } = await saveUpload(file, "avatar");
    const data = await getPortfolio();
    data.profile.avatarUrl = url;
    await savePortfolio(data);
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 400 }
    );
  }
}
