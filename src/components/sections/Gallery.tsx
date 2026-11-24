import Link from "next/link";
import { site } from "@/content/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import CreationsShowcase from "@/components/gallery/CreationsShowcase";
import { getGalleryItems } from "@/lib/content/gallery";

export default async function Gallery() {
  const items = await getGalleryItems();

  return (
    <section id="creations" className="relative overflow-hidden py-16">
      {/* halos décoratifs */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-gold-soft/50 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-berry/10 blur-3xl" />

      <Container>
        <Reveal>
          <SectionHeader
            badge={site.creations.badge}
            title={site.creations.title}
            desc={site.creations.desc}
          />
        </Reveal>

        <CreationsShowcase items={items} />

        {items.length > 0 ? (
          <div className="mt-10 flex justify-center">
            <Link href="/galerie">
              <Button type="button" variant="outline" size="lg">
                Voir toute la galerie
              </Button>
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
