import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";

export default function Pricing() {
  return (
    <section id="formules" className="py-16">
      <Container>
        <Reveal>
          <SectionHeader
            badge={site.pricing.badge}
            title={site.pricing.title}
            desc={site.pricing.desc}
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {site.pricing.plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article
                className={[
                  "relative h-full overflow-hidden card p-6",
                  p.featured ? "ring-2 ring-gold/40" : "",
                ].join(" ")}
              >
                {p.featured && (
                  <div className="absolute right-4 top-4 rounded-full bg-cocoa px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-bg">
                    Recommandé
                  </div>
                )}

                <div className="text-sm font-semibold uppercase tracking-[0.1em] text-cocoa-soft">
                  {p.name}
                </div>
                <div className="mt-2 font-display text-3xl font-semibold text-cocoa">
                  {p.price}
                </div>
                <p className="mt-3 text-sm text-cocoa-soft">{p.note}</p>

                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span className="text-cocoa/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a href="#contact">
                    <Button
                      type="button"
                      className="w-full"
                      variant={p.featured ? "primary" : "outline"}
                      size="md"
                    >
                      Demander un devis
                    </Button>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-cocoa/60">
          {site.pricing.disclaimer}
        </p>
      </Container>
    </section>
  );
}
