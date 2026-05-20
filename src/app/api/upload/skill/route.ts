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
  const skillId = formData.get("skillId");

  if (!file || !(file instanceof File) || typeof skillId !== "string") {
    return NextResponse.json({ error: "File and skillId required" }, { status: 400 });
  }

  try {
    const { url } = await saveUpload(file, "skill", skillId);
    const data = await getPortfolio();
    const idx = data.skills.findIndex((s) => s.id === skillId);
    if (idx < 0) return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    data.skills[idx].imageUrl = url;
    await savePortfolio(data);
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 400 }
    );
  }
}
