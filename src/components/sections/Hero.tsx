import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section id="accueil" className="pt-24">
      <Container className="py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Badge>Artisanal • Premium • Sur-mesure</Badge>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              {site.hero.title}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-cocoa/80">
              {site.hero.text}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.instagram} target="_blank" rel="noreferrer">
                <Button size="lg" type="button">
                  {site.hero.ctaPrimary}
                </Button>
              </a>
              <a href="#creations">
                <Button size="lg" variant="outline" type="button">
                  {site.hero.ctaSecondary}
                </Button>
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
              {site.hero.highlights.map((h) => (
                <div
                  key={h.top}
                  className="rounded-2xl bg-white/35 p-4 ring-1 ring-cocoa/10 backdrop-blur"
                >
                  <div className="text-lg font-extrabold">{h.top}</div>
                  <div className="text-xs text-cocoa/70">{h.bottom}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-white/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] bg-white/30 p-4 ring-1 ring-cocoa/10 backdrop-blur">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/image/Cake.jpg"
                  alt="Gâteau BG-Cake"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">Créations signature</div>
                  <div className="text-xs text-cocoa/70">
                    Anniversaires • mariages • events
                  </div>
                </div>
                <a href="#contact">
                  <Button size="sm" variant="secondary" type="button">
                    Devis
                  </Button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
