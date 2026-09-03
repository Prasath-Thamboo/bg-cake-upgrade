"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Identifiants incorrects.");
      setLoading(false);
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card-strong mt-8 space-y-5 p-8">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa-soft">
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-2xl bg-porcelain/60 px-4 py-3 text-sm text-cocoa ring-1 ring-cocoa/10 outline-none focus:ring-2 focus:ring-gold/40"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa-soft">
          Mot de passe
        </span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-2xl bg-porcelain/60 px-4 py-3 text-sm text-cocoa ring-1 ring-cocoa/10 outline-none focus:ring-2 focus:ring-gold/40"
        />
      </label>

      {error ? (
        <p className="rounded-xl bg-berry/10 px-3 py-2 text-sm text-berry">{error}</p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen py-20">
      <Container className="max-w-md">
        <div className="eyebrow">Back-office BG-Cake</div>
        <h1 className="mt-3 text-3xl font-semibold text-cocoa">Connexion</h1>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </Container>
    </main>
  );
}
