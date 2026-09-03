"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="rounded-xl border border-cocoa/15 bg-porcelain/50 px-3 py-1.5 text-xs font-semibold text-cocoa hover:bg-porcelain/80"
    >
      Déconnexion
    </button>
  );
}
