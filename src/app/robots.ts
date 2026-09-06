import type { MetadataRoute } from "next";
import { SITE_URL, SITE_INDEXABLE } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Tant que le domaine définitif n'est pas en place : on bloque tout.
  if (!SITE_INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
