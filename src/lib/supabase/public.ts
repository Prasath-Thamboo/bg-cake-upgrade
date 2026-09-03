import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Client Supabase anonyme, sans cookies ni session.
 * Pour les lectures publiques (galerie, avis) : n'introduit pas d'API
 * dynamique, la page d'accueil peut rester statique + revalidatePath.
 */
export function createSupabasePublicClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
