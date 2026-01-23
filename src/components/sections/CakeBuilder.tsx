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
  // Utilisé pour le visuel (couleur de couche)
  color: string;
};

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
  { id: "pistache", label: "Ganache pistache", note: "Premium", color: "#88A77E" },
];

const insertOptions: Option[] = [
  { id: "framboise", label: "Insert framboise", note: "Coulis / compotée", color: "#B0123A" },
  { id: "passion", label: "Insert passion", note: "Fruité & exotique", color: "#F2A400" },
  { id: "fraise", label: "Insert fraise", note: "Classique", color: "#E23B4A" },
  { id: "caramel", label: "Insert caramel", note: "Beurre salé", color: "#B8742A" },
];

const sizeOptions = [
  { id: "6-8", label: "6–8 parts" },
  { id: "10-12", label: "10–12 parts" },
  { id: "14-16", label: "14–16 parts" },
];

function OptionGrid({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (id: string) => void;
  options: Option[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={[
              "text-left rounded-2xl p-4 ring-1 backdrop-blur transition",
              active
                ? "bg-white/60 ring-cocoa/20"
                : "bg-white/35 ring-cocoa/10 hover:bg-white/50",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">{o.label}</div>
                {o.note ? (
                  <div className="mt-1 text-xs text-cocoa/70">{o.note}</div>
                ) : null}
              </div>
              <span
                className="mt-1 h-6 w-6 rounded-full ring-1 ring-cocoa/10"
                style={{ backgroundColor: o.color }}
                aria-hidden="true"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

function CakePreview({
  sponge,
  ganache,
  insert,
}: {
  sponge: Option;
  ganache: Option;
  insert: Option;
}) {
  // “layer cake” simple, premium, lisible
  return (
    <div className="card-strong p-6">
      <div className="text-sm font-extrabold">Aperçu</div>
      <div className="mt-1 text-xs text-cocoa/70">
        Visuel indicatif (couleurs/superpositions simplifiées)
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-sm">
          {/* Cake body */}
          <div className="relative overflow-hidden rounded-[2.25rem] ring-1 ring-cocoa/10 bg-white/30">
            {/* top glaze */}
            <div
              className="h-10 w-full"
              style={{ backgroundColor: ganache.color }}
            />

            {/* layers */}
            <div className="px-8 py-10">
              <div className="space-y-3">
                <div
                  className="h-10 rounded-2xl ring-1 ring-black/5"
                  style={{ backgroundColor: sponge.color }}
                />
                <div
                  className="h-7 rounded-2xl ring-1 ring-black/5"
                  style={{ backgroundColor: ganache.color, opacity: 0.9 }}
                />
                <div
                  className="h-5 rounded-2xl ring-1 ring-black/5"
                  style={{ backgroundColor: insert.color }}
                />
                <div
                  className="h-7 rounded-2xl ring-1 ring-black/5"
                  style={{ backgroundColor: ganache.color, opacity: 0.9 }}
                />
                <div
                  className="h-10 rounded-2xl ring-1 ring-black/5"
                  style={{ backgroundColor: sponge.color }}
                />
              </div>
            </div>

            {/* subtle shine */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_200px_at_30%_10%,rgba(255,255,255,0.55),transparent)]" />
          </div>

          {/* legend */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CakeBuilder() {
  const [spongeId, setSpongeId] = useState(spongeOptions[0].id);
  const [ganacheId, setGanacheId] = useState(ganacheOptions[0].id);
  const [insertId, setInsertId] = useState(insertOptions[0].id);
  const [sizeId, setSizeId] = useState(sizeOptions[0].id);

  const sponge = useMemo(
    () => spongeOptions.find((o) => o.id === spongeId) ?? spongeOptions[0],
    [spongeId]
  );
  const ganache = useMemo(
    () => ganacheOptions.find((o) => o.id === ganacheId) ?? ganacheOptions[0],
    [ganacheId]
  );
  const insert = useMemo(
    () => insertOptions.find((o) => o.id === insertId) ?? insertOptions[0],
    [insertId]
  );

  const summary = useMemo(() => {
    const sizeLabel = sizeOptions.find((s) => s.id === sizeId)?.label ?? sizeId;
    return `Bonjour BG-Cake,%0D%0A%0D%0AJe souhaite un devis pour un gâteau.%0D%0A- Parts : ${encodeURIComponent(
      sizeLabel
    )}%0D%0A- Génoise : ${encodeURIComponent(
      sponge.label
    )}%0D%0A- Ganache : ${encodeURIComponent(
      ganache.label
    )}%0D%0A- Insert : ${encodeURIComponent(
      insert.label
    )}%0D%0A%0D%0AMerci !`;
  }, [sizeId, sponge.label, ganache.label, insert.label]);

  const mailHref = `${site.mailto}?subject=${encodeURIComponent(
    "Devis gâteau sur-mesure"
  )}&body=${summary}`;

  return (
    <section id="composer" className="py-16">
      <Container>
        <SectionHeader
          badge="Sur-mesure"
          title="Composez votre gâteau"
          desc="Choisissez la génoise, la ganache et l’insert (coulis / caramel / chocolat). Obtenez un aperçu et envoyez votre demande de devis."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Left: choices */}
          <div className="card p-6 md:p-8">
            <div className="text-sm font-extrabold">Sélection</div>
            <div className="mt-1 text-xs text-cocoa/70">
              Modifiez les choix et visualisez le rendu.
            </div>

            {/* size */}
            <div className="mt-6">
              <div className="text-xs font-semibold text-cocoa/70">Nombre de parts</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizeOptions.map((s) => {
                  const active = s.id === sizeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSizeId(s.id)}
                      className={[
                        "rounded-full px-4 py-2 text-xs font-semibold ring-1 transition",
                        active
                          ? "bg-cocoa text-bg ring-cocoa/20"
                          : "bg-white/40 text-cocoa ring-cocoa/10 hover:bg-white/55",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* sponge */}
            <div className="mt-8">
              <div className="text-xs font-semibold text-cocoa/70">Génoise</div>
              <div className="mt-3">
                <OptionGrid value={spongeId} onChange={setSpongeId} options={spongeOptions} />
              </div>
            </div>

            {/* ganache */}
            <div className="mt-8">
              <div className="text-xs font-semibold text-cocoa/70">Ganache</div>
              <div className="mt-3">
                <OptionGrid value={ganacheId} onChange={setGanacheId} options={ganacheOptions} />
              </div>
            </div>

            {/* insert */}
            <div className="mt-8">
              <div className="text-xs font-semibold text-cocoa/70">Insert (coulis / caramel)</div>
              <div className="mt-3">
                <OptionGrid value={insertId} onChange={setInsertId} options={insertOptions} />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={mailHref} className="sm:flex-1">
                <Button type="button" className="w-full" size="lg">
                  Envoyer ma demande
                </Button>
              </a>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="sm:flex-1">
                <Button type="button" className="w-full" size="lg" variant="outline">
                  Voir Instagram
                </Button>
              </a>
            </div>

            <div className="mt-4 text-xs text-cocoa/60">
              Astuce : ajoute dans ton mail la date, le thème, et une photo d’inspiration.
            </div>
          </div>

          {/* Right: preview */}
          <CakePreview sponge={sponge} ganache={ganache} insert={insert} />
        </div>
      </Container>
    </section>
  );
}
