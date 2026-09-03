import CreationForm from "../../../_components/CreationForm";

export default function NewCreationPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-cocoa">Nouvelle création</h1>
      <div className="mt-8">
        <CreationForm />
      </div>
    </div>
  );
}
