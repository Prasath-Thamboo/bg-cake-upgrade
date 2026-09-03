import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { site } from "@/content/site";
import type { Review } from "./types";

type Row = {
  id: string;
  author: string;
  text: string;
  rating: number | null;
  image_url: string | null;
  published: boolean;
  sort_order: number | null;
};

export function rowToReview(r: Row): Review {
  return {
    id: r.id,
    author: r.author,
    text: r.text,
    rating: r.rating ?? 5,
    imageUrl: r.image_url,
    published: r.published,
    sortOrder: r.sort_order ?? 0,
  };
}

function fallbackReviews(): Review[] {
  return site.reviews.items.map((it, i) => ({
    id: `static-${i}`,
    author: it.author,
    text: it.text,
    rating: it.rating,
    imageUrl: it.img,
    published: true,
    sortOrder: i,
  }));
}

export async function getReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured) return fallbackReviews();

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return fallbackReviews();
  return (data as Row[]).map(rowToReview);
}

export async function getAllReviews(): Promise<Review[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as Row[]).map(rowToReview);
}

export async function getReview(id: string): Promise<Review | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return rowToReview(data as Row);
}
