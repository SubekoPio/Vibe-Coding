import { Download } from "lucide-react";
import { getPortfolio } from "@/lib/portfolio";
import { getResumePath } from "@/lib/uploads";

export async function CvDownloadButton({ className }: { className?: string }) {
  const { profile } = await getPortfolio();
  const hasLocal = await getResumePath();
  const hasCv = hasLocal || Boolean(profile.resumeUrl);

  if (!hasCv) return null;

  return (
    <a href="/api/cv" className={className ?? "btn-secondary"} download>
      <Download size={18} />
      Download CV
    </a>
  );
}
