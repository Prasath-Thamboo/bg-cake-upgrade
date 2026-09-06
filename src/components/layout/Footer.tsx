import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-cocoa/10 bg-white/25 backdrop-blur">
      <Container className="py-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <div className="text-sm font-extrabold">{site.brand}</div>
            <div className="text-xs text-cocoa/70">{site.tagline}</div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {site.footer.legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-semibold text-cocoa/70 underline-offset-4 hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="text-xs text-cocoa/70">
            © {year} <span className="text-cocoa">{site.brand}</span> •{" "}
            {site.footer.rights}
          </div>
        </div>
      </Container>
    </footer>
  );
}
