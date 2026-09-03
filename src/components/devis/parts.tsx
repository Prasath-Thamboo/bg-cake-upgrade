"use client";

import type { Choice } from "@/lib/devis/options";
import { formatEuro, type Quote } from "@/lib/devis/pricing";

/* ── Groupe d'options sélectionnables (cartes radio) ───────────────────── */
export function OptionCards({
  legend,
  hint,
  options,
  value,
  onChange,
  swatch = false,
}: {
  legend: string;
  hint?: string;
  options: Choice[];
  value: string;
  onChange: (id: string) => void;
  swatch?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-cocoa-soft">
        {legend}
      </legend>
      {hint ? <p className="mt-1 text-xs text-cocoa/55">{hint}</p> : null}

      <div
        role="radiogroup"
        aria-label={legend}
        className="mt-3 grid gap-2.5 sm:grid-cols-2"
      >
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition ${
                active
                  ? "border-gold bg-porcelain/80 ring-1 ring-gold/40"
                  : "border-cocoa/12 bg-porcelain/40 hover:border-gold/30 hover:bg-porcelain/60"
              }`}
            >
              {swatch ? (
                <span
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 rounded-full ring-1 ring-cocoa/15"
                  style={{
                    background:
                      o.color && o.color !== "transparent" ? o.color : "#efe5d4",
                  }}
                />
              ) : (
                <span
                  aria-hidden
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                    active ? "border-gold bg-gold" : "border-cocoa/25"
                  }`}
                >
                  {active ? (
                    <span className="h-2 w-2 rounded-full bg-bg" />
                  ) : null}
                </span>
              )}

              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-semibold text-cocoa">{o.label}</span>
                  {o.priceAdd ? (
                    <span className="text-xs font-semibold text-gold">
                      +{o.priceAdd} €
                    </span>
                  ) : null}
                </span>
                {o.note ? (
                  <span className="mt-0.5 block text-xs text-cocoa-soft">{o.note}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ── Fil d'étapes ─────────────────────────────────────────────────────── */
export function Stepper({
  steps,
  current,
  onJump,
}: {
  steps: string[];
  current: number;
  onJump: (i: number) => void;
}) {
  return (
    <ol className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => onJump(i)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? "bg-cocoa text-bg"
                  : done
                    ? "bg-porcelain/70 text-cocoa hover:bg-porcelain"
                    : "text-cocoa-soft hover:bg-cocoa/5"
              }`}
            >
              <span
                className={`grid h-4 w-4 place-items-center rounded-full text-[0.6rem] ${
                  active ? "bg-bg/20" : done ? "bg-gold/25 text-cocoa" : "bg-cocoa/10"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              {label}
            </button>
            {i < steps.length - 1 ? (
              <span className="h-px w-4 bg-cocoa/15" aria-hidden />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/* ── Détail du prix ───────────────────────────────────────────────────── */
export function PriceBreakdown({ quote }: { quote: Quote }) {
  return (
    <div className="rounded-2xl bg-porcelain/50 p-4 ring-1 ring-gold/15">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-cocoa-soft">
        Détail de l&apos;estimation
      </div>

      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-cocoa-soft">{quote.baseLabel}</dt>
          <dd className="font-medium text-cocoa">{formatEuro(quote.base)}</dd>
        </div>
        {quote.lines.map((l) => (
          <div key={l.label} className="flex justify-between gap-4">
            <dt className="text-cocoa-soft">{l.label}</dt>
            <dd className="font-medium text-cocoa">+ {formatEuro(l.amount)}</dd>
          </div>
        ))}
        {quote.complexity > 0 ? (
          <div className="flex justify-between gap-4">
            <dt className="text-cocoa-soft">
              Complexité ({Math.round(quote.complexityPct * 100)} %)
            </dt>
            <dd className="font-medium text-cocoa">≈ + {formatEuro(quote.complexity)}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-3 flex items-end justify-between border-t border-cocoa/10 pt-3">
        <span className="text-xs text-cocoa-soft">Prix estimé</span>
        <span className="font-display text-xl font-semibold text-cocoa">
          {formatEuro(quote.low)} – {formatEuro(quote.high)}
        </span>
      </div>
      <p className="mt-2 text-[0.7rem] leading-relaxed text-cocoa/55">
        Non contractuel. Le devis final dépend de la date, du design exact et de la
        complexité.
      </p>
    </div>
  );
}
