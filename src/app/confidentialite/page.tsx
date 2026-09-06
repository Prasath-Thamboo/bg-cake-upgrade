/* eslint-disable react/no-unescaped-entities -- texte légal éditable : apostrophes tolérées */
import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { site } from "@/content/site";

const c = site.company;

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment BG-Cake collecte, utilise et protège vos données personnelles, et comment exercer vos droits.",
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      intro="Cette politique explique quelles données personnelles sont collectées lorsque vous nous contactez, pourquoi, combien de temps elles sont conservées, et quels sont vos droits au titre du Règlement général sur la protection des données (RGPD) et de la loi « Informatique et Libertés »."
      updatedAt={c.legalUpdatedAt}
    >
      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement est {c.legalName}, éditeur du site{" "}
        {site.brand} — {c.address}. Pour toute question relative à vos données :{" "}
        <a href={`mailto:${c.email}`}>{c.email}</a>.
      </p>

      <h2>2. Données collectées</h2>
      <p>
        Nous ne collectons que les données que vous nous transmettez
        volontairement via le formulaire de contact ou le configurateur de devis :
      </p>
      <ul>
        <li>identité : nom (et prénom si vous l'indiquez) ;</li>
        <li>coordonnées : adresse email, numéro de téléphone (facultatif) ;</li>
        <li>
          détails du projet : date de l'événement, nombre de parts, message
          libre, éléments de configuration du gâteau ;
        </li>
        <li>
          le cas échéant, toute information supplémentaire que vous choisissez
          d'ajouter à votre message.
        </li>
      </ul>
      <p>
        Aucune donnée dite « sensible » n'est demandée. Merci de ne pas en
        transmettre dans le champ libre. Le site n'utilise ni traceur
        publicitaire, ni outil de mesure d'audience.
      </p>

      <h2>3. Finalités et bases légales</h2>
      <dl>
        <dt>Répondre à votre demande et établir un devis</dt>
        <dd>
          Base légale : mesures précontractuelles prises à votre demande
          (article 6.1.b du RGPD).
        </dd>
        <dt>Vous recontacter au sujet de votre projet</dt>
        <dd>
          Base légale : votre consentement, recueilli via la case à cocher du
          formulaire (article 6.1.a du RGPD), retirable à tout moment.
        </dd>
        <dt>Gérer et sécuriser les demandes reçues (back-office)</dt>
        <dd>
          Base légale : intérêt légitime de l'éditeur à traiter et suivre ses
          demandes commerciales (article 6.1.f du RGPD).
        </dd>
      </dl>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées au seul éditeur du site. Elles ne sont ni
        vendues, ni louées, ni cédées à des tiers à des fins commerciales. Pour
        fonctionner, le site s'appuie sur des prestataires techniques qui
        agissent comme sous-traitants, uniquement sur instruction de l'éditeur :
      </p>
      <ul>
        {c.processors.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong> — {p.role} ({p.location}).
          </li>
        ))}
      </ul>

      <h2>5. Transferts hors Union européenne</h2>
      <p>
        Certains sous-traitants (notamment pour l'envoi des emails et
        l'hébergement) peuvent traiter des données aux États-Unis. Ces transferts
        sont encadrés par les clauses contractuelles types de la Commission
        européenne et, le cas échéant, par la certification au Data Privacy
        Framework, garantissant un niveau de protection adéquat.
      </p>

      <h2>6. Durée de conservation</h2>
      <p>
        Les demandes de contact et de devis sont conservées {c.dataRetention},
        afin de pouvoir assurer un suivi commercial. À l'issue de ce délai, elles
        sont supprimées ou anonymisées. Si une commande est conclue, les
        documents nécessaires (facturation) sont conservés selon les durées
        légales applicables (10 ans pour les pièces comptables).
      </p>

      <h2>7. Cookies</h2>
      <p>
        Le site public ne dépose aucun cookie de mesure d'audience ou de
        publicité, et ne nécessite donc pas de bandeau de consentement. Un cookie
        strictement nécessaire est utilisé uniquement dans l'espace
        d'administration privé (<code>/admin</code>) pour maintenir la session de
        connexion ; il n'a aucune finalité de suivi.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        Les données sont stockées sur une base hébergée dans l'Union européenne,
        avec chiffrement en transit (HTTPS) et contrôle d'accès. L'accès au
        back-office est protégé par authentification. Malgré le soin apporté,
        aucune transmission sur Internet ne peut être garantie totalement sûre.
      </p>

      <h2>9. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez des droits suivants sur vos données :
      </p>
      <ul>
        <li>droit d'accès et de copie ;</li>
        <li>droit de rectification ;</li>
        <li>droit à l'effacement (« droit à l'oubli ») ;</li>
        <li>droit à la limitation du traitement ;</li>
        <li>droit d'opposition, notamment à la prospection ;</li>
        <li>droit à la portabilité des données que vous avez fournies ;</li>
        <li>
          droit de retirer votre consentement à tout moment, sans que cela
          n'affecte les traitements déjà réalisés.
        </li>
      </ul>
      <p>
        Pour exercer ces droits, écrivez à{" "}
        <a href={`mailto:${c.email}`}>{c.email}</a> en précisant votre demande.
        Une réponse vous sera apportée dans un délai maximum d'un mois. Vous
        pouvez également définir des directives relatives au sort de vos données
        après votre décès.
      </p>

      <h2>10. Réclamation</h2>
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits ne sont pas
        respectés, vous pouvez introduire une réclamation auprès de la CNIL —{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
          www.cnil.fr
        </a>{" "}
        — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
      </p>

      <h2>11. Modifications</h2>
      <p>
        Cette politique peut être mise à jour pour refléter des évolutions
        légales ou techniques. La date de dernière mise à jour figure en haut de
        page. Voir aussi nos{" "}
        <Link href="/mentions-legales">mentions légales</Link>.
      </p>
    </LegalPage>
  );
}
