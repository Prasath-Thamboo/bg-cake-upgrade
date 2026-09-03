import Link from "next/link";
import Button from "@/components/ui/Button";
import { getAllGalleryItems } from "@/lib/content/gallery";
import { deleteCreation } from "../../actions";
import DeleteButton from "../../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminCreationsPage() {
  const items = await getAllGalleryItems();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-cocoa">Créations</h1>
          <p className="mt-2 text-sm text-cocoa-soft">
            {items.length} création{items.length > 1 ? "s" : ""} — glisse l&apos;ordre
            via le champ « ordre d&apos;affichage ».
          </p>
        </div>
        <Link href="/admin/creations/new">
          <Button type="button" size="md">
            Nouvelle création
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="card mt-8 p-8 text-center text-sm text-cocoa-soft">
          Aucune création pour l&apos;instant.
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="card flex flex-wrap items-center gap-x-4 gap-y-3 p-4"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream ring-1 ring-cocoa/10">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1 basis-40">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold text-cocoa">{item.title}</span>
                  {!item.published ? (
                    <span className="shrink-0 rounded-full bg-cocoa/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-cocoa-soft">
                      masqué
                    </span>
                  ) : null}
                </div>
                <div className="truncate text-xs text-cocoa/55">
                  #{item.sortOrder} · {item.tag || "—"}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/creations/${item.id}`}
                  className="rounded-xl border border-cocoa/15 px-3 py-1.5 text-xs font-semibold text-cocoa hover:bg-cocoa/5"
                >
                  Modifier
                </Link>
                <DeleteButton id={item.id} action={deleteCreation} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
