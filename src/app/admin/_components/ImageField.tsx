"use client";

import { useState } from "react";
import { uploadMedia } from "../actions";

export default function ImageField({
  name = "image_url",
  initialUrl = "",
  label = "Image",
}: {
  name?: string;
  initialUrl?: string;
  label?: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);

    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadMedia(fd);
    setBusy(false);

    if ("error" in res) {
      setError(res.error);
      return;
    }
    setUrl(res.url);
  }

  return (
    <div className="space-y-3">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa-soft">
        {label}
      </span>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-cream ring-1 ring-cocoa/10">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center text-xs text-cocoa/40">
              aucune
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={onPick}
            className="block max-w-full text-sm text-cocoa-soft file:mr-3 file:rounded-xl file:border-0 file:bg-cocoa file:px-4 file:py-2 file:text-xs file:font-semibold file:text-bg hover:file:bg-cocoa/90"
          />
          {busy ? <p className="text-xs text-cocoa-soft">Envoi en cours…</p> : null}
          {error ? <p className="text-xs text-berry">{error}</p> : null}
          {url ? (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="text-xs font-semibold text-cocoa-soft underline underline-offset-2 hover:text-cocoa"
            >
              Retirer l&apos;image
            </button>
          ) : null}
        </div>
      </div>

      <input type="hidden" name={name} value={url} />
    </div>
  );
}
