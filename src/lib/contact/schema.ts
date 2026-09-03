import { z } from "zod";

/** Schéma partagé client (react-hook-form) + serveur (Server Action). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom.")
    .max(120, "Nom trop long."),
  email: z.string().trim().email("Email invalide."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  eventDate: z.string().trim().max(40).optional().or(z.literal("")),
  servings: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Donnez-nous quelques détails (10 caractères min).")
    .max(4000, "Message trop long."),
  /** Anti-spam : doit rester vide. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "not-configured" | "error" };
