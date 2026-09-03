/**
 * Catalogue des options du configurateur. Source unique, importée par
 * l'UI, le calcul de prix, l'aperçu SVG et le PDF.
 */

export type Choice = {
  id: string;
  label: string;
  note?: string;
  /** supplément fixe en € */
  priceAdd?: number;
  /** couleur pour l'aperçu SVG */
  color?: string;
};

export type SizeChoice = Choice & { basePrice: number; servings: string };

export type Palette = {
  id: string;
  label: string;
  /** couleur d'accent (ruban, coulure, touches) */
  accent: string;
  /** couleur de couverture (buttercream) */
  icing: string;
};

export const SIZES: SizeChoice[] = [
  { id: "6-8", label: "6 – 8 parts", servings: "6 à 8 personnes", basePrice: 55, note: "Anniversaire intime" },
  { id: "10-12", label: "10 – 12 parts", servings: "10 à 12 personnes", basePrice: 85, note: "Le plus demandé" },
  { id: "14-16", label: "14 – 16 parts", servings: "14 à 16 personnes", basePrice: 120, note: "Grande tablée" },
  { id: "20-25", label: "20 – 25 parts", servings: "20 à 25 personnes", basePrice: 170, note: "Événement" },
];

export const SPONGES: Choice[] = [
  { id: "vanille", label: "Génoise vanille", note: "Douce & légère", color: "#ecd3a0" },
  { id: "chocolat", label: "Génoise chocolat", note: "Cacao intense", color: "#8a5a3a" },
  { id: "citron", label: "Génoise citron", note: "Fraîche & acidulée", color: "#f0dd9a" },
  { id: "amande", label: "Génoise amande", note: "Fine & parfumée", color: "#e6d7bd" },
];

export const GANACHES: Choice[] = [
  { id: "choco-noir", label: "Ganache chocolat noir", note: "Riche & intense", color: "#3b2416" },
  { id: "choco-lait", label: "Ganache chocolat au lait", note: "Ronde & gourmande", color: "#6b3e1e" },
  { id: "vanille", label: "Ganache vanille", note: "Onctueuse", color: "#f2d7a7" },
  { id: "pistache", label: "Ganache pistache", note: "Premium", color: "#88a77e", priceAdd: 8 },
  { id: "caramel", label: "Ganache caramel", note: "Beurre salé", color: "#b8742a", priceAdd: 6 },
];

export const INSERTS: Choice[] = [
  { id: "aucun", label: "Sans insert", note: "Épuré", color: "transparent" },
  { id: "framboise", label: "Insert framboise", note: "Coulis / compotée", color: "#a83c54" },
  { id: "passion", label: "Insert passion", note: "Fruité & exotique", color: "#f2a400" },
  { id: "fraise", label: "Insert fraise", note: "Classique", color: "#e23b4a" },
  { id: "caramel", label: "Insert caramel", note: "Beurre salé", color: "#b8742a", priceAdd: 6 },
];

export const FROSTINGS: Choice[] = [
  { id: "nude", label: "Nude cake", note: "Strates apparentes, style minimal", priceAdd: 0 },
  { id: "buttercream", label: "Buttercream lisse", note: "Couverture nette & élégante", priceAdd: 12 },
  { id: "drip", label: "Drip cake", note: "Coulure sur les bords, effet événementiel", priceAdd: 18 },
];

export const ORNAMENTS: Choice[] = [
  { id: "aucun", label: "Sans ornement", note: "Minimal", priceAdd: 0 },
  { id: "ruban", label: "Ruban satin", note: "Couleur du thème", priceAdd: 8 },
  { id: "dore", label: "Feuille d'or", note: "Touches métalliques", priceAdd: 14 },
  { id: "fleurs", label: "Fleurs en sucre", note: "Façonnées main", priceAdd: 16 },
  { id: "fleurs-fraiches", label: "Fleurs fraîches", note: "Composition saisonnière", priceAdd: 28 },
];

export const PALETTES: Palette[] = [
  { id: "champagne", label: "Champagne", accent: "#c8a56a", icing: "#f3e7d6" },
  { id: "rose", label: "Rose poudré", accent: "#c77a8a", icing: "#f6e4e9" },
  { id: "emeraude", label: "Émeraude", accent: "#2f6f59", icing: "#e7efea" },
  { id: "nuit", label: "Bleu nuit", accent: "#2a2d3a", icing: "#e9eaee" },
  { id: "chocolat", label: "Chocolat", accent: "#5b3c24", icing: "#e8d9c6" },
];

export function findChoice(list: Choice[], id: string): Choice {
  return list.find((c) => c.id === id) ?? list[0];
}
export function findSize(id: string): SizeChoice {
  return SIZES.find((s) => s.id === id) ?? SIZES[1];
}
export function findPalette(id: string): Palette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}
