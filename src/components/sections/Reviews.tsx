import { FaStar } from "react-icons/fa";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Reviews() {
  return (
    <section id="avis" className="py-16">
      <Container>
        <SectionHeader
          badge={site.reviews.badge}
          title={site.reviews.title}
          desc={site.reviews.desc}
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {site.reviews.items.map((r) => (
            <article
              key={r.author}
              className="overflow-hidden card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={r.img}
                  alt={`Avis client ${r.author}`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-sm font-medium text-cocoa/95">{r.text}</p>

                <div className="mt-3 flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm font-extrabold text-cocoa">
                    <FaStar className="text-sand" /> {r.rating.toFixed(1)}
                  </p>
                  <span className="text-xs text-cocoa/70">
                    {r.author}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
