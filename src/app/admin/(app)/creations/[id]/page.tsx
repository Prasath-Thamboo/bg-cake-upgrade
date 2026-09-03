import { notFound } from "next/navigation";
import { getGalleryItem } from "@/lib/content/gallery";
import CreationForm from "../../../_components/CreationForm";

export const dynamic = "force-dynamic";

export default async function EditCreationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getGalleryItem(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-3xl font-semibold text-cocoa">Modifier la création</h1>
      <div className="mt-8">
        <CreationForm item={item} />
      </div>
    </div>
  );
}
