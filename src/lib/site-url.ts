/**
 * URL publique du site, sans slash final.
 * - Local : http://localhost:3000 (défaut)
 * - Prod  : définie via NEXT_PUBLIC_SITE_URL (Netlify / Vercel → Environment Variables)
 * - Secours automatique : variables fournies par l'hébergeur
 *     Netlify → URL (prod) ou DEPLOY_PRIME_URL (previews), déjà en https://
 *     Vercel  → VERCEL_URL, sans protocole
 */
function withProtocol(value: string): string {
  const v = value.replace(/\/+$/, "");
  return /^https?:\/\//.test(v) ? v : `https://${v}`;
}

function resolve(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.URL, // Netlify (production)
    process.env.DEPLOY_PRIME_URL, // Netlify (branch / deploy preview)
    process.env.VERCEL_URL, // Vercel
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (value) return withProtocol(value);
  }

  return "http://localhost:3000";
}

export const SITE_URL = resolve();

/**
 * Indexation par les moteurs de recherche.
 * Désactivée par défaut : tant que le domaine définitif n'est pas branché,
 * le site ne doit pas être référencé (on évite que l'URL provisoire
 * *.netlify.app soit indexée puis à désindexer).
 * Le jour de la mise en ligne publique : NEXT_PUBLIC_ALLOW_INDEXING=true.
 */
export const SITE_INDEXABLE = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
