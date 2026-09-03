-- ============================================================================
--  BG-Cake — Schéma Supabase (galerie + avis)
--  À coller dans : Supabase → SQL Editor → New query → Run
--  Ré-exécutable sans risque (IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY IF EXISTS).
-- ============================================================================

-- ---------- Helper : updated_at automatique ----------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
--  Table : gallery_items  (les créations)
-- ============================================================================
create table if not exists public.gallery_items (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text not null default '',
  tag          text not null default '',
  flavors      text[] not null default '{}',
  occasion     text,
  complexity   text,
  -- query string du configurateur (ex. "size=10-12&frosting=drip") pour « réutiliser ce design »
  config_query text,
  image_url    text,
  published    boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Ajouts si la table existe déjà d'une version précédente
alter table public.gallery_items add column if not exists complexity text;
alter table public.gallery_items add column if not exists config_query text;

drop trigger if exists trg_gallery_items_updated_at on public.gallery_items;
create trigger trg_gallery_items_updated_at
  before update on public.gallery_items
  for each row execute function public.set_updated_at();

alter table public.gallery_items enable row level security;

drop policy if exists "gallery public read" on public.gallery_items;
create policy "gallery public read" on public.gallery_items
  for select using (published = true);

drop policy if exists "gallery admin all" on public.gallery_items;
create policy "gallery admin all" on public.gallery_items
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================================
--  Table : reviews  (les avis)
-- ============================================================================
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  author      text not null,
  text        text not null,
  rating      numeric(2,1) not null default 5.0 check (rating >= 0 and rating <= 5),
  image_url   text,
  published   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_reviews_updated_at on public.reviews;
create trigger trg_reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

alter table public.reviews enable row level security;

drop policy if exists "reviews public read" on public.reviews;
create policy "reviews public read" on public.reviews
  for select using (published = true);

drop policy if exists "reviews admin all" on public.reviews;
create policy "reviews admin all" on public.reviews
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================================
--  Table : contact_messages  (demandes du formulaire de contact)
-- ============================================================================
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  event_date  text,
  servings    text,
  message     text not null,
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Aucune lecture publique. Insertion via l'action serveur (service_role).
drop policy if exists "messages admin read" on public.contact_messages;
create policy "messages admin read" on public.contact_messages
  for select using (auth.role() = 'authenticated');

drop policy if exists "messages admin update" on public.contact_messages;
create policy "messages admin update" on public.contact_messages
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================================
--  Storage : bucket public "media" (images galerie + avis)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media admin write" on storage.objects;
create policy "media admin write" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ============================================================================
--  (Optionnel) données de démarrage — décommente pour pré-remplir la galerie
-- ============================================================================
-- insert into public.gallery_items (title, description, tag, sort_order) values
--   ('Coco & fruit de la passion', 'Crème de coco • coulis passion • finition signature', 'Fruité', 0),
--   ('Framboise & chocolat blanc',  'Chocolat blanc • framboise • texture aérienne',       'Gourmand', 1);
