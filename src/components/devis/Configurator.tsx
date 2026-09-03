"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import CakeCanvas from "./CakeCanvas";
import { OptionCards, PriceBreakdown, Stepper } from "./parts";
import {
  type CakeConfig,
  configFromParams,
  configToHref,
} from "@/lib/devis/config";
import {
  GANACHES,
  INSERTS,
  FROSTINGS,
  ORNAMENTS,
  PALETTES,
  SIZES,
  SPONGES,
} from "@/lib/devis/options";
import { computeQuote, formatEuro } from "@/lib/devis/pricing";
import { configRows, mailtoHref } from "@/lib/devis/recap";
import { downloadQuotePdf } from "@/lib/devis/pdf";
import { site } from "@/content/site";

const STEPS = ["Format", "Saveurs", "Style", "Finitions", "Récapitulatif"];

function ConfiguratorInner({ fullPage = false }: { fullPage?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();

  const [config, setConfig] = useState<CakeConfig>(() => configFromParams(params));
  // Arrivée via un lien pré-rempli (« réutiliser ce design ») → récap direct.
  const [step, setStep] = useState(() =>
    params.toString().length > 0 ? STEPS.length - 1 : 0,
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // La barre mobile ne s'affiche que si le configurateur est à l'écran
  // (utile quand il est embarqué dans la page d'accueil).
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(fullPage);
  useEffect(() => {
    if (fullPage) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (!e.isIntersecting) setPreviewOpen(false);
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [fullPage]);

  const quote = useMemo(() => computeQuote(config), [config]);
  const rows = useMemo(() => configRows(config), [config]);

  const shareUrl = useMemo(() => {
    const path = configToHref(config);
    if (typeof window !== "undefined") return window.location.origin + path;
    return path;
  }, [config]);

  const update = useCallback((key: keyof CakeConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Sur /devis, l'URL reflète la config (partage / reprise).
  useEffect(() => {
    if (fullPage) router.replace(configToHref(config), { scroll: false });
  }, [config, fullPage, router]);

  const goRecap = step === STEPS.length - 1;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponible */
    }
  }

  const preview = (
    <div className="card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-extrabold text-cocoa">Aperçu</span>
        <span className="text-xs text-cocoa-soft">Mis à jour en direct</span>
      </div>
      <CakeCanvas config={config} className="mx-auto mt-4 w-full max-w-[16rem]" />
      <div className="mt-4">
        <PriceBreakdown quote={quote} />
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* Colonne configuration */}
      <div className="card min-w-0 p-5 pb-24 md:p-7 lg:pb-7">
        <Stepper steps={STEPS} current={step} onJump={setStep} />

        <div className="mt-7 space-y-7">
          {step === 0 ? (
            <OptionCards
              legend="Nombre de parts"
              hint="Base de calcul de l'estimation"
              options={SIZES}
              value={config.size}
              onChange={(v) => update("size", v)}
            />
          ) : null}

          {step === 1 ? (
            <>
              <OptionCards
                legend="Génoise"
                options={SPONGES}
                value={config.sponge}
                onChange={(v) => update("sponge", v)}
                swatch
              />
              <OptionCards
                legend="Ganache"
                options={GANACHES}
                value={config.ganache}
                onChange={(v) => update("ganache", v)}
                swatch
              />
              <OptionCards
                legend="Insert"
                hint="Coulis, compotée ou caramel au cœur du gâteau"
                options={INSERTS}
                value={config.insert}
                onChange={(v) => update("insert", v)}
                swatch
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <OptionCards
                legend="Thème / palette"
                hint="Couleur d'accent et de couverture"
                options={PALETTES.map((p) => ({
                  id: p.id,
                  label: p.label,
                  color: p.accent,
                }))}
                value={config.palette}
                onChange={(v) => update("palette", v)}
                swatch
              />
              <OptionCards
                legend="Couverture / glaçage"
                options={FROSTINGS}
                value={config.frosting}
                onChange={(v) => update("frosting", v)}
              />
            </>
          ) : null}

          {step === 3 ? (
            <OptionCards
              legend="Ornement"
              options={ORNAMENTS}
              value={config.ornament}
              onChange={(v) => update("ornament", v)}
            />
          ) : null}

          {step === 4 ? (
            <div className="space-y-5">
              <dl className="grid gap-2 rounded-2xl bg-porcelain/50 p-4 text-sm ring-1 ring-gold/15">
                {rows.map((r) => (
                  <div key={r.label} className="flex justify-between gap-4">
                    <dt className="text-cocoa-soft">{r.label}</dt>
                    <dd className="text-right font-medium text-cocoa">{r.value}</dd>
                  </div>
                ))}
              </dl>

              <PriceBreakdown quote={quote} />

              <div className="grid gap-3 sm:grid-cols-2">
                <a href={mailtoHref(config, site.mailto, shareUrl)}>
                  <Button type="button" size="lg" className="w-full">
                    Envoyer ma demande
                  </Button>
                </a>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => downloadQuotePdf(config, { shareUrl })}
                >
                  Devis en PDF
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="ghost"
                  className="w-full"
                  onClick={copyLink}
                >
                  {copied ? "Lien copié ✓" : "Copier le lien de ce design"}
                </Button>
                {!fullPage ? (
                  <a href={configToHref(config)} className="w-full">
                    <Button type="button" size="lg" variant="ghost" className="w-full">
                      Ouvrir en plein écran
                    </Button>
                  </a>
                ) : null}
              </div>

              <p className="text-xs text-cocoa/55">
                Ajoutez la date, le lieu de livraison, le thème et une photo
                d&apos;inspiration dans votre message.
              </p>
            </div>
          ) : null}
        </div>

        {/* Navigation étapes */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Retour
          </Button>
          {!goRecap ? (
            <Button
              type="button"
              size="md"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            >
              {step === STEPS.length - 2 ? "Voir le récapitulatif" : "Continuer"}
            </Button>
          ) : (
            <span className="text-xs text-cocoa-soft">Étape finale</span>
          )}
        </div>
      </div>

      {/* Colonne aperçu (desktop) */}
      <div className="hidden lg:sticky lg:top-24 lg:block lg:h-fit">{preview}</div>

      {/* Barre + feuille d'aperçu (mobile / tablette) */}
      <div className="lg:hidden">
        {previewOpen && inView ? (
          <>
            <button
              type="button"
              aria-label="Fermer l'aperçu"
              className="fixed inset-0 z-40 bg-cocoa/30"
              onClick={() => setPreviewOpen(false)}
            />
            <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-auto rounded-t-3xl bg-bg p-4">
              <div className="mx-auto max-w-md">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-cocoa">Aperçu</span>
                  <button
                    type="button"
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-cocoa hover:bg-cocoa/5"
                    onClick={() => setPreviewOpen(false)}
                  >
                    Fermer
                  </button>
                </div>
                {preview}
              </div>
            </div>
          </>
        ) : null}

        <div
          className={`fixed inset-x-0 bottom-0 z-30 border-t border-gold/20 bg-porcelain/85 backdrop-blur transition-transform duration-300 ${
            inView ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-cocoa">
                {formatEuro(quote.low)} – {formatEuro(quote.high)}
              </div>
              <div className="truncate text-xs text-cocoa-soft">
                {rows[0].value} • {rows[1].value}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="rounded-2xl bg-cocoa px-4 py-2 text-xs font-semibold text-bg"
              >
                Aperçu
              </button>
              {!goRecap ? (
                <button
                  type="button"
                  onClick={() =>
                    setStep((s) => Math.min(STEPS.length - 1, s + 1))
                  }
                  className="rounded-2xl border border-cocoa/15 bg-porcelain/60 px-4 py-2 text-xs font-semibold text-cocoa"
                >
                  Suivant
                </button>
              ) : (
                <a
                  href={mailtoHref(config, site.mailto, shareUrl)}
                  className="rounded-2xl border border-cocoa/15 bg-porcelain/60 px-4 py-2 text-xs font-semibold text-cocoa"
                >
                  Demande
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="h-20" />
      </div>
    </div>
  );
}

export default function Configurator(props: { fullPage?: boolean }) {
  return (
    <Suspense
      fallback={
        <div className="card p-6 text-sm text-cocoa-soft">
          Chargement du configurateur…
        </div>
      }
    >
      <ConfiguratorInner {...props} />
    </Suspense>
  );
}
