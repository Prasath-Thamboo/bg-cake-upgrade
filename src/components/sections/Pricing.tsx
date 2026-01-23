import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";

export default function Pricing() {
  return (
    <section id="formules" className="py-16">
      <Container>
        <SectionHeader
          badge={site.pricing.badge}
          title={site.pricing.title}
          desc={site.pricing.desc}
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {site.pricing.plans.map((p) => (
            <article
              key={p.name}
              className={[
                "relative overflow-hidden rounded-3xl bg-white/35 ring-1 ring-cocoa/10 backdrop-blur shadow-soft p-6",
                p.featured ? "ring-2 ring-cocoa/20" : "",
              ].join(" ")}
            >
              {p.featured && (
                <div className="absolute right-4 top-4 rounded-full bg-cocoa px-3 py-1 text-xs font-semibold text-bg">
                  Recommandé
                </div>
              )}

              <div className="text-sm font-semibold text-cocoa/70">{p.name}</div>
              <div className="mt-2 text-3xl font-extrabold">{p.price}</div>
              <p className="mt-3 text-sm text-cocoa/80">{p.note}</p>

              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sand" />
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
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-cocoa/70">
          {site.pricing.disclaimer}
        </p>
      </Container>
    </section>
  );
}
