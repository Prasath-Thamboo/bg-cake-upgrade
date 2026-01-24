// src/components/sections/CakeBuilder.tsx
"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";

type Option = {
  id: string;
  label: string;
  note?: string;
  color?: string;
  priceAdd?: number;
};

type Palette = {
  id: string;
  name: string;
  accent: string;
  icing: string;
};

const sizeOptions: { id: string; label: string; basePrice: number }[] = [
  { id: "6-8", label: "6–8 parts", basePrice: 55 },
  { id: "10-12", label: "10–12 parts", basePrice: 85 },
  { id: "14-16", label: "14–16 parts", basePrice: 120 },
];

const spongeOptions: Option[] = [
  { id: "vanille", label: "Génoise vanille", note: "Douce & légère", color: "#F3E3B0" },
  { id: "chocolat", label: "Génoise chocolat", note: "Cacao intense", color: "#8B5A2B" },
  { id: "citron", label: "Génoise citron", note: "Fraîche & acidulée", color: "#F6E27F" },
  { id: "amande", label: "Génoise amande", note: "Fine & parfumée", color: "#EADCC6" },
];

const ganacheOptions: Option[] = [
  { id: "choco-noir", label: "Ganache chocolat noir", note: "Riche & intense", color: "#3B2416" },
  { id: "choco-lait", label: "Ganache chocolat au lait", note: "Rond & gourmand", color: "#6B3E1E" },
  { id: "vanille", label: "Ganache vanille", note: "Onctueuse", color: "#F2D7A7" },
  { id: "pistache", label: "Ganache pistache", note: "Premium", color: "#88A77E", priceAdd: 8 },
];

const insertOptions: Option[] = [
  { id: "framboise", label: "Insert framboise", note: "Coulis / compotée", color: "#B0123A" },
  { id: "passion", label: "Insert passion", note: "Fruité & exotique", color: "#F2A400" },
  { id: "fraise", label: "Insert fraise", note: "Classique", color: "#E23B4A" },
  { id: "caramel", label: "Insert caramel", note: "Beurre salé", color: "#B8742A" },
];

const frostingOptions: Option[] = [
  { id: "nude", label: "Nude cake", note: "Style minimal premium", priceAdd: 0 },
  { id: "buttercream", label: "Buttercream lisse", note: "Finition élégante", priceAdd: 10 },
  { id: "drip", label: "Drip (coulure)", note: "Effet événementiel", priceAdd: 15 },
];

const ornamentOptions: Option[] = [
  { id: "none", label: "Sans ornement", note: "Minimal", priceAdd: 0 },
  { id: "ribbon", label: "Ruban", note: "Couleur thème", priceAdd: 8 },
  { id: "gold", label: "Touches dorées", note: "Effet luxe", priceAdd: 12 },
  { id: "flowers", label: "Fleurs", note: "Romantique", priceAdd: 18 },
];

const palettes: Palette[] = [
  { id: "champagne", name: "Champagne", accent: "#C8A56A", icing: "#F3E7D6" },
  { id: "rose", name: "Rose poudré", accent: "#C77A8A", icing: "#F5E3E8" },
  { id: "emerald", name: "Émeraude", accent: "#2F6F59", icing: "#E7EFEA" },
  { id: "midnight", name: "Midnight", accent: "#2A2D3A", icing: "#ECECEC" },
];

function formatEuro(n: number) {
  return `${n.toFixed(0)}€`;
}

function findOption(list: Option[], id: string) {
  return list.find((o) => o.id === id) ?? list[0];
}

function findPalette(id: string) {
  return palettes.find((p) => p.id === id) ?? palettes[0];
}

function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string; note?: string; priceAdd?: number }[];
  hint?: string;
}) {
  const selected = options.find((o) => o.id === value);

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-cocoa/70">{label}</div>
          {hint ? <div className="mt-1 text-xs text-cocoa/60">{hint}</div> : null}
        </div>
        {selected?.priceAdd ? (
          <div className="text-xs font-semibold text-cocoa/70">+{selected.priceAdd}€</div>
        ) : null}
      </div>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl bg-white/40 px-4 py-3 text-sm font-semibold text-cocoa ring-1 ring-cocoa/10 backdrop-blur outline-none transition focus:ring-2 focus:ring-cocoa/20"
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>

        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/70"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {selected?.note ? <div className="text-xs text-cocoa/60">{selected.note}</div> : null}
    </div>
  );
}

function PaletteSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const selected = findPalette(value);

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-cocoa/70">Thème / palette</div>
          <div className="mt-1 text-xs text-cocoa/60">Accent + couleur de couverture</div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-full ring-1 ring-cocoa/10"
            style={{ backgroundColor: selected.accent }}
            aria-hidden="true"
          />
          <span
            className="h-5 w-5 rounded-full ring-1 ring-cocoa/10"
            style={{ backgroundColor: selected.icing }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl bg-white/40 px-4 py-3 text-sm font-semibold text-cocoa ring-1 ring-cocoa/10 backdrop-blur outline-none transition focus:ring-2 focus:ring-cocoa/20"
        >
          {palettes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/70"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

function CakePreview({
  sponge,
  ganache,
  insert,
  frosting,
  ornament,
  palette,
}: {
  sponge: Option;
  ganache: Option;
  insert: Option;
  frosting: Option;
  ornament: Option;
  palette: Palette;
}) {
  const icingColor = palette.icing;
  const accent = palette.accent;

  return (
    <div className="card p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold">Aperçu</div>
          <div className="mt-1 text-xs text-cocoa/70">Mis à jour instantanément</div>
        </div>
        <div className="text-xs font-semibold text-cocoa/70">{palette.name}</div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-sm">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40">
            {/* contour premium */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow:
                  "0 20px 60px -25px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(214,183,122,0.55)",
                borderRadius: "2.5rem",
              }}
            />

            {/* top */}
            <div
              className="h-10 w-full"
              style={{
                backgroundColor: frosting.id === "nude" ? (ganache.color ?? "#ddd") : icingColor,
              }}
            />

            {/* drip */}
            {frosting.id === "drip" ? (
              <svg
                className="absolute left-0 top-10 w-full"
                height="46"
                viewBox="0 0 400 46"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 C30,30 55,10 80,30 C105,50 130,15 155,35 C180,55 205,20 230,35 C255,50 280,15 305,32 C330,48 360,18 400,35 L400,0 Z"
                  fill={accent}
                  opacity="0.95"
                />
              </svg>
            ) : null}

            <div className="px-8 py-10">
              <div
                className="rounded-[2rem] p-3 ring-1 ring-black/5"
                style={{
                  backgroundColor: frosting.id === "buttercream" ? icingColor : "transparent",
                }}
              >
                <div className="space-y-3">
                  <div className="h-10 rounded-2xl ring-1 ring-black/5" style={{ backgroundColor: sponge.color }} />
                  <div
                    className="h-7 rounded-2xl ring-1 ring-black/5"
                    style={{ backgroundColor: ganache.color, opacity: 0.92 }}
                  />
                  <div className="h-5 rounded-2xl ring-1 ring-black/5" style={{ backgroundColor: insert.color }} />
                  <div
                    className="h-7 rounded-2xl ring-1 ring-black/5"
                    style={{ backgroundColor: ganache.color, opacity: 0.92 }}
                  />
                  <div className="h-10 rounded-2xl ring-1 ring-black/5" style={{ backgroundColor: sponge.color }} />
                </div>
              </div>
            </div>

            {/* ornament */}
            {ornament.id !== "none" ? (
              <div className="pointer-events-none absolute inset-0">
                {ornament.id === "ribbon" ? (
                  <div className="absolute left-1/2 top-[56%] -translate-x-1/2">
                    <div className="h-3 w-44 rounded-full shadow" style={{ backgroundColor: accent }} />
                    <div className="mt-2 flex justify-center gap-2">
                      <div className="h-6 w-10 -skew-x-12 rounded-lg" style={{ backgroundColor: accent, opacity: 0.9 }} />
                      <div className="h-6 w-10 skew-x-12 rounded-lg" style={{ backgroundColor: accent, opacity: 0.9 }} />
                    </div>
                  </div>
                ) : null}

                {ornament.id === "gold" ? (
                  <>
                    <span
                      className="absolute right-8 top-8 h-8 w-8 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(255,220,130,0.95), rgba(190,140,45,0.7))",
                        filter: "blur(0.2px)",
                      }}
                    />
                    <span
                      className="absolute left-10 bottom-10 h-6 w-6 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(255,220,130,0.95), rgba(190,140,45,0.7))",
                      }}
                    />
                  </>
                ) : null}

                {ornament.id === "flowers" ? (
                  <div className="absolute right-8 top-8 grid gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full ring-1 ring-white/60"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,200,210,0.7))",
                        }}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_200px_at_30%_10%,rgba(255,255,255,0.55),transparent)]" />
          </div>

          <div className="mt-5 grid gap-2 text-xs text-cocoa/80">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">Génoise</span>
              <span className="text-cocoa/70">{sponge.label}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">Ganache</span>
              <span className="text-cocoa/70">{ganache.label}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">Insert</span>
              <span className="text-cocoa/70">{insert.label}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">Couverture</span>
              <span className="text-cocoa/70">{frosting.label}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">Ornement</span>
              <span className="text-cocoa/70">{ornament.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CakeBuilder() {
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const [sizeId, setSizeId] = useState(sizeOptions[0].id);
  const [spongeId, setSpongeId] = useState(spongeOptions[0].id);
  const [ganacheId, setGanacheId] = useState(ganacheOptions[0].id);
  const [insertId, setInsertId] = useState(insertOptions[0].id);
  const [frostingId, setFrostingId] = useState(frostingOptions[0].id);
  const [ornamentId, setOrnamentId] = useState(ornamentOptions[0].id);
  const [paletteId, setPaletteId] = useState(palettes[0].id);

  const size = useMemo(() => sizeOptions.find((s) => s.id === sizeId) ?? sizeOptions[0], [sizeId]);
  const sponge = useMemo(() => findOption(spongeOptions, spongeId), [spongeId]);
  const ganache = useMemo(() => findOption(ganacheOptions, ganacheId), [ganacheId]);
  const insert = useMemo(() => findOption(insertOptions, insertId), [insertId]);
  const frosting = useMemo(() => findOption(frostingOptions, frostingId), [frostingId]);
  const ornament = useMemo(() => findOption(ornamentOptions, ornamentId), [ornamentId]);
  const palette = useMemo(() => findPalette(paletteId), [paletteId]);

  const estimate = useMemo(() => {
    const base = size.basePrice;
    const addons = (ganache.priceAdd ?? 0) + (frosting.priceAdd ?? 0) + (ornament.priceAdd ?? 0);
    const subtotal = base + addons;

    const complexity =
      (frosting.id === "drip" ? 0.07 : frosting.id === "buttercream" ? 0.05 : 0.03) +
      (ornament.id === "flowers" ? 0.06 : ornament.id === "gold" ? 0.04 : ornament.id === "ribbon" ? 0.03 : 0);

    const low = Math.max(0, subtotal * (1 - (0.08 + complexity)));
    const high = subtotal * (1 + (0.10 + complexity));

    return { low, high, base };
  }, [size.basePrice, ganache.priceAdd, frosting.priceAdd, ornament.priceAdd, frosting.id, ornament.id, size.basePrice]);

  const recapText = useMemo(() => {
    return `Récapitulatif (indicatif)
- Parts : ${size.label}
- Palette : ${palette.name}
- Génoise : ${sponge.label}
- Ganache : ${ganache.label}
- Insert : ${insert.label}
- Couverture : ${frosting.label}
- Ornement : ${ornament.label}
- Prix estimé : ${formatEuro(estimate.low)} – ${formatEuro(estimate.high)}`;
  }, [size.label, palette.name, sponge.label, ganache.label, insert.label, frosting.label, ornament.label, estimate.low, estimate.high]);

  const mailBody = useMemo(() => {
    return `Bonjour BG-Cake,

Je souhaite un devis pour un gâteau sur-mesure.
${recapText}

Date de l'événement :
Ville / livraison :
Thème / inspiration :

Merci !`;
  }, [recapText]);

  const mailHref = `${site.mailto}?subject=${encodeURIComponent("Devis gâteau sur-mesure")}&body=${encodeURIComponent(
    mailBody
  )}`;

  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const left = 48;
    let y = 64;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("BG-Cake — Récapitulatif (indicatif)", left, y);

    y += 28;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    recapText.split("\n").forEach((l) => {
      doc.text(l, left, y);
      y += 16;
    });

    y += 14;
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(
      "Note : prix estimé non contractuel. Le devis final dépend de la date, du design exact et de la complexité.",
      left,
      y,
      { maxWidth: 520 }
    );

    doc.save("bg-cake-recap.pdf");
  }

  return (
    <section id="composer" className="py-16">
      <Container>
        <SectionHeader
          badge="Sur-mesure"
          title="Composez votre gâteau"
          desc="Menus déroulants pour chaque choix. Sur mobile/tablette, l’aperçu reste accessible en continu via une barre sticky."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* DESKTOP: preview sticky à droite */}
          <div className="hidden lg:block lg:order-2 lg:sticky lg:top-24 h-fit">
            <CakePreview
              sponge={sponge}
              ganache={ganache}
              insert={insert}
              frosting={frosting}
              ornament={ornament}
              palette={palette}
            />
          </div>

          {/* CONTROLS */}
          <div className="lg:order-1 card p-6 md:p-8 pb-24 lg:pb-8">
            <div className="text-sm font-extrabold">Configuration</div>
            <div className="mt-1 text-xs text-cocoa/70">
              Sur mobile : l’aperçu se consulte en bas (sticky) sans remonter.
            </div>

            <div className="mt-8 grid gap-6">
              <SelectField
                label="Nombre de parts"
                value={sizeId}
                onChange={setSizeId}
                options={sizeOptions.map((s) => ({ id: s.id, label: s.label }))}
                hint="Base de calcul pour l’estimation"
              />

              <PaletteSelect value={paletteId} onChange={setPaletteId} />

              <SelectField label="Génoise" value={spongeId} onChange={setSpongeId} options={spongeOptions} />
              <SelectField label="Ganache" value={ganacheId} onChange={setGanacheId} options={ganacheOptions} />
              <SelectField
                label="Insert (coulis / caramel)"
                value={insertId}
                onChange={setInsertId}
                options={insertOptions}
              />
              <SelectField
                label="Couverture / glaçage"
                value={frostingId}
                onChange={setFrostingId}
                options={frostingOptions}
              />
              <SelectField label="Ornement" value={ornamentId} onChange={setOrnamentId} options={ornamentOptions} />
            </div>

            {/* Estimate */}
            <div className="mt-10 rounded-2xl bg-white/40 ring-1 ring-cocoa/10 p-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-cocoa/70">Prix estimé (indicatif)</div>
                  <div className="mt-1 text-2xl font-extrabold">
                    {formatEuro(estimate.low)} – {formatEuro(estimate.high)}
                  </div>
                </div>
                <div className="text-xs text-cocoa/60 text-right">Base {formatEuro(estimate.base)}</div>
              </div>
              <div className="mt-2 text-xs text-cocoa/60">
                Non contractuel. Le devis final dépend de la date, du design exact et de la complexité.
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a href={mailHref} className="sm:col-span-2">
                <Button type="button" className="w-full" size="lg">
                  Envoyer ma demande
                </Button>
              </a>
              <Button type="button" className="w-full" size="lg" variant="outline" onClick={downloadPdf}>
                PDF récap
              </Button>
            </div>

            <div className="mt-3 text-xs text-cocoa/60">
              Ajoute la date, le thème, et une photo d’inspiration dans ton message.
            </div>
          </div>
        </div>
      </Container>

      {/* MOBILE/TABLET: sticky bar + panneau preview */}
      <div className="lg:hidden">
        {mobilePreviewOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/30"
              aria-label="Fermer l'aperçu"
              onClick={() => setMobilePreviewOpen(false)}
            />
            <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-auto rounded-t-3xl bg-bg p-4">
              <div className="mx-auto max-w-md">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-extrabold">Aperçu</div>
                  <button
                    type="button"
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-cocoa hover:bg-cocoa/5"
                    onClick={() => setMobilePreviewOpen(false)}
                  >
                    Fermer
                  </button>
                </div>

                <CakePreview
                  sponge={sponge}
                  ganache={ganache}
                  insert={insert}
                  frosting={frosting}
                  ornament={ornament}
                  palette={palette}
                />
              </div>
            </div>
          </>
        ) : null}

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-cocoa/10 bg-white/45 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold">
                {formatEuro(estimate.low)} – {formatEuro(estimate.high)}
              </div>
              <div className="truncate text-xs text-cocoa/70">
                {size.label} • {sponge.label} • {ganache.label}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-2xl bg-cocoa px-4 py-2 text-xs font-semibold text-bg"
                style={{
                  boxShadow:
                    "0 20px 60px -25px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(214,183,122,0.55)",
                }}
                onClick={() => setMobilePreviewOpen(true)}
              >
                Aperçu
              </button>

              <a
                href={mailHref}
                className="rounded-2xl border border-cocoa/15 bg-white/40 px-4 py-2 text-xs font-semibold text-cocoa"
              >
                Devis
              </a>
            </div>
          </div>
        </div>

        {/* spacer */}
        <div className="h-20" />
      </div>
    </section>
  );
}
