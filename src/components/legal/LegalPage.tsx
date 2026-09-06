import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

/** Coquille commune aux pages légales (mentions légales, confidentialité). */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updatedAt?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-20 pt-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-cocoa md:text-4xl">
              {title}
            </h1>
            {intro ? (
              <p className="mt-4 text-sm leading-7 text-cocoa-soft">{intro}</p>
            ) : null}
            {updatedAt ? (
              <p className="mt-2 text-xs text-cocoa/55">
                Dernière mise à jour : {updatedAt}
              </p>
            ) : null}

            <div className="rule my-8" />

            <div className="legal-prose">{children}</div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
