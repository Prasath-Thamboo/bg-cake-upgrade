/* eslint-disable react/no-unescaped-entities -- texte légal éditable : apostrophes tolérées */
import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { site } from "@/content/site";

const c = site.company;

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Informations légales relatives à l'éditeur et à l'hébergeur du site BG-Cake.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      intro="Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, voici les informations relatives à l'éditeur et à l'hébergeur du présent site."
      updatedAt={c.legalUpdatedAt}
    >
      <h2>1. Éditeur du site</h2>
      <p>Le site {site.brand} est édité par :</p>
      <dl>
        <dt>Dénomination</dt>
        <dd>{c.legalName}</dd>
        <dt>Forme juridique</dt>
        <dd>{c.status}</dd>
        <dt>Siège / adresse</dt>
        <dd>{c.address}</dd>
        <dt>SIRET</dt>
        <dd>{c.siret}</dd>
        <dt>N° TVA intracommunautaire</dt>
        <dd>{c.vat}</dd>
        <dt>Inscription au Répertoire des Métiers</dt>
        <dd>{c.rmRegistration}</dd>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${c.email}`}>{c.email}</a>
        </dd>
        <dt>Téléphone</dt>
        <dd>{c.phone}</dd>
      </dl>

      <h2>2. Directeur de la publication</h2>
      <p>{c.publicationDirector}</p>

      <h2>3. Hébergeur</h2>
      <p>Le site est hébergé par :</p>
      <dl>
        <dt>{c.host.name}</dt>
        <dd>{c.host.address}</dd>
        <dt>Contact</dt>
        <dd>
          <a href={c.host.contact} target="_blank" rel="noreferrer">
            {c.host.contact}
          </a>
        </dd>
      </dl>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments du site ({site.brand}) — textes, photographies,
        illustrations, logo, charte graphique, mise en page — est protégé par le
        droit d'auteur et reste la propriété exclusive de l'éditeur, sauf mention
        contraire. Toute reproduction, représentation, adaptation ou exploitation,
        totale ou partielle, sans autorisation écrite préalable, est interdite et
        constituerait une contrefaçon sanctionnée par les articles L.335-2 et
        suivants du Code de la propriété intellectuelle.
      </p>
      <p>
        Les photographies de créations restent la propriété de l'éditeur. Les
        images fournies par les clients pour illustrer une demande ne sont
        utilisées qu'à des fins de préparation du devis.
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        Les informations diffusées sur le site (saveurs, formules, tarifs
        indicatifs, délais) sont fournies à titre indicatif et peuvent évoluer.
        Les prix affichés ne constituent pas un engagement contractuel : seul le
        devis personnalisé validé par écrit fait foi. L'éditeur s'efforce de
        maintenir le site accessible et à jour, sans garantir l'absence
        d'erreurs, d'interruptions ou de bugs.
      </p>
      <p>
        L'éditeur ne saurait être tenu responsable des dommages directs ou
        indirects résultant de l'accès au site ou de son utilisation, ni de
        l'usage fait des informations qui y figurent.
      </p>
      <p>
        <strong>Allergènes.</strong> Les gâteaux sont préparés dans un atelier
        manipulant notamment gluten, œufs, lait, fruits à coque et arachides.
        Toute allergie ou intolérance doit être signalée par écrit lors de la
        commande ; une absence totale de traces ne peut être garantie.
      </p>

      <h2>6. Liens hypertextes</h2>
      <p>
        Le site peut renvoyer vers des sites tiers (par exemple Instagram).
        L'éditeur n'exerce aucun contrôle sur ces ressources et décline toute
        responsabilité quant à leur contenu ou à leurs pratiques en matière de
        données personnelles.
      </p>

      <h2>7. Données personnelles et cookies</h2>
      <p>
        Le traitement des données personnelles collectées via le formulaire de
        contact et le configurateur de devis est décrit dans notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>. Le site
        ne dépose pas de cookie publicitaire ni de mesure d'audience ; seul un
        cookie strictement nécessaire est utilisé pour l'espace d'administration
        privé.
      </p>

      <h2>8. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En cas
        de litige, et à défaut de résolution amiable, les tribunaux français
        seront seuls compétents.
      </p>
    </LegalPage>
  );
}
