/**
 * Config Supabase partagée. Tant que les variables d'environnement ne sont
 * pas renseignées, `isSupabaseConfigured` reste faux et le site retombe sur
 * le contenu statique de `src/content/site.ts`.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;

/** Nom du bucket Storage pour les images (galerie + avis). */
export const MEDIA_BUCKET = "media";
