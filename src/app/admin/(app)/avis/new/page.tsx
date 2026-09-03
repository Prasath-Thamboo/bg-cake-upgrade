import ReviewForm from "../../../_components/ReviewForm";

export default function NewReviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-cocoa">Nouvel avis</h1>
      <div className="mt-8">
        <ReviewForm />
      </div>
    </div>
  );
}
