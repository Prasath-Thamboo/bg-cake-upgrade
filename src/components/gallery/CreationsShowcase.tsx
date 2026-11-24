"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import CakeCard from "./CakeCard";
import Lightbox from "./Lightbox";
import MediaMarquee from "./MediaMarquee";
import type { GalleryItem } from "@/lib/content/types";

/**
 * Vitrine de la page d'accueil : grille de cartes animées
 * (la première en vedette quand la grille le permet),
 * ruban défilant de toutes les photos, et visionneuse plein écran.
 */
export default function CreationsShowcase({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <Reveal>
        <div className="card mt-10 p-12 text-center">
          <div className="text-3xl" aria-hidden>🎂</div>
          <p className="mt-3 font-display text-xl text-cocoa">Nos réalisations arrivent très bientôt</p>
          <p className="mt-2 text-sm text-cocoa-soft">
            Les photos de nos derniers gâteaux seront publiées ici.
          </p>
        </div>
      </Reveal>
    );
  }

  // vedette (2×2) quand elle tombe juste : 3 gâteaux, ou 6 et plus
  const featured = items.length === 3 || items.length >= 6;
  const shown = items.slice(0, 6);
  const cols =
    shown.length === 1
      ? "mx-auto max-w-md"
      : shown.length === 2 || shown.length === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <div className={`mt-10 grid gap-5 ${shown.length === 2 ? "sm:grid-cols-2 lg:mx-auto lg:max-w-4xl lg:grid-cols-2" : cols}`}>
        {shown.map((item, i) => {
          const big = featured && i === 0;
          return (
            <Reveal
              key={item.id}
              delay={(i % 3) * 0.1}
              y={40}
              className={big ? "sm:col-span-2 lg:row-span-2" : undefined}
            >
              <CakeCard item={item} index={i} featured={big} onOpen={() => setOpen(i)} />
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12">
          <MediaMarquee items={items} onOpen={setOpen} />
        </div>
      </Reveal>

      {open !== null ? (
        <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      ) : null}
    </>
  );
}
