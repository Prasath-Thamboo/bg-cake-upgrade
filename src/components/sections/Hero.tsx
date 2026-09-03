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

  // L'effet épinglé « déballage » ne s'active que sur écran ≥ lg et si les
  // animations ne sont pas réduites. Ailleurs (mobile, tablette, reduced-motion) :
  // héros statique, gâteau assemblé.
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnhanced(wide.matches && !rm.matches);
    update();
    wide.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

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
  }, [enhanced]);

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
    <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-10">
      <motion.div style={enhanced ? { y: textY, opacity: textOpacity } : undefined}>
        <Badge>Artisanal • Premium • Sur-mesure</Badge>

        <h1 className="mt-5 text-[2rem] font-semibold leading-[1.08] text-cocoa min-[420px]:text-[2.35rem] sm:text-[2.75rem] md:text-[3.05rem] lg:text-[3.35rem]">
          {site.hero.title}
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-cocoa-soft">
          {site.hero.text}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="max-sm:w-full">
            <Button size="lg" type="button" className="w-full sm:w-auto">
              {site.hero.ctaPrimary}
            </Button>
          </a>
          <a href="#creations" className="max-sm:w-full">
            <Button size="lg" variant="outline" type="button" className="w-full sm:w-auto">
              {site.hero.ctaSecondary}
            </Button>
          </a>
        </div>

        <div className="mt-9 grid max-w-xl grid-cols-3 gap-2.5 text-center sm:gap-3">
          {site.hero.highlights.map((h) => (
            <div
              key={h.top}
              className="rounded-2xl bg-porcelain/50 px-2 py-3 ring-1 ring-gold/15 backdrop-blur sm:px-3 sm:py-4"
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
        style={enhanced ? { scale: cakeScale, y: cakeY, opacity: cakeOpacity } : undefined}
        className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm"
      >
        <LayerCake
          progress={enhanced ? progress : null}
          gap={44}
          className="w-full cake-float"
        />
        <p className="eyebrow mt-3 text-center leading-relaxed">
          Composition signature — génoise, crème, framboise
        </p>
      </motion.div>
    </div>
  );

  // Héros statique (mobile / reduced-motion)
  if (!enhanced) {
    return (
      <section id="accueil" ref={ref} className="relative">
        <Container className="grid gap-10 pb-14 pt-24 md:min-h-[88svh] md:content-center">
          {stage}
        </Container>
      </section>
    );
  }

  // Héros épinglé « déballage » (≥ md)
  return (
    <section
      id="accueil"
      ref={ref}
      className="relative -mb-[12vh] h-[160vh] lg:-mb-[16vh] lg:h-[172vh]"
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

        <Container className="flex h-full items-center pb-10 pt-16">{stage}</Container>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2.5 text-cocoa-soft"
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
