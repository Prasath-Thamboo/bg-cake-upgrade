import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Configurator from "@/components/devis/Configurator";

export const metadata: Metadata = {
  title: "Composer votre gâteau",
  description:
    "Configurez votre layer cake sur-mesure : format, saveurs, style et finitions, avec une estimation en direct.",
};

export default function DevisPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-20 pt-24">
        <Container>
          <div className="max-w-2xl">
            <div className="eyebrow">Sur-mesure</div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-cocoa md:text-4xl">
              Composez votre gâteau
            </h1>
            <p className="mt-4 text-sm leading-7 text-cocoa-soft">
              Cinq étapes, un aperçu en direct et une estimation détaillée. Le lien
              de la page conserve votre configuration : partagez-le ou reprenez-le
              plus tard.
            </p>
          </div>

          <div className="mt-10">
            <Configurator fullPage />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
