import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import type { GalleryItem, GalleryMedia } from "./types";

/**
 * Gâteaux réalisés, lus depuis public/image/gateaux/.
 *
 *   public/image/gateaux/
 *     01-fraisier-anniversaire/      ← un dossier = un gâteau
 *       photo1.jpg, photo2.jpg, video.mp4 …
 *       infos.json                   ← facultatif (titre, description…)
 *
 * - L'ordre des gâteaux suit le nom des dossiers (préfixe « 01- », « 02- »…),
 *   ou le champ « ordre » d'infos.json.
 * - L'ordre des médias suit le nom des fichiers. Un fichier nommé
 *   « cover.jpg » (ou « couverture.jpg ») devient la photo de couverture.
 * - Une image portant le même nom qu'une vidéo (video.mp4 + video.jpg)
 *   sert aussi d'aperçu à cette vidéo.
 */

const ROOT_URL = "/image/gateaux";
const ROOT_DIR = path.join(process.cwd(), "public", "image", "gateaux");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);

type Infos = {
  titre?: string;
  title?: string;
  description?: string;
  tag?: string;
  etiquette?: string;
  occasion?: string;
  complexite?: string;
  saveurs?: string[];
  flavors?: string[];
  ordre?: number;
  order?: number;
  masquer?: boolean;
};

const collator = new Intl.Collator("fr", { numeric: true, sensitivity: "base" });

/** « 03-fraisier_anniversaire » ou « HusbandDad » → « Fraisier anniversaire », « Husband dad » */
function titleFromFolder(name: string) {
  const t = name
    .replace(/^\d+[\s._-]*/, "")
    .replace(/[_-]+/g, " ")
    .replace(/([a-zà-ÿ])([A-Z])/g, "$1 $2") // « HusbandDad » → « Husband Dad »
    .trim()
    .toLowerCase();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : name;
}

function url(folder: string, file: string) {
  return `${ROOT_URL}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

const isCover = (file: string) => /^(cover|couverture)\./i.test(file);

/** noms « techniques » : en cas de doublon, on garde plutôt l'autre nom */
const isGenericName = (file: string) => /^(gemini|screenshot|capture|img_|vid_)/i.test(file);

/**
 * Retire les fichiers en double (même contenu sous deux noms différents).
 * Garde de préférence le fichier au nom « parlant ».
 */
async function dedupe(dir: string, files: string[]) {
  const bySize = new Map<number, string[]>();
  for (const f of files) {
    const { size } = await fs.stat(path.join(dir, f));
    bySize.set(size, [...(bySize.get(size) ?? []), f]);
  }
  const drop = new Set<string>();
  for (const group of bySize.values()) {
    if (group.length < 2) continue;
    const byHash = new Map<string, string[]>();
    for (const f of group) {
      const h = createHash("md5").update(await fs.readFile(path.join(dir, f))).digest("hex");
      byHash.set(h, [...(byHash.get(h) ?? []), f]);
    }
    for (const same of byHash.values()) {
      const keep = same.find((f) => !isGenericName(f)) ?? same[0];
      same.filter((f) => f !== keep).forEach((f) => drop.add(f));
    }
  }
  return files.filter((f) => !drop.has(f));
}

async function readInfos(dir: string): Promise<Infos> {
  for (const name of ["infos.json", "info.json"]) {
    try {
      return JSON.parse(await fs.readFile(path.join(dir, name), "utf-8")) as Infos;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") {
        console.warn(`[galerie] ${name} illisible dans ${dir} :`, (e as Error).message);
      }
    }
  }
  return {};
}

async function readCake(folder: string): Promise<(GalleryItem & { _order: number }) | null> {
  const dir = path.join(ROOT_DIR, folder);
  const ext = (f: string) => path.extname(f).toLowerCase();
  const files = await dedupe(
    dir,
    (await fs.readdir(dir, { withFileTypes: true }))
      .filter((f) => f.isFile() && (IMAGE_EXT.has(ext(f.name)) || VIDEO_EXT.has(ext(f.name))))
      .map((f) => f.name)
      .sort(collator.compare),
  );

  const base = (f: string) => path.basename(f, path.extname(f)).toLowerCase();

  const videos = files.filter((f) => VIDEO_EXT.has(ext(f)));
  const videoBases = new Set(videos.map(base));
  const posters = new Map<string, string>();
  const images: string[] = [];

  for (const f of files.filter((f) => IMAGE_EXT.has(ext(f)))) {
    // même nom qu'une vidéo : sert d'aperçu ET reste dans les photos
    if (videoBases.has(base(f)) && !posters.has(base(f))) posters.set(base(f), f);
    images.push(f);
  }
  // la couverture passe en premier
  images.sort((a, b) => Number(isCover(b)) - Number(isCover(a)));

  const media: GalleryMedia[] = [
    ...images.map((f) => ({ type: "image" as const, src: url(folder, f) })),
    ...videos.map((f) => {
      const p = posters.get(base(f));
      return { type: "video" as const, src: url(folder, f), poster: p ? url(folder, p) : undefined };
    }),
  ];
  if (media.length === 0) return null;

  const infos = await readInfos(dir);
  if (infos.masquer) return null;

  const prefix = folder.match(/^(\d+)/);
  const cover = media.find((m) => m.type === "image")?.src ?? media.find((m) => m.poster)?.poster ?? "";

  return {
    id: `local-${folder}`,
    title: infos.titre ?? infos.title ?? titleFromFolder(folder),
    description: infos.description ?? "",
    tag: infos.tag ?? infos.etiquette ?? "",
    flavors: infos.saveurs ?? infos.flavors ?? [],
    occasion: infos.occasion ?? null,
    complexity: infos.complexite ?? null,
    configQuery: null,
    imageUrl: cover,
    media,
    published: true,
    sortOrder: 0,
    _order: infos.ordre ?? infos.order ?? (prefix ? Number(prefix[1]) : Number.MAX_SAFE_INTEGER),
  };
}

export async function getLocalCakes(): Promise<GalleryItem[]> {
  let folders: string[];
  try {
    folders = (await fs.readdir(ROOT_DIR, { withFileTypes: true }))
      .filter((d) => d.isDirectory() && !d.name.startsWith("."))
      .map((d) => d.name);
  } catch {
    return [];
  }

  const cakes = (await Promise.all(folders.map(readCake))).filter(
    (c): c is NonNullable<typeof c> => c !== null,
  );

  cakes.sort((a, b) => a._order - b._order || collator.compare(a.id, b.id));
  return cakes.map((c, i) => {
    const { _order: _, ...item } = c;
    void _;
    return { ...item, sortOrder: i };
  });
}
