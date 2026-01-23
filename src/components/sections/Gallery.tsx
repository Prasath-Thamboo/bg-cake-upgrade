import { site } from "@/content/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Gallery() {
  return (
    <section id="creations" className="py-16">
      <Container>
        <SectionHeader
          badge={site.creations.badge}
          title={site.creations.title}
          desc={site.creations.desc}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.creations.items.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden card"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/55 px-3 py-1 text-xs font-semibold text-cocoa ring-1 ring-cocoa/10 backdrop-blur">
                  {item.tag}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm text-cocoa/80">{item.desc}</p>

                <div className="mt-4 h-px w-full bg-cocoa/10" />
                <div className="mt-4 text-xs text-cocoa/60">
                  Photos et finitions selon disponibilité & saison
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
