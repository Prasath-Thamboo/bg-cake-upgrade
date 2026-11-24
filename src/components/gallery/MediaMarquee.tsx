"use client";

import Image from "next/image";
import type { GalleryItem } from "@/lib/content/types";

type Tile = { src: string; video: boolean; cake: number; title: string };

function Row({ tiles, reverse, duration, onOpen }: {
  tiles: Tile[];
  reverse?: boolean;
  duration: number;
  onOpen: (cake: number) => void;
}) {
  // la liste est doublée pour une boucle sans couture
  const loop = [...tiles, ...tiles];
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`marquee-track flex gap-4 ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((t, k) => (
          <button
            key={`${t.src}-${k}`}
            type="button"
            onClick={() => onOpen(t.cake)}
            aria-hidden={k >= tiles.length}
            tabIndex={k >= tiles.length ? -1 : 0}
            aria-label={`Voir ${t.title}`}
            className="group relative h-36 w-28 shrink-0 overflow-hidden rounded-2xl bg-cream shadow-soft ring-1 ring-gold/20 sm:h-44 sm:w-36"
          >
            {t.video ? (
              <video
                src={`${t.src}#t=0.5`}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
            ) : (
              <Image
                src={t.src}
                alt=""
                fill
                sizes="144px"
                unoptimized={t.src.startsWith("http") && !t.src.includes(".supabase.co")}
                className="object-cover transition duration-700 group-hover:scale-110"
              />
            )}
            <span className="pointer-events-none absolute inset-0 bg-cocoa/0 transition group-hover:bg-cocoa/20" />
            {t.video ? (
              <span className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-porcelain/85 text-cocoa">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Deux rubans de photos qui défilent en sens inverse (pause au survol). */
export default function MediaMarquee({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (cake: number) => void;
}) {
  const tiles: Tile[] = items.flatMap((it, cake) =>
    it.media.map((m) => ({
      src: m.type === "video" && m.poster ? m.poster : m.src,
      video: m.type === "video" && !m.poster,
      cake,
      title: it.title,
    })),
  );
  if (tiles.length < 4) return null;

  // on remplit pour que chaque ruban dépasse largement la largeur d'écran
  const filled: Tile[] = [];
  while (filled.length < 14) filled.push(...tiles);
  const half = Math.ceil(filled.length / 2);
  const a = filled.slice(0, half);
  const b = filled.slice(half).reverse();

  return (
    <div className="space-y-4">
      <Row tiles={a} duration={a.length * 4} onOpen={onOpen} />
      <Row tiles={b.length ? b : a} duration={(b.length || a.length) * 4.5} reverse onOpen={onOpen} />
    </div>
  );
}
