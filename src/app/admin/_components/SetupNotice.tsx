import Container from "@/components/ui/Container";

/** Affiché tant que les variables d'environnement Supabase ne sont pas posées. */
export default function SetupNotice() {
  return (
    <main className="min-h-screen py-20">
      <Container className="max-w-2xl">
        <div className="card-strong p-8 md:p-10">
          <div className="eyebrow">Back-office</div>
          <h1 className="mt-4 text-3xl font-semibold text-cocoa">
            Configuration Supabase requise
          </h1>
          <p className="mt-4 text-sm leading-7 text-cocoa-soft">
            Le back-office a besoin d&apos;un projet Supabase (base de données,
            authentification, stockage des images). Voici les étapes :
          </p>

          <ol className="mt-6 space-y-4 text-sm text-cocoa/90">
            <li>
              <b>1.</b> Crée un projet sur{" "}
              <a href="https://app.supabase.com" target="_blank" rel="noreferrer">
                app.supabase.com
              </a>
              .
            </li>
            <li>
              <b>2.</b> Dans <b>SQL Editor</b>, colle et exécute le contenu de{" "}
              <code className="rounded bg-cream px-1.5 py-0.5">supabase/schema.sql</code>{" "}
              (à la racine du projet).
            </li>
            <li>
              <b>3.</b> Dans <b>Settings → API</b>, copie l&apos;URL du projet, la clé{" "}
              <code className="rounded bg-cream px-1.5 py-0.5">anon</code> et la clé{" "}
              <code className="rounded bg-cream px-1.5 py-0.5">service_role</code>.
            </li>
            <li>
              <b>4.</b> Crée le fichier{" "}
              <code className="rounded bg-cream px-1.5 py-0.5">.env.local</code> à partir
              de{" "}
              <code className="rounded bg-cream px-1.5 py-0.5">.env.local.example</code>{" "}
              et renseigne ces trois valeurs.
            </li>
            <li>
              <b>5.</b> Dans <b>Authentication → Users</b>, ajoute ton compte
              (email + mot de passe). Ce sera ton accès admin.
            </li>
            <li>
              <b>6.</b> Redémarre le serveur. Cette page laissera place à l&apos;écran
              de connexion.
            </li>
          </ol>

          <p className="mt-6 text-xs text-cocoa/55">
            En attendant, le site public fonctionne normalement avec le contenu
            par défaut.
          </p>
        </div>
      </Container>
    </main>
  );
}
