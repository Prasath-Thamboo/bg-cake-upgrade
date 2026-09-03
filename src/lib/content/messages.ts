import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  eventDate: string | null;
  servings: string | null;
  message: string;
  handled: boolean;
  createdAt: string;
};

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  event_date: string | null;
  servings: string | null;
  message: string;
  handled: boolean;
  created_at: string;
};

function toMessage(r: Row): ContactMessage {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    eventDate: r.event_date,
    servings: r.servings,
    message: r.message,
    handled: r.handled,
    createdAt: r.created_at,
  };
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error || !data) return [];
  return (data as Row[]).map(toMessage);
}
