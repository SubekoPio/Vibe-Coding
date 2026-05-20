import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  whatsapp,
  message,
  className,
}: {
  whatsapp: string;
  message?: string;
  className?: string;
}) {
  if (!whatsapp?.trim()) return null;

  const digits = whatsapp.replace(/\D/g, "");
  if (!digits) return null;

  const text = encodeURIComponent(
    message || "Hi! I found your portfolio and would like to connect."
  );
  const href = `https://wa.me/${digits}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "btn-primary"}
    >
      <MessageCircle size={18} />
      Chat on WhatsApp
    </a>
  );
}
