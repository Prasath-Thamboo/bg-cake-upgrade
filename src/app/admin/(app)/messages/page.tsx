import { getContactMessages } from "@/lib/content/messages";
import { setMessageHandled } from "../../actions";

export const dynamic = "force-dynamic";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();
  const pending = messages.filter((m) => !m.handled).length;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-cocoa">Messages</h1>
      <p className="mt-2 text-sm text-cocoa-soft">
        {messages.length} demande{messages.length > 1 ? "s" : ""}
        {pending > 0 ? ` · ${pending} à traiter` : ""}
      </p>

      {messages.length === 0 ? (
        <div className="card mt-8 p-8 text-center text-sm text-cocoa-soft">
          Aucun message pour l&apos;instant.
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`card p-5 ${m.handled ? "opacity-60" : ""}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-semibold text-cocoa">{m.name}</span>
                <span className="text-xs text-cocoa/55">{fmtDate(m.createdAt)}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cocoa-soft">
                <a
                  href={`mailto:${m.email}`}
                  className="font-semibold text-gold underline underline-offset-2"
                >
                  {m.email}
                </a>
                {m.phone ? <span>{m.phone}</span> : null}
                {m.eventDate ? <span>Date : {m.eventDate}</span> : null}
                {m.servings ? <span>Parts : {m.servings}</span> : null}
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-cocoa/90">
                {m.message}
              </p>

              <form action={setMessageHandled} className="mt-4">
                <input type="hidden" name="id" value={m.id} />
                <input
                  type="hidden"
                  name="handled"
                  value={m.handled ? "false" : "true"}
                />
                <button
                  type="submit"
                  className="rounded-xl border border-cocoa/15 px-3 py-1.5 text-xs font-semibold text-cocoa hover:bg-cocoa/5"
                >
                  {m.handled ? "Rouvrir" : "Marquer traité"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
