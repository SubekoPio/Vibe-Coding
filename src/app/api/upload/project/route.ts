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
  const projectId = formData.get("projectId");

  if (!file || !(file instanceof File) || typeof projectId !== "string") {
    return NextResponse.json({ error: "File and projectId required" }, { status: 400 });
  }

  try {
    const { url } = await saveUpload(file, "project", projectId as string);
    const data = await getPortfolio();
    const idx = data.projects.findIndex((p) => p.id === projectId);
    if (idx < 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    data.projects[idx].imageUrl = url;
    await savePortfolio(data);
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 400 }
    );
  }
}
