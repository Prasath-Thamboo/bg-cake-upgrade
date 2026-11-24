"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import type { GalleryItem } from "@/lib/content/types";

type Props = {
  item: GalleryItem;
  /** position dans la grille : décale le rythme des diaporamas */
  index?: number;
  /** grande carte « vedette » qui remplit sa cellule */
  featured?: boolean;
  onOpen: () => void;
};

export default function CakeCard({ item, index = 0, featured = false, onOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const [slide, setSlide] = useState(0);

  const images = item.media.filter((m) => m.type === "image");
  const videos = item.media.filter((m) => m.type === "video");
  const video = videos[0];
  const photoCount = images.length;
  const playing = !!video && inView && !reduce;

  // Diaporama : tourne seul quand la carte est visible, accélère au survol
  useEffect(() => {
    if (video || reduce || !inView || images.length < 2) return;
    const delay = hover ? 1500 : 3400 + (index % 4) * 500;
    const t = setInterval(() => setSlide((s) => (s + 1) % images.length), delay);
    return () => clearInterval(t);
  }, [video, reduce, inView, hover, images.length, index]);

  // Vidéo : lecture muette en boucle uniquement quand visible
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  const current = images[slide % Math.max(images.length, 1)];
  const sizes = featured
    ? "(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
    : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={reduce ? undefined : { y: -8 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      aria-label={`Voir ${item.title}`}
      className={`group relative block w-full overflow-hidden rounded-3xl bg-cocoa text-left shadow-lift ring-1 ring-gold/20 ${
        featured ? "aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full" : "aspect-[4/5]"
      }`}
    >
      {/* ---------- Média ---------- */}
      {video ? (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster ?? (item.imageUrl || undefined)}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
        />
      ) : (
        <AnimatePresence initial={false}>
          {current ? (
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={current.src}
                alt={item.title}
                fill
                sizes={sizes}
                unoptimized={current.src.startsWith("http") && !current.src.includes(".supabase.co")}
                className={`object-cover ${reduce ? "" : "ken-burns"}`}
                style={{ animationDelay: `-${(index % 3) * 2}s` }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}

      {/* ---------- Voiles & reflet ---------- */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-cocoa/90 via-cocoa/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-tr from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

      {/* ---------- Badges ---------- */}
      <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
        {item.tag ? (
          <span className="rounded-full bg-porcelain/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cocoa ring-1 ring-gold/25 backdrop-blur">
            {item.tag}
          </span>
        ) : (
          <span />
        )}
        <div className="flex flex-col items-end gap-1.5">
          {videos.length > 0 ? (
            <span className="flex items-center gap-1.5 rounded-full bg-cocoa/60 px-2.5 py-1 text-[0.68rem] font-semibold text-porcelain ring-1 ring-white/15 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-berry opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-berry" />
              </span>
              Vidéo
            </span>
          ) : null}
          {photoCount > 1 ? (
            <span className="rounded-full bg-cocoa/60 px-2.5 py-1 text-[0.68rem] font-semibold text-porcelain ring-1 ring-white/15 backdrop-blur">
              {photoCount} photos
            </span>
          ) : null}
        </div>
      </div>

      {/* ---------- Texte ---------- */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        {!video && images.length > 1 ? (
          <div className="mb-4 flex gap-1.5" aria-hidden>
            {images.map((m, i) => (
              <span
                key={m.src}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === slide % images.length ? "w-6 bg-gold-soft" : "w-1.5 bg-porcelain/40"
                }`}
              />
            ))}
          </div>
        ) : null}

        <h3
          className={`font-display font-semibold leading-tight text-porcelain transition-transform duration-500 group-hover:-translate-y-1 ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {item.title}
        </h3>
        {item.description ? (
          <p className="mt-1.5 line-clamp-2 text-sm text-porcelain/75">{item.description}</p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-soft opacity-80 transition-all duration-500 group-hover:gap-3 group-hover:opacity-100">
          Découvrir
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
}
