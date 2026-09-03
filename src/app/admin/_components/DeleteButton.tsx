"use client";

type Action = (formData: FormData) => void | Promise<void>;

export default function DeleteButton({
  id,
  action,
  label = "Supprimer",
  confirmText = "Supprimer définitivement ?",
}: {
  id: string;
  action: Action;
  label?: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-xl border border-berry/30 px-3 py-1.5 text-xs font-semibold text-berry hover:bg-berry/10"
      >
        {label}
      </button>
    </form>
  );
}
