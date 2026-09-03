import type { CakeConfig } from "./config";
import { configRows } from "./recap";
import { computeQuote, formatEuro } from "./pricing";

/** Devis PDF gabarité, généré côté client (jsPDF chargé à la demande). */
export async function downloadQuotePdf(
  config: CakeConfig,
  opts?: { shareUrl?: string; ref?: string },
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const quote = computeQuote(config);

  const W = doc.internal.pageSize.getWidth();
  const L = 56;
  const R = W - 56;
  const cocoa: [number, number, number] = [58, 42, 30];
  const gold: [number, number, number] = [160, 125, 67];
  const muted: [number, number, number] = [120, 108, 96];

  const ref =
    opts?.ref ??
    `BG-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}`;
  const dateStr = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // ── En-tête ───────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...cocoa);
  doc.text("BG-Cake", L, 70);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...muted);
  doc.text("Gâteaux artisanaux premium", L, 86);

  doc.setFontSize(10);
  doc.setTextColor(...cocoa);
  doc.text("Devis sur-mesure", R, 66, { align: "right" });
  doc.setTextColor(...muted);
  doc.setFontSize(9);
  doc.text(`Réf. ${ref}`, R, 80, { align: "right" });
  doc.text(dateStr, R, 92, { align: "right" });

  doc.setDrawColor(...gold);
  doc.setLineWidth(1);
  doc.line(L, 104, R, 104);

  // ── Composition ───────────────────────────────────────────
  let y = 138;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...cocoa);
  doc.text("Composition", L, y);
  y += 18;

  doc.setFontSize(10);
  configRows(config).forEach((row) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text(row.label, L, y);
    doc.setTextColor(...cocoa);
    doc.text(row.value, L + 150, y);
    y += 18;
  });

  // ── Estimation ────────────────────────────────────────────
  y += 12;
  doc.setDrawColor(230, 216, 196);
  doc.line(L, y, R, y);
  y += 24;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...cocoa);
  doc.text("Estimation", L, y);
  y += 18;

  doc.setFontSize(10);
  const line = (label: string, value: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(...(bold ? cocoa : muted));
    doc.text(label, L, y);
    doc.setTextColor(...cocoa);
    doc.text(value, R, y, { align: "right" });
    y += 16;
  };
  line(quote.baseLabel, formatEuro(quote.base));
  quote.lines.forEach((l) => line(l.label, `+ ${formatEuro(l.amount)}`));
  if (quote.complexity > 0) {
    line(
      `Complexité de réalisation (${Math.round(quote.complexityPct * 100)}%)`,
      `≈ + ${formatEuro(quote.complexity)}`,
    );
  }
  y += 4;
  doc.setDrawColor(230, 216, 196);
  doc.line(L, y, R, y);
  y += 18;
  doc.setFontSize(13);
  line("Prix estimé", `${formatEuro(quote.low)} – ${formatEuro(quote.high)}`, true);

  // ── Pied de page ──────────────────────────────────────────
  y += 24;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);
  doc.text(
    "Estimation non contractuelle. Le devis définitif dépend de la date, du design exact, des finitions et de la disponibilité des produits.",
    L,
    y,
    { maxWidth: R - L },
  );
  if (opts?.shareUrl) {
    y += 22;
    doc.setTextColor(...gold);
    doc.text(`Configuration : ${opts.shareUrl}`, L, y, { maxWidth: R - L });
  }

  doc.save(`devis-bg-cake-${ref}.pdf`);
}
