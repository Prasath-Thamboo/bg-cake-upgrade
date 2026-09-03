import Link from "next/link";
import { saveCreation } from "../actions";
import type { GalleryItem } from "@/lib/content/types";
import { TextField, TextAreaField, CheckboxField } from "./Field";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";

export default function CreationForm({ item }: { item?: GalleryItem }) {
  return (
    <form action={saveCreation} className="card-strong space-y-6 p-6 md:p-8">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <TextField
        label="Titre"
        name="title"
        required
        defaultValue={item?.title}
        placeholder="Framboise & chocolat blanc"
      />

      <TextAreaField
        label="Description"
        name="description"
        defaultValue={item?.description}
        placeholder="Chocolat blanc • framboise • texture aérienne"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Étiquette"
          name="tag"
          defaultValue={item?.tag}
          hint="Mot affiché sur la vignette (ex. Gourmand)"
        />
        <TextField
          label="Occasion"
          name="occasion"
          defaultValue={item?.occasion ?? ""}
          hint="Anniversaire, mariage, baptême…"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Complexité"
          name="complexity"
          defaultValue={item?.complexity ?? ""}
          hint="Ex. Simple, Élaboré, Signature"
        />
        <TextField
          label="Saveurs"
          name="flavors"
          defaultValue={item?.flavors.join(", ")}
          hint="Séparées par des virgules"
        />
      </div>

      <TextField
        label="Lien du design (configurateur)"
        name="config_query"
        defaultValue={item?.configQuery ?? ""}
        hint="Colle le lien « Copier le lien de ce design » — active « Réutiliser ce design »"
      />

      <ImageField initialUrl={item?.imageUrl ?? ""} label="Photo de la création" />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Ordre d'affichage"
          name="sort_order"
          type="number"
          defaultValue={item?.sortOrder ?? 0}
          hint="Plus petit = affiché en premier"
        />
        <div className="flex items-end pb-3">
          <CheckboxField
            label="Visible sur le site"
            name="published"
            defaultChecked={item ? item.published : true}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <SubmitButton>{item ? "Enregistrer" : "Créer"}</SubmitButton>
        <Link
          href="/admin/creations"
          className="text-sm font-semibold text-cocoa-soft hover:text-cocoa"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
