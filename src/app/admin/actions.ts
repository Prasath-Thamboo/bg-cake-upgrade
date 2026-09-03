"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { MEDIA_BUCKET } from "@/lib/supabase/config";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) throw new Error("Non autorisé.");
  return user;
}

function revalidatePublic() {
  revalidatePath("/");
}

// ── Upload d'image ──────────────────────────────────────────────────────────
export type UploadResult = { url: string } | { error: string };

export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  try {
    await requireAdmin();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { error: "Aucun fichier." };
    }
    if (file.size > 6 * 1024 * 1024) {
      return { error: "Image trop lourde (max 6 Mo)." };
    }

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${new Date().getFullYear()}/${randomUUID()}.${ext}`;
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(path, file, { contentType: file.type || undefined, upsert: false });

    if (error) return { error: error.message };

    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Échec de l'envoi." };
  }
}

// ── Créations ──────────────────────────────────────────────────────────────
/** Extrait la query string d'un lien configurateur collé (URL complète, ?a=b ou a=b). */
function normalizeConfigQuery(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const qIndex = v.indexOf("?");
  const qs = qIndex >= 0 ? v.slice(qIndex + 1) : v;
  return qs.replace(/^\?/, "").trim() || null;
}

function parseCreation(fd: FormData) {
  return {
    title: String(fd.get("title") || "").trim(),
    description: String(fd.get("description") || "").trim(),
    tag: String(fd.get("tag") || "").trim(),
    occasion: String(fd.get("occasion") || "").trim() || null,
    complexity: String(fd.get("complexity") || "").trim() || null,
    config_query: normalizeConfigQuery(String(fd.get("config_query") || "")),
    flavors: String(fd.get("flavors") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    image_url: String(fd.get("image_url") || "").trim() || null,
    published: fd.get("published") === "on",
    sort_order: Number(fd.get("sort_order") || 0),
  };
}

export async function saveCreation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const values = parseCreation(formData);
  if (!values.title) throw new Error("Le titre est obligatoire.");

  const supabase = createSupabaseAdminClient();
  const query = id
    ? supabase.from("gallery_items").update(values).eq("id", id)
    : supabase.from("gallery_items").insert(values);

  const { error } = await query;
  if (error) throw new Error(error.message);

  revalidatePublic();
  revalidatePath("/admin/creations");
  redirect("/admin/creations");
}

export async function deleteCreation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublic();
  revalidatePath("/admin/creations");
  redirect("/admin/creations");
}

// ── Avis ───────────────────────────────────────────────────────────────────
function parseReview(fd: FormData) {
  const rating = Number(fd.get("rating") || 5);
  return {
    author: String(fd.get("author") || "").trim(),
    text: String(fd.get("text") || "").trim(),
    rating: Math.min(5, Math.max(0, Number.isFinite(rating) ? rating : 5)),
    image_url: String(fd.get("image_url") || "").trim() || null,
    published: fd.get("published") === "on",
    sort_order: Number(fd.get("sort_order") || 0),
  };
}

export async function saveReview(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const values = parseReview(formData);
  if (!values.author || !values.text) {
    throw new Error("Auteur et texte sont obligatoires.");
  }

  const supabase = createSupabaseAdminClient();
  const query = id
    ? supabase.from("reviews").update(values).eq("id", id)
    : supabase.from("reviews").insert(values);

  const { error } = await query;
  if (error) throw new Error(error.message);

  revalidatePublic();
  revalidatePath("/admin/avis");
  redirect("/admin/avis");
}

export async function deleteReview(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublic();
  revalidatePath("/admin/avis");
  redirect("/admin/avis");
}

// ── Messages de contact ────────────────────────────────────────────────────
export async function setMessageHandled(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const handled = formData.get("handled") === "true";
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ handled })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}
