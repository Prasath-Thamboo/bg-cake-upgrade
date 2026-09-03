export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  /** étiquette courte affichée sur la vignette (ex. « Fruité ») */
  tag: string;
  /** saveurs, pour le futur filtrage */
  flavors: string[];
  /** occasion (anniversaire, mariage, baptême…) */
  occasion: string | null;
  /** niveau de complexité (Simple, Élaboré, Signature…) */
  complexity: string | null;
  /** query string du configurateur pour « réutiliser ce design » */
  configQuery: string | null;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
};

export type Review = {
  id: string;
  author: string;
  text: string;
  rating: number;
  imageUrl: string | null;
  published: boolean;
  sortOrder: number;
};
