"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact/schema";
import { submitContact } from "@/lib/contact/actions";

type Status = "idle" | "success" | "not-configured" | "error";

const fieldCls =
  "mt-2 w-full rounded-2xl bg-porcelain/60 px-4 py-3 text-sm text-cocoa ring-1 ring-cocoa/10 outline-none transition focus:ring-2 focus:ring-gold/40";

function fallbackMailto(v: ContactInput) {
  const body = [
    `Nom : ${v.name}`,
    `Email : ${v.email}`,
    v.phone ? `Téléphone : ${v.phone}` : null,
    v.eventDate ? `Date : ${v.eventDate}` : null,
    v.servings ? `Parts : ${v.servings}` : null,
    "",
    v.message,
  ]
    .filter(Boolean)
    .join("\n");
  return `${site.mailto}?subject=${encodeURIComponent("Demande de devis")}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [lastValues, setLastValues] = useState<ContactInput | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      servings: "",
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    setLastValues(values);
    const res = await submitContact(values);
    if (res.ok) {
      setStatus("success");
      reset();
    } else if (res.reason === "not-configured") {
      setStatus("not-configured");
    } else {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-16">
      <Container>
        <Reveal>
          <div className="card p-8 md:p-10">
            <SectionHeader
              badge={site.contact.badge}
              title={site.contact.title}
              desc={site.contact.desc}
            />

            <div className="mt-8 grid gap-10 md:grid-cols-[0.8fr_1fr]">
              {/* Colonne rassurance */}
              <div>
                <ul className="space-y-3 text-sm text-cocoa/85">
                  {site.contact.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="rule my-6" />
                <p className="text-sm text-cocoa-soft">
                  Vous pouvez aussi nous écrire sur Instagram ou par email.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={site.instagram} target="_blank" rel="noreferrer">
                    <Button type="button" variant="outline" size="md">
                      Instagram
                    </Button>
                  </a>
                  <a href={site.mailto}>
                    <Button type="button" variant="ghost" size="md">
                      Email
                    </Button>
                  </a>
                </div>
              </div>

              {/* Colonne formulaire */}
              <div>
                {status === "success" ? (
                  <div className="card-strong p-6 text-center md:p-8">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-cocoa">
                      Demande envoyée
                    </h3>
                    <p className="mt-2 text-sm text-cocoa-soft">
                      Merci ! Nous revenons vers vous sous 24 à 48 h avec une
                      proposition adaptée.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-5 text-sm font-semibold text-gold underline underline-offset-4"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* honeypot */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="hidden"
                      {...register("company")}
                    />

                    <Field label="Nom" error={errors.name?.message}>
                      <input
                        type="text"
                        autoComplete="name"
                        className={fieldCls}
                        {...register("name")}
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Email" error={errors.email?.message}>
                        <input
                          type="email"
                          autoComplete="email"
                          className={fieldCls}
                          {...register("email")}
                        />
                      </Field>
                      <Field label="Téléphone" hint="Optionnel">
                        <input
                          type="tel"
                          autoComplete="tel"
                          className={fieldCls}
                          {...register("phone")}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Date de l'événement" hint="Optionnel">
                        <input type="date" className={fieldCls} {...register("eventDate")} />
                      </Field>
                      <Field label="Nombre de parts" hint="Optionnel">
                        <input
                          type="text"
                          placeholder="ex. 12–15"
                          className={fieldCls}
                          {...register("servings")}
                        />
                      </Field>
                    </div>

                    <Field label="Votre projet" error={errors.message?.message}>
                      <textarea
                        rows={5}
                        placeholder="Goûts, style, thème, inspiration…"
                        className={`${fieldCls} resize-y`}
                        {...register("message")}
                      />
                    </Field>

                    {status === "error" ? (
                      <p className="rounded-xl bg-berry/10 px-3 py-2 text-sm text-berry">
                        Une erreur est survenue. Réessayez ou écrivez-nous
                        directement.
                      </p>
                    ) : null}

                    {status === "not-configured" && lastValues ? (
                      <div className="rounded-xl bg-porcelain/60 p-3 text-sm text-cocoa-soft ring-1 ring-gold/20">
                        L&apos;envoi automatique n&apos;est pas encore activé.{" "}
                        <a
                          href={fallbackMailto(lastValues)}
                          className="font-semibold text-gold underline underline-offset-2"
                        >
                          Envoyer par email
                        </a>{" "}
                        (votre message est déjà pré-rempli).
                      </div>
                    ) : null}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi…" : "Envoyer ma demande"}
                    </Button>

                    <p className="text-xs text-cocoa/55">
                      Vos informations servent uniquement à traiter votre demande.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa-soft">
          {label}
        </span>
        {hint ? <span className="text-[0.7rem] text-cocoa/45">{hint}</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-berry">{error}</span> : null}
    </label>
  );
}
