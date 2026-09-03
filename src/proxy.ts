import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

/**
 * - Rafraîchit la session Supabase à chaque requête.
 * - Protège /admin/** (redirige vers /admin/login si pas de session).
 * - Renvoie un visiteur déjà connecté hors de /admin/login.
 */
export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;
  const isAdminArea = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";

  if (!isSupabaseConfigured) {
    // Sans config, l'admin affiche un écran d'instructions (pas de redirection).
    return response;
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminArea && !isLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
