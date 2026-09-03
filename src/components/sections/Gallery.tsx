import Link from "next/link";
import { site } from "@/content/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { getGalleryItems } from "@/lib/content/gallery";

export default async function Gallery() {
  const items = (await getGalleryItems()).slice(0, 4);

  return (
    <section id="creations" className="py-16">
      <Container>
        <Reveal>
          <SectionHeader
            badge={site.creations.badge}
            title={site.creations.title}
            desc={site.creations.desc}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <article className="group h-full overflow-hidden card">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  {item.tag ? (
                    <div className="absolute left-4 top-4 rounded-full bg-porcelain/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cocoa ring-1 ring-gold/20 backdrop-blur">
                      {item.tag}
                    </div>
                  ) : null}
                </div>

                <div className="p-5">
                  <h3 className="font-sans text-base font-bold text-cocoa">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 text-sm text-cocoa-soft">{item.description}</p>
                  ) : null}

                  <div className="rule mt-4" />
                  <div className="mt-4 text-xs text-cocoa/55">
                    Photos et finitions selon disponibilité &amp; saison
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/galerie">
            <Button type="button" variant="outline" size="lg">
              Voir toute la galerie
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
