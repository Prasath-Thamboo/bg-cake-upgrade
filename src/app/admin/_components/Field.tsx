import { type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

const base =
  "mt-2 w-full rounded-2xl bg-porcelain/60 px-4 py-3 text-sm text-cocoa ring-1 ring-cocoa/10 outline-none focus:ring-2 focus:ring-gold/40";

export function TextField({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa-soft">
        {label}
      </span>
      <input {...props} className={base} />
      {hint ? <span className="mt-1 block text-xs text-cocoa/50">{hint}</span> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa-soft">
        {label}
      </span>
      <textarea {...props} className={`${base} min-h-[7rem] resize-y`} />
      {hint ? <span className="mt-1 block text-xs text-cocoa/50">{hint}</span> : null}
    </label>
  );
}

export function CheckboxField({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-cocoa">
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-cocoa/30 text-cocoa focus:ring-gold/40"
      />
      {label}
    </label>
  );
}
