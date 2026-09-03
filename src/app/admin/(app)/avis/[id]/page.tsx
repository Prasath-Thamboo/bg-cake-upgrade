import { notFound } from "next/navigation";
import { getReview } from "@/lib/content/reviews";
import ReviewForm from "../../../_components/ReviewForm";

export const dynamic = "force-dynamic";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await getReview(id);
  if (!review) notFound();

  return (
    <div>
      <h1 className="text-3xl font-semibold text-cocoa">Modifier l&apos;avis</h1>
      <div className="mt-8">
        <ReviewForm review={review} />
      </div>
    </div>
  );
}
