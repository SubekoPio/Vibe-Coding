import { promises as fs } from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const RESUME_TYPES = new Set(["application/pdf"]);

function imageExt(file: File): string {
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";
  return ".jpg";
}

export async function saveUpload(
  file: File,
  kind: "avatar" | "resume" | "project" | "skill" | "blog" | "testimonial",
  id?: string
): Promise<{ url: string; filename: string }> {
  const allowed =
    kind === "resume" ? RESUME_TYPES : IMAGE_TYPES;
  if (!allowed.has(file.type)) {
    throw new Error(
      kind === "resume"
        ? "Resume must be a PDF file"
        : "Image must be JPEG, PNG, WebP, or GIF"
    );
  }

  const maxBytes =
    kind === "resume" ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`File too large (max ${kind === "resume" ? "10MB" : "5MB"})`);
  }

  const ext = kind === "resume" ? ".pdf" : imageExt(file);
  const filename =
    kind === "avatar"
      ? `avatar${ext}`
      : kind === "resume"
        ? `resume${ext}`
        : kind === "project"
          ? `project-${id}${ext}`
          : kind === "skill"
            ? `skill-${id}${ext}`
            : kind === "blog"
              ? `blog-${id}${ext}`
              : `testimonial-${id}${ext}`;
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);

  return { url: `/uploads/${filename}`, filename };
}

export async function getResumePath(): Promise<string | null> {
  const candidates = ["resume.pdf"];
  for (const name of candidates) {
    const p = path.join(UPLOADS_DIR, name);
    try {
      await fs.access(p);
      return p;
    } catch {
      continue;
    }
  }
  return null;
}
