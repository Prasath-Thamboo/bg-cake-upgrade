import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "./_components/SetupNotice";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) {
    return <SetupNotice />;
  }
  return <>{children}</>;
}
