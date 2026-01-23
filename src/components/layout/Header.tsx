"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cocoa/10 bg-white/35 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#accueil" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <Image
            src="/image/logo.png"
            alt="BG-Cake"
            width={44}
            height={44}
            className="rounded-xl ring-1 ring-cocoa/10"
            priority
          />
          <div className="leading-tight">
            <div className="text-sm font-extrabold">{site.brand}</div>
            <div className="text-xs text-cocoa/70">{site.tagline}</div>
          </div>
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-cocoa/80 hover:bg-cocoa/5 hover:text-cocoa"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact">
            <Button variant="outline" size="sm" type="button">
              Devis
            </Button>
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            <Button size="sm" type="button">
              Réserver
            </Button>
          </a>
        </div>

        <button
          type="button"
          className="md:hidden rounded-xl px-3 py-2 text-sm font-semibold text-cocoa hover:bg-cocoa/5"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </Container>

      {open && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-0 top-0 z-50 h-screen bg-bg px-6 pt-24">
            <div className="mx-auto max-w-md rounded-3xl bg-white/40 p-6 ring-1 ring-cocoa/10 backdrop-blur">
              <ul className="flex flex-col gap-3">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 font-semibold text-cocoa hover:bg-cocoa/5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-3">
                <a href="#contact" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full" type="button">
                    Demander un devis
                  </Button>
                </a>
                <a href={site.instagram} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  <Button className="w-full" type="button">
                    Réserver
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
