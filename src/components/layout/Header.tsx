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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-porcelain/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#accueil"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/image/logo.png"
            alt="BG-Cake"
            width={40}
            height={40}
            className="rounded-xl ring-1 ring-gold/20"
            priority
          />
          <div className="leading-tight">
            <div className="whitespace-nowrap text-sm font-bold text-cocoa">
              {site.brand}
            </div>
            <div className="hidden whitespace-nowrap text-xs text-cocoa-soft sm:block">
              {site.tagline}
            </div>
          </div>
        </a>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-cocoa/75 transition-colors hover:bg-cocoa/5 hover:text-cocoa"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
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
          className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-cocoa hover:bg-cocoa/5 lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="fixed inset-0 z-30 bg-cocoa/25"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 top-0 z-40 h-dvh overflow-y-auto bg-bg/95 px-6 pb-10 pt-24 backdrop-blur">
            <div className="mx-auto max-w-md rounded-3xl bg-porcelain/70 p-6 ring-1 ring-gold/20 backdrop-blur">
              <ul className="flex flex-col gap-2">
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
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
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
