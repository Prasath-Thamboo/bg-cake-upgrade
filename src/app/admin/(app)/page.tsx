import Link from "next/link";
import { getAllGalleryItems } from "@/lib/content/gallery";
import { getAllReviews } from "@/lib/content/reviews";
import { getContactMessages } from "@/lib/content/messages";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [creations, reviews, messages] = await Promise.all([
    getAllGalleryItems(),
    getAllReviews(),
    getContactMessages(),
  ]);

  const cards = [
    {
      href: "/admin/creations",
      label: "Créations",
      total: creations.length,
      visible: creations.filter((c) => c.published).length,
      hint: (n: number) => `${n} visible${n > 1 ? "s" : ""} sur le site`,
    },
    {
      href: "/admin/avis",
      label: "Avis",
      total: reviews.length,
      visible: reviews.filter((r) => r.published).length,
      hint: (n: number) => `${n} visible${n > 1 ? "s" : ""} sur le site`,
    },
    {
      href: "/admin/messages",
      label: "Messages",
      total: messages.length,
      visible: messages.filter((m) => !m.handled).length,
      hint: (n: number) => `${n} à traiter`,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-cocoa">Tableau de bord</h1>
      <p className="mt-2 text-sm text-cocoa-soft">
        Gère les créations de la galerie, les avis et les demandes de contact.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card block p-6 transition hover:-translate-y-0.5">
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-cocoa-soft">
              {c.label}
            </div>
            <div className="mt-3 font-display text-4xl font-semibold text-cocoa">
              {c.total}
            </div>
            <div className="mt-1 text-xs text-cocoa/55">{c.hint(c.visible)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
