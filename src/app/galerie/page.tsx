import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import GalleryBrowser from "@/components/gallery/GalleryBrowser";
import { getGalleryItems } from "@/lib/content/gallery";

export const metadata: Metadata = {
  title: "Galerie des créations",
  description:
    "Le portfolio des layer cakes BG-Cake : filtrez par occasion, complexité et saveur, et réutilisez un design dans le configurateur.",
};

export default async function GaleriePage() {
  const items = await getGalleryItems();

  return (
    <>
      <Header />
      <main className="min-h-screen pb-20 pt-24">
        <Container>
          <div className="max-w-2xl">
            <div className="eyebrow">Portfolio</div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-cocoa md:text-4xl">
              Galerie des créations
            </h1>
            <p className="mt-4 text-sm leading-7 text-cocoa-soft">
              Un aperçu de nos réalisations. Filtrez selon votre événement, puis
              reprenez un design tel quel dans le configurateur.
            </p>
          </div>

          <div className="mt-10">
            <GalleryBrowser items={items} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
