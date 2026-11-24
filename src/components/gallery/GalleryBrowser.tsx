"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import CakeCard from "./CakeCard";
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
          {items.length === 0
            ? "Nos réalisations arrivent très bientôt."
            : "Aucune création ne correspond à ces filtres."}
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.08} y={40}>
              <CakeCard item={item} index={i} onOpen={() => setLightbox(i)} />
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
