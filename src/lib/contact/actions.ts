"use server";

import { contactSchema, type ContactResult } from "./schema";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function submitContact(raw: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const data = parsed.data;

  // Anti-spam : champ honeypot rempli → on fait comme si tout allait bien.
  if (data.company) return { ok: true };

  let stored = false;
  let mailed = false;

  // 1) Enregistrement en base
  if (isSupabaseConfigured) {
    try {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("contact_messages").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        event_date: data.eventDate || null,
        servings: data.servings || null,
        message: data.message,
      });
      stored = !error;
    } catch {
      /* ignoré */
    }
  }

  // 2) Notification email via Resend
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (key && to && from) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      const lines = [
        `Nom : ${data.name}`,
        `Email : ${data.email}`,
        data.phone ? `Téléphone : ${data.phone}` : null,
        data.eventDate ? `Date de l'événement : ${data.eventDate}` : null,
        data.servings ? `Nombre de parts : ${data.servings}` : null,
        "",
        data.message,
      ].filter(Boolean);
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `Demande de devis — ${data.name}`,
        text: lines.join("\n"),
      });
      mailed = !error;
    } catch {
      /* ignoré */
    }
  }

  if (!stored && !mailed) return { ok: false, reason: "not-configured" };
  return { ok: true };
}
