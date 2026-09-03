import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import { getSessionUser } from "@/lib/supabase/server";
import SignOutButton from "../_components/SignOutButton";

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      <header className="border-b border-gold/15 bg-porcelain/70 backdrop-blur">
        <Container className="flex h-16 items-center gap-2 sm:gap-4">
          <Link
            href="/admin"
            className="shrink-0 text-sm font-bold text-cocoa"
          >
            <span className="sm:hidden">Admin</span>
            <span className="hidden sm:inline">BG-Cake · Admin</span>
          </Link>

          <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
            <Link
              href="/admin/creations"
              className="shrink-0 rounded-xl px-2.5 py-2 text-sm font-semibold text-cocoa/75 hover:bg-cocoa/5 hover:text-cocoa"
            >
              Créations
            </Link>
            <Link
              href="/admin/avis"
              className="shrink-0 rounded-xl px-2.5 py-2 text-sm font-semibold text-cocoa/75 hover:bg-cocoa/5 hover:text-cocoa"
            >
              Avis
            </Link>
            <Link
              href="/admin/messages"
              className="shrink-0 rounded-xl px-2.5 py-2 text-sm font-semibold text-cocoa/75 hover:bg-cocoa/5 hover:text-cocoa"
            >
              Messages
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/"
              className="hidden text-xs font-semibold text-cocoa-soft hover:text-cocoa sm:block"
            >
              Voir le site ↗
            </Link>
            <span className="hidden text-xs text-cocoa-soft lg:block">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </Container>
      </header>

      <main className="py-10">
        <Container className="max-w-4xl">{children}</Container>
      </main>
    </div>
  );
}
