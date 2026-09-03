"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Lightbox from "./Lightbox";
import type { GalleryItem } from "@/lib/content/types";

type FacetKey = "occasion" | "complexity" | "flavor";

function ChipRow({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string | null;
  onChange: (v: string | null) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cocoa-soft">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
          active === null
            ? "bg-cocoa text-bg"
            : "bg-porcelain/50 text-cocoa hover:bg-porcelain/80"
        }`}
      >
        Toutes
      </button>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(active === o ? null : o)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            active === o
              ? "bg-cocoa text-bg"
              : "bg-porcelain/50 text-cocoa ring-1 ring-gold/15 hover:bg-porcelain/80"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function GalleryBrowser({ items }: { items: GalleryItem[] }) {
  const [filters, setFilters] = useState<Record<FacetKey, string | null>>({
    occasion: null,
    complexity: null,
    flavor: null,
  });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const facets = useMemo(() => {
    const uniq = (xs: (string | null)[]) =>
      Array.from(new Set(xs.filter((x): x is string => !!x))).sort((a, b) =>
        a.localeCompare(b, "fr"),
      );
    return {
      occasion: uniq(items.map((i) => i.occasion)),
      complexity: uniq(items.map((i) => i.complexity)),
      flavor: uniq(items.flatMap((i) => i.flavors)),
    };
  }, [items]);

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (!filters.occasion || i.occasion === filters.occasion) &&
          (!filters.complexity || i.complexity === filters.complexity) &&
          (!filters.flavor || i.flavors.includes(filters.flavor)),
      ),
    [items, filters],
  );

  const hasFilters =
    Object.values(facets).some((f) => f.length > 0);

  const set = (k: FacetKey, v: string | null) =>
    setFilters((prev) => ({ ...prev, [k]: v }));

  return (
    <div>
      {hasFilters ? (
        <div className="card space-y-3 p-5">
          <ChipRow
            label="Occasion"
            options={facets.occasion}
            active={filters.occasion}
            onChange={(v) => set("occasion", v)}
          />
          <ChipRow
            label="Complexité"
            options={facets.complexity}
            active={filters.complexity}
            onChange={(v) => set("complexity", v)}
          />
          <ChipRow
            label="Saveur"
            options={facets.flavor}
            active={filters.flavor}
            onChange={(v) => set("flavor", v)}
          />
        </div>
      ) : null}

      <p className="mt-5 text-sm text-cocoa-soft">
        {filtered.length} création{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="card mt-4 p-10 text-center text-sm text-cocoa-soft">
          Aucune création ne correspond à ces filtres.
        </div>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.06}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block h-full w-full overflow-hidden card text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  {item.tag ? (
                    <span className="absolute left-4 top-4 rounded-full bg-porcelain/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cocoa ring-1 ring-gold/20 backdrop-blur">
                      {item.tag}
                    </span>
                  ) : null}
                </div>
                <div className="p-5">
                  <h3 className="font-sans text-base font-bold text-cocoa">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 line-clamp-2 text-sm text-cocoa-soft">
                      {item.description}
                    </p>
                  ) : null}
                  <span className="mt-4 inline-block text-xs font-semibold text-gold">
                    Voir le détail →
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {lightbox !== null && filtered[lightbox] ? (
        <Lightbox
          items={filtered}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndex={setLightbox}
        />
      ) : null}
    </div>
  );
}
