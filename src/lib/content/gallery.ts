import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { site } from "@/content/site";
import type { GalleryItem } from "./types";

type Row = {
  id: string;
  title: string;
  description: string | null;
  tag: string | null;
  flavors: string[] | null;
  occasion: string | null;
  complexity: string | null;
  config_query: string | null;
  image_url: string | null;
  published: boolean;
  sort_order: number | null;
};

export function rowToGalleryItem(r: Row): GalleryItem {
  return {
    id: r.id,
    title: r.title,
    description: r.description ?? "",
    tag: r.tag ?? "",
    flavors: r.flavors ?? [],
    occasion: r.occasion,
    complexity: r.complexity,
    configQuery: r.config_query,
    imageUrl: r.image_url ?? "",
    published: r.published,
    sortOrder: r.sort_order ?? 0,
  };
}

/** Repli statique tant que Supabase n'est pas branché. */
function fallbackItems(): GalleryItem[] {
  return site.creations.items.map((it, i) => ({
    id: `static-${i}`,
    title: it.title,
    description: it.desc,
    tag: it.tag,
    flavors: [],
    occasion: null,
    complexity: null,
    configQuery: null,
    imageUrl: it.img,
    published: true,
    sortOrder: i,
  }));
}

/** Créations publiées, pour le site public. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) return fallbackItems();

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return fallbackItems();
  return (data as Row[]).map(rowToGalleryItem);
}

/** Toutes les créations (admin). */
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as Row[]).map(rowToGalleryItem);
}

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return rowToGalleryItem(data as Row);
}
