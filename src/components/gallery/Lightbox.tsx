"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/ui/Button";
import type { GalleryItem, GalleryMedia } from "@/lib/content/types";

const unopt = (src: string) => src.startsWith("http") && !src.includes(".supabase.co");

function MediaView({ media, title }: { media: GalleryMedia; title: string }) {
  if (media.type === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        controls
        autoPlay
        loop
        playsInline
        className="relative h-full w-full object-contain"
      />
    );
  }
  return (
    <>
      {/* fond flouté de la même photo, pour habiller les formats verticaux */}
      <Image
        src={media.src}
        alt=""
        fill
        sizes="64px"
        unoptimized={unopt(media.src)}
        className="scale-110 object-cover opacity-60 blur-2xl"
        aria-hidden
      />
      <Image
        src={media.src}
        alt={title}
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        unoptimized={unopt(media.src)}
        className="object-contain"
        priority
      />
    </>
  );
}

function Viewer({
  item,
  onClose,
  onPrevCake,
  onNextCake,
  cakeLabel,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrevCake?: () => void;
  onNextCake?: () => void;
  cakeLabel: string;
}) {
  const media = item.media.length
    ? item.media
    : item.imageUrl
      ? [{ type: "image" as const, src: item.imageUrl }]
      : [];
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (d: number) => {
      if (media.length < 2) return;
      setState(([cur]) => [(cur + d + media.length) % media.length, d]);
    },
    [media.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        if (media.length > 1) go(-1);
        else onPrevCake?.();
      }
      if (e.key === "ArrowRight") {
        if (media.length > 1) go(1);
        else onNextCake?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, media.length, onClose, onPrevCake, onNextCake]);

  const current = media[i];

  const meta = [
    item.occasion ? { k: "Occasion", v: item.occasion } : null,
    item.complexity ? { k: "Complexité", v: item.complexity } : null,
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="relative z-10 flex max-h-full w-full max-w-6xl flex-col overflow-y-auto rounded-3xl bg-bg shadow-lift md:flex-row md:overflow-hidden"
    >
      {/* ---------- Scène média ---------- */}
      <div className="flex w-full shrink-0 flex-col bg-cocoa md:w-[62%]">
        <div className="relative h-[55vh] overflow-hidden md:h-[78vh]">
          <AnimatePresence initial={false} custom={dir}>
            {current ? (
              <motion.div
                key={current.src}
                custom={dir}
                className="absolute inset-0"
                variants={{
                  enter: (d: number) => ({ x: d >= 0 ? "60%" : "-60%", opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d >= 0 ? "-60%" : "60%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                drag={media.length > 1 && current.type === "image" ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
              >
                <MediaView media={current} title={item.title} />
              </motion.div>
            ) : null}
          </AnimatePresence>

          {media.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Photo précédente"
                className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-bg/85 text-xl text-cocoa shadow-soft transition hover:scale-110 hover:bg-bg"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Photo suivante"
                className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-bg/85 text-xl text-cocoa shadow-soft transition hover:scale-110 hover:bg-bg"
              >
                ›
              </button>
              <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-cocoa/70 px-3 py-1 text-xs font-semibold text-porcelain backdrop-blur">
                {i + 1} / {media.length}
              </span>
            </>
          ) : null}
        </div>

        {/* miniatures */}
        {media.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto p-3">
            {media.map((m, k) => (
              <button
                key={m.src}
                type="button"
                onClick={() => setState([k, k > i ? 1 : -1])}
                aria-label={`${m.type === "video" ? "Vidéo" : "Photo"} ${k + 1}`}
                className={`relative h-16 w-14 shrink-0 overflow-hidden rounded-xl transition ${
                  k === i ? "ring-2 ring-gold-soft" : "opacity-55 hover:opacity-100"
                }`}
              >
                {m.type === "image" ? (
                  <Image src={m.src} alt="" fill sizes="56px" unoptimized={unopt(m.src)} className="object-cover" />
                ) : m.poster ? (
                  <Image src={m.poster} alt="" fill sizes="56px" className="object-cover" />
                ) : (
                  <video src={`${m.src}#t=0.5`} muted preload="metadata" className="h-full w-full object-cover" />
                )}
                {m.type === "video" ? (
                  <span className="absolute inset-0 grid place-items-center bg-cocoa/30 text-porcelain">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* ---------- Fiche ---------- */}
      <div className="flex min-w-0 flex-1 flex-col p-6 md:overflow-y-auto md:p-8">
        <span className="text-xs font-medium text-cocoa-soft">{cakeLabel}</span>
        {item.tag ? <span className="eyebrow mt-3">{item.tag}</span> : null}
        <h2 className="mt-2 font-display text-2xl font-semibold text-cocoa md:text-3xl">{item.title}</h2>
        {item.description ? (
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-cocoa-soft">{item.description}</p>
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

        <div className="mt-auto space-y-3 pt-8">
          <Link href={item.configQuery ? `/devis?${item.configQuery}` : "/devis"}>
            <Button type="button" size="lg" className="w-full">
              {item.configQuery ? "Réutiliser ce design" : "Je veux un gâteau comme celui-ci"}
            </Button>
          </Link>
          {onPrevCake || onNextCake ? (
            <div className="flex justify-between gap-3 text-sm font-semibold text-cocoa">
              <button type="button" onClick={onPrevCake} className="rounded-full px-3 py-2 transition hover:bg-cream">
                ← Gâteau précédent
              </button>
              <button type="button" onClick={onNextCake} className="rounded-full px-3 py-2 transition hover:bg-cream">
                Gâteau suivant →
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-bg/85 text-cocoa shadow-soft ring-1 ring-cocoa/10 transition hover:rotate-90 hover:bg-bg"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  );
}

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!item) return null;
  const many = items.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      <motion.button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-cocoa/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <Viewer
        key={item.id}
        item={item}
        onClose={onClose}
        cakeLabel={many ? `Création ${index + 1} sur ${items.length}` : "Création"}
        onPrevCake={many ? () => onIndex((index - 1 + items.length) % items.length) : undefined}
        onNextCake={many ? () => onIndex((index + 1) % items.length) : undefined}
      />
    </div>
  );
}
