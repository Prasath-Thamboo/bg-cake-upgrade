import type { CakeConfig } from "./config";
import {
  findChoice,
  findPalette,
  findSize,
  GANACHES,
  INSERTS,
  FROSTINGS,
  ORNAMENTS,
  SPONGES,
} from "./options";
import { computeQuote, formatEuro } from "./pricing";

export type RecapRow = { label: string; value: string };

export function configRows(config: CakeConfig): RecapRow[] {
  return [
    { label: "Nombre de parts", value: findSize(config.size).label },
    { label: "Génoise", value: findChoice(SPONGES, config.sponge).label },
    { label: "Ganache", value: findChoice(GANACHES, config.ganache).label },
    { label: "Insert", value: findChoice(INSERTS, config.insert).label },
    { label: "Couverture", value: findChoice(FROSTINGS, config.frosting).label },
    { label: "Ornement", value: findChoice(ORNAMENTS, config.ornament).label },
    { label: "Palette", value: findPalette(config.palette).label },
  ];
}

/** Texte brut pour le corps du mail. */
export function recapText(config: CakeConfig): string {
  const quote = computeQuote(config);
  const rows = configRows(config)
    .map((r) => `- ${r.label} : ${r.value}`)
    .join("\n");
  return `Récapitulatif (indicatif)
${rows}
- Prix estimé : ${formatEuro(quote.low)} – ${formatEuro(quote.high)}`;
}

export function mailtoHref(config: CakeConfig, to: string, shareUrl?: string): string {
  const body = `Bonjour BG-Cake,

Je souhaite un devis pour un gâteau sur-mesure.

${recapText(config)}

Date de l'événement :
Ville / livraison :
Thème / inspiration :
${shareUrl ? `\nLien de ma configuration : ${shareUrl}` : ""}

Merci !`;
  const base = to.startsWith("mailto:") ? to : `mailto:${to}`;
  return `${base}?subject=${encodeURIComponent("Devis gâteau sur-mesure")}&body=${encodeURIComponent(body)}`;
}
