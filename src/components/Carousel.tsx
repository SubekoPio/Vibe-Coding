"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export function Carousel({
  items,
  autoPlayMs = 5000,
  className,
}: {
  items: ReactNode[];
  autoPlayMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1 || !autoPlayMs) return;
    const t = setInterval(next, autoPlayMs);
    return () => clearInterval(t);
  }, [count, autoPlayMs, next]);

  if (count === 0) return null;

  return (
    <section className={clsx("relative", className)}>
      <section className="overflow-hidden">
        <section
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <section key={i} className="w-full shrink-0">
              {item}
            </section>
          ))}
        </section>
      </section>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-2 text-[var(--color-muted)] transition-colors hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-2 text-[var(--color-muted)] transition-colors hover:text-white"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
          <nav className="mt-4 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={clsx(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-[var(--color-accent)]" : "w-2 bg-[var(--color-border)]"
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </nav>
        </>
      )}
    </section>
  );
}
