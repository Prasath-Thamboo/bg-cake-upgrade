import {
  GANACHES,
  INSERTS,
  FROSTINGS,
  ORNAMENTS,
  PALETTES,
  SIZES,
  SPONGES,
} from "./options";

/** Description sérialisable d'un gâteau. Alimente aperçu, prix, PDF, lien. */
export type CakeConfig = {
  size: string;
  sponge: string;
  ganache: string;
  insert: string;
  frosting: string;
  ornament: string;
  palette: string;
};

export const DEFAULT_CONFIG: CakeConfig = {
  size: "10-12",
  sponge: "vanille",
  ganache: "choco-noir",
  insert: "framboise",
  frosting: "buttercream",
  ornament: "ruban",
  palette: "champagne",
};

const FIELDS: Record<keyof CakeConfig, readonly { id: string }[]> = {
  size: SIZES,
  sponge: SPONGES,
  ganache: GANACHES,
  insert: INSERTS,
  frosting: FROSTINGS,
  ornament: ORNAMENTS,
  palette: PALETTES,
};

function isValid(field: keyof CakeConfig, id: string) {
  return FIELDS[field].some((o) => o.id === id);
}

/** Config → paramètres d'URL courts et lisibles. */
export function configToParams(config: CakeConfig): URLSearchParams {
  const p = new URLSearchParams();
  (Object.keys(config) as (keyof CakeConfig)[]).forEach((k) => {
    if (config[k] !== DEFAULT_CONFIG[k]) p.set(k, config[k]);
  });
  return p;
}

/** Paramètres d'URL → config (valeurs inconnues remplacées par le défaut). */
export function configFromParams(
  params: URLSearchParams | { get(name: string): string | null },
): CakeConfig {
  const out = { ...DEFAULT_CONFIG };
  (Object.keys(DEFAULT_CONFIG) as (keyof CakeConfig)[]).forEach((k) => {
    const v = params.get(k);
    if (v && isValid(k, v)) out[k] = v;
  });
  return out;
}

/** Lien partageable vers le configurateur pré-rempli. */
export function configToHref(config: CakeConfig, base = "/devis"): string {
  const qs = configToParams(config).toString();
  return qs ? `${base}?${qs}` : base;
}
