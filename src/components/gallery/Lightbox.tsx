"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { GalleryItem } from "@/lib/content/types";

export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const item = items[index];

  const prev = useCallback(
    () => onIndex((index - 1 + items.length) % items.length),
    [index, items.length, onIndex],
  );
  const next = useCallback(
    () => onIndex((index + 1) % items.length),
    [index, items.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  if (!item) return null;

  const meta = [
    item.occasion ? { k: "Occasion", v: item.occasion } : null,
    item.complexity ? { k: "Complexité", v: item.complexity } : null,
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-cocoa/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-bg shadow-lift md:flex-row">
        <div className="relative aspect-[4/3] w-full shrink-0 bg-cream md:aspect-auto md:w-3/5">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-6 md:p-8">
          {item.tag ? (
            <span className="eyebrow">{item.tag}</span>
          ) : null}
          <h2 className="mt-2 font-display text-2xl font-semibold text-cocoa">
            {item.title}
          </h2>
          {item.description ? (
            <p className="mt-3 text-sm leading-7 text-cocoa-soft">
              {item.description}
            </p>
          ) : null}

          {meta.length > 0 ? (
            <dl className="mt-5 grid gap-2 text-sm">
              {meta.map((m) => (
                <div key={m.k} className="flex justify-between gap-4">
                  <dt className="text-cocoa-soft">{m.k}</dt>
                  <dd className="font-medium text-cocoa">{m.v}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {item.flavors.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.flavors.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-porcelain/60 px-3 py-1 text-xs font-semibold text-cocoa ring-1 ring-gold/20"
                >
                  {f}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-auto pt-6">
            {item.configQuery ? (
              <Link href={`/devis?${item.configQuery}`}>
                <Button type="button" size="lg" className="w-full">
                  Réutiliser ce design
                </Button>
              </Link>
            ) : (
              <Link href="/devis">
                <Button type="button" size="lg" variant="outline" className="w-full">
                  Composer un gâteau
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* contrôles */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-bg/80 text-cocoa ring-1 ring-cocoa/10 hover:bg-bg"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Précédent"
              className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-bg/80 text-cocoa ring-1 ring-cocoa/10 hover:bg-bg md:left-3"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Suivant"
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-bg/80 text-cocoa ring-1 ring-cocoa/10 hover:bg-bg md:right-3"
            >
              ›
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
