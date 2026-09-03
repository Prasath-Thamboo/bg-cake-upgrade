import type { CakeConfig } from "./config";
import {
  findChoice,
  findSize,
  GANACHES,
  INSERTS,
  FROSTINGS,
  ORNAMENTS,
} from "./options";

export type QuoteLine = { label: string; amount: number };

export type Quote = {
  /** prix de base lié au nombre de parts */
  base: number;
  baseLabel: string;
  /** suppléments d'options (non nuls uniquement) */
  lines: QuoteLine[];
  /** base + suppléments */
  subtotal: number;
  /** part liée à la complexité de réalisation, en € */
  complexity: number;
  complexityPct: number;
  /** fourchette indicative arrondie */
  low: number;
  high: number;
};

const COMPLEXITY_FROSTING: Record<string, number> = {
  nude: 0.02,
  buttercream: 0.05,
  drip: 0.08,
};
const COMPLEXITY_ORNAMENT: Record<string, number> = {
  aucun: 0,
  ruban: 0.03,
  dore: 0.06,
  fleurs: 0.05,
  "fleurs-fraiches": 0.09,
};

const round = (n: number) => Math.round(n);

/**
 * Calcul isomorphe (aucune dépendance client/serveur). Le serveur peut le
 * ré-exécuter pour un prix qui fait foi ; le client l'utilise en direct.
 */
export function computeQuote(config: CakeConfig): Quote {
  const size = findSize(config.size);
  const ganache = findChoice(GANACHES, config.ganache);
  const insert = findChoice(INSERTS, config.insert);
  const frosting = findChoice(FROSTINGS, config.frosting);
  const ornament = findChoice(ORNAMENTS, config.ornament);

  const base = size.basePrice;
  const lines: QuoteLine[] = [];
  const push = (label: string, amount?: number) => {
    if (amount) lines.push({ label, amount });
  };
  push(ganache.label, ganache.priceAdd);
  push(insert.label, insert.priceAdd);
  push(frosting.label, frosting.priceAdd);
  push(ornament.label, ornament.priceAdd);

  const subtotal = base + lines.reduce((s, l) => s + l.amount, 0);

  const complexityPct =
    (COMPLEXITY_FROSTING[frosting.id] ?? 0.03) +
    (COMPLEXITY_ORNAMENT[ornament.id] ?? 0);
  const complexity = round(subtotal * complexityPct);

  const low = round(subtotal * 0.94);
  const high = round(subtotal * (1.08 + complexityPct));

  return {
    base,
    baseLabel: `Base ${size.label}`,
    lines,
    subtotal,
    complexity,
    complexityPct,
    low,
    high,
  };
}

export function formatEuro(n: number): string {
  return `${round(n)} €`;
}
