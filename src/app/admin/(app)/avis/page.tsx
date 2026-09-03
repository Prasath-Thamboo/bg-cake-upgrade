import Link from "next/link";
import Button from "@/components/ui/Button";
import { getAllReviews } from "@/lib/content/reviews";
import { deleteReview } from "../../actions";
import DeleteButton from "../../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-cocoa">Avis</h1>
          <p className="mt-2 text-sm text-cocoa-soft">
            {reviews.length} avis — saisie manuelle.
          </p>
        </div>
        <Link href="/admin/avis/new">
          <Button type="button" size="md">
            Nouvel avis
          </Button>
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="card mt-8 p-8 text-center text-sm text-cocoa-soft">
          Aucun avis pour l&apos;instant.
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="card flex flex-wrap items-center gap-x-4 gap-y-3 p-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream ring-1 ring-cocoa/10">
                {r.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1 basis-40">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-cocoa">{r.author}</span>
                  <span className="text-xs text-gold">★ {r.rating.toFixed(1)}</span>
                  {!r.published ? (
                    <span className="rounded-full bg-cocoa/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-cocoa-soft">
                      masqué
                    </span>
                  ) : null}
                </div>
                <p className="truncate text-xs text-cocoa/55">{r.text}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/avis/${r.id}`}
                  className="rounded-xl border border-cocoa/15 px-3 py-1.5 text-xs font-semibold text-cocoa hover:bg-cocoa/5"
                >
                  Modifier
                </Link>
                <DeleteButton id={r.id} action={deleteReview} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
