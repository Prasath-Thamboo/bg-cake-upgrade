import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

/**
 * Client "service_role" — contourne les RLS. À n'utiliser QUE côté serveur,
 * dans des actions déjà protégées par l'authentification admin.
 */
export function createSupabaseAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !serviceKey) {
    throw new Error(
      "Supabase admin non configuré : renseigne NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
