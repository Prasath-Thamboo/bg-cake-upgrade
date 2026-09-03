import Link from "next/link";
import { saveReview } from "../actions";
import type { Review } from "@/lib/content/types";
import { TextField, TextAreaField, CheckboxField } from "./Field";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";

export default function ReviewForm({ review }: { review?: Review }) {
  return (
    <form action={saveReview} className="card-strong space-y-6 p-6 md:p-8">
      {review ? <input type="hidden" name="id" value={review.id} /> : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Auteur"
          name="author"
          required
          defaultValue={review?.author}
          placeholder="Virginie"
        />
        <TextField
          label="Note"
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          defaultValue={review?.rating ?? 5}
        />
      </div>

      <TextAreaField
        label="Avis"
        name="text"
        required
        defaultValue={review?.text}
        placeholder="Un gâteau magnifique et délicieux, merci !"
      />

      <ImageField
        initialUrl={review?.imageUrl ?? ""}
        label="Photo (optionnelle)"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Ordre d'affichage"
          name="sort_order"
          type="number"
          defaultValue={review?.sortOrder ?? 0}
          hint="Plus petit = affiché en premier"
        />
        <div className="flex items-end pb-3">
          <CheckboxField
            label="Visible sur le site"
            name="published"
            defaultChecked={review ? review.published : true}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <SubmitButton>{review ? "Enregistrer" : "Ajouter"}</SubmitButton>
        <Link
          href="/admin/avis"
          className="text-sm font-semibold text-cocoa-soft hover:text-cocoa"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
