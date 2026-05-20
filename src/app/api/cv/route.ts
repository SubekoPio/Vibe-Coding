import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getPortfolio } from "@/lib/portfolio";
import { getResumePath } from "@/lib/uploads";

export async function GET() {
  const localPath = await getResumePath();

  if (localPath) {
    const buffer = await fs.readFile(localPath);
    const { profile } = await getPortfolio();
    const filename = `${profile.name.replace(/\s+/g, "_")}_CV.pdf`;
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  const { profile } = await getPortfolio();
  if (profile.resumeUrl) {
    if (profile.resumeUrl.startsWith("/")) {
      const filePath = path.join(process.cwd(), "public", profile.resumeUrl);
      try {
        const buffer = await fs.readFile(filePath);
        const filename = `${profile.name.replace(/\s+/g, "_")}_CV.pdf`;
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${filename}"`,
          },
        });
      } catch {
        // fall through
      }
    }
    return NextResponse.redirect(profile.resumeUrl);
  }

  return NextResponse.json({ error: "No CV available" }, { status: 404 });
}
