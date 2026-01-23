import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <Container>
        <div className="rounded-3xl bg-white/35 ring-1 ring-cocoa/10 backdrop-blur shadow-soft p-8 md:p-10">
          <SectionHeader
            badge={site.contact.badge}
            title={site.contact.title}
            desc={site.contact.desc}
          />

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
            <ul className="space-y-3 text-sm text-cocoa/85">
              {site.contact.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-sand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <a
                href={site.mailto}
                className="sm:flex-1"
              >
                <Button type="button" className="w-full" size="lg">
                  {site.contact.buttonPrimary}
                </Button>
              </a>

              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="sm:flex-1"
              >
                <Button type="button" className="w-full" size="lg" variant="outline">
                  {site.contact.buttonSecondary}
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-6 text-xs text-cocoa/60">
            Astuce : indiquez la date, le nombre de parts, vos goûts, et une photo d’inspiration si vous en avez.
          </div>
        </div>
      </Container>
    </section>
  );
}
