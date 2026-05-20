import { Star } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "@/lib/types";
import { Carousel } from "./Carousel";
import { AnimateIn } from "./AnimateIn";

function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <blockquote className="card mx-2 flex h-full flex-col p-8">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < t.rating ? "fill-[var(--color-accent)] text-[var(--color-accent)]" : "text-[var(--color-border)]"}
          />
        ))}
      </div>
      <p className="mb-6 flex-1 text-lg leading-relaxed text-[#e8eef5]">&ldquo;{t.quote}&rdquo;</p>
      <footer className="flex items-center gap-4">
        {t.avatarUrl ? (
          <Image
            src={t.avatarUrl}
            alt={t.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-sm font-semibold text-[var(--color-accent)]">
            {initials}
          </span>
        )}
        <cite className="not-italic">
          <p className="font-semibold text-white">{t.name}</p>
          <p className="text-sm text-[var(--color-muted)]">
            {t.role}
            {t.company ? ` · ${t.company}` : ""}
          </p>
        </cite>
      </footer>
    </blockquote>
  );
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <AnimateIn>
      <Carousel
        items={testimonials.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
        autoPlayMs={6000}
      />
    </AnimateIn>
  );
}
