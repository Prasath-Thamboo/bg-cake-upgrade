import Container from "@/components/ui/Container";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-cocoa/10 bg-white/25 backdrop-blur">
      <Container className="py-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <div className="text-sm font-extrabold">{site.brand}</div>
            <div className="text-xs text-cocoa/70">{site.tagline}</div>
          </div>

          <a
            href={site.footer.termsHref}
            className="text-xs font-semibold text-cocoa/70 underline-offset-4 hover:underline"
          >
            {site.footer.termsLabel}
          </a>

          <div className="text-xs text-cocoa/70">
            {site.footer.rights} • <span className="text-cocoa">{site.footer.copyright}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
