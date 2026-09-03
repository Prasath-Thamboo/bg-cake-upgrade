import { FaStar } from "react-icons/fa";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { getReviews } from "@/lib/content/reviews";

export default async function Reviews() {
  const reviews = await getReviews();

  return (
    <section id="avis" className="py-16">
      <Container>
        <Reveal>
          <SectionHeader
            badge={site.reviews.badge}
            title={site.reviews.title}
            desc={site.reviews.desc}
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <article className="h-full overflow-hidden card">
                {r.imageUrl ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    <img
                      src={r.imageUrl}
                      alt={`Avis client ${r.author}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="p-5">
                  <p className="text-sm font-medium text-cocoa/95">{r.text}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-semibold text-cocoa">
                      <FaStar className="text-gold" /> {r.rating.toFixed(1)}
                    </p>
                    <span className="text-xs text-cocoa-soft">{r.author}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
