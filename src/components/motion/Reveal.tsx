"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  children: ReactNode;
  /** Décalage d'entrée en secondes (pour cascader plusieurs blocs) */
  delay?: number;
  /** Amplitude verticale de l'entrée, en px */
  y?: number;
  className?: string;
};

/**
 * Révèle son contenu quand il entre dans le viewport :
 * fondu + léger glissement vertical. Ne se joue qu'une fois.
 * Respecte prefers-reduced-motion (rendu immédiat, sans animation).
 */
export default function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
