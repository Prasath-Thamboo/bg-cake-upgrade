"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import LayerCake from "@/components/sections/cake/LayerCake";
import { site } from "@/content/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // L'effet épinglé « déballage » au scroll tourne sur toutes les tailles.
  // Seul `prefers-reduced-motion` le désactive (héros statique, gâteau assemblé).
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(rm.matches);
    update();
    rm.addEventListener("change", update);
    return () => rm.removeEventListener("change", update);
  }, []);
  const animated = !reduced;

  // Progression 0 → 1 calculée à la main depuis le scroll de page.
  const [span, setSpan] = useState({ start: 0, end: 1 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const dist = Math.max(el.offsetHeight - window.innerHeight, 1);
      setSpan({ start: el.offsetTop, end: el.offsetTop + dist });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [animated]);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => {
    const d = span.end - span.start;
    return d <= 0 ? 0 : Math.min(1, Math.max(0, (v - span.start) / d));
  });

  const textY = useTransform(progress, [0, 1], [0, -56]);
  const textOpacity = useTransform(progress, [0, 0.38, 0.56], [1, 1, 0]);
  const cakeScale = useTransform(progress, [0, 0.5, 0.88], [1, 1, 0.9]);
  const cakeY = useTransform(progress, [0, 1], [0, -22]);
  const cakeOpacity = useTransform(progress, [0, 0.5, 0.82], [1, 1, 0]);
  const blobA = useTransform(progress, [0, 1], [0, 130]);
  const blobB = useTransform(progress, [0, 1], [0, -100]);
  const blobOpacity = useTransform(progress, [0, 0.45, 0.78], [1, 1, 0]);
  const cueOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  const stage = (
    <div className="grid w-full items-center gap-4 sm:gap-8 md:grid-cols-2 md:gap-10">
      <motion.div
        style={animated ? { y: textY, opacity: textOpacity } : undefined}
        className="order-2 md:order-1"
      >
        <Badge>Artisanal • Premium • Sur-mesure</Badge>

        <h1 className="mt-3 text-[1.6rem] font-semibold leading-[1.1] text-cocoa min-[420px]:text-[1.9rem] sm:mt-4 sm:text-[2.4rem] md:text-[min(2.8rem,5.6svh)] lg:text-[min(3.2rem,6.2svh)]">
          {site.hero.title}
        </h1>

        <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-6 text-cocoa-soft sm:mt-4 sm:line-clamp-none sm:leading-7 [@media(max-height:620px)]:hidden">
          {site.hero.text}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:flex sm:flex-wrap">
          <a href={site.instagram} target="_blank" rel="noreferrer">
            <Button size="lg" type="button" className="w-full max-sm:h-12 max-sm:px-3 sm:w-auto">
              {site.hero.ctaPrimary}
            </Button>
          </a>
          <a href="#creations">
            <Button size="lg" variant="outline" type="button" className="w-full max-sm:h-12 max-sm:px-3 sm:w-auto">
              {site.hero.ctaSecondary}
            </Button>
          </a>
        </div>

        <div className="mt-4 grid max-w-xl grid-cols-3 gap-2.5 text-center sm:mt-7 sm:gap-3">
          {site.hero.highlights.map((h) => (
            <div
              key={h.top}
              className="rounded-2xl bg-porcelain/50 px-2 py-2 ring-1 ring-gold/15 backdrop-blur sm:px-3 sm:py-3.5"
            >
              <div className="font-display text-[0.95rem] font-semibold leading-tight text-cocoa sm:text-base">
                {h.top}
              </div>
              <div className="mt-1 text-[0.68rem] leading-tight text-cocoa-soft sm:text-xs">
                {h.bottom}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        style={animated ? { scale: cakeScale, y: cakeY, opacity: cakeOpacity } : undefined}
        className="relative order-1 mx-auto w-full max-w-[min(15rem,19svh)] sm:max-w-[min(20rem,24svh)] md:order-2 md:max-w-[min(24rem,50svh)]"
      >
        <LayerCake
          progress={animated ? progress : null}
          gap={44}
          className="w-full cake-float"
        />
        <p className="eyebrow mt-3 hidden text-center leading-relaxed md:block">
          Composition signature — génoise, crème, framboise
        </p>
      </motion.div>
    </div>
  );

  // Héros statique (prefers-reduced-motion)
  if (reduced) {
    return (
      <section id="accueil" ref={ref} className="relative">
        <Container className="grid min-h-svh content-center gap-10 pb-14 pt-24">
          {stage}
        </Container>
      </section>
    );
  }

  // Héros épinglé « déballage », piloté au scroll — toutes tailles.
  return (
    <section
      id="accueil"
      ref={ref}
      className="relative -mb-[10vh] h-[165vh] sm:h-[170vh] lg:-mb-[16vh] lg:h-[172vh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          aria-hidden
          style={{ y: blobA, opacity: blobOpacity }}
          className="pointer-events-none absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(231,214,179,0.5)_0%,rgba(231,214,179,0.24)_36%,rgba(231,214,179,0.08)_58%,transparent_78%)] blur-3xl"
        />
        <motion.div
          aria-hidden
          style={{ y: blobB, opacity: blobOpacity }}
          className="pointer-events-none absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(201,168,111,0.36)_0%,rgba(201,168,111,0.16)_38%,rgba(201,168,111,0.05)_60%,transparent_80%)] blur-3xl"
        />

        <Container className="flex h-full [align-items:safe_center] pb-16 pt-20 sm:pb-20 sm:pt-24">
          {stage}
        </Container>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-2 text-cocoa-soft sm:bottom-6 sm:gap-2.5"
        >
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
            Défiler
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-cocoa-soft/25">
            <span className="cue-dot absolute left-1/2 top-0 h-2 w-[3px] -translate-x-1/2 rounded-full bg-gold" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
