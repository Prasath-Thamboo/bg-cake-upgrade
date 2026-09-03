import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import Configurator from "@/components/devis/Configurator";

export default function Composer() {
  return (
    <section id="composer" className="py-16">
      <Container>
        <Reveal>
          <SectionHeader
            badge="Sur-mesure"
            title="Composez votre gâteau"
            desc="Cinq étapes, un aperçu qui se met à jour en direct, et une estimation transparente. Partagez le lien ou téléchargez le devis en PDF."
          />
        </Reveal>

        <div className="mt-10">
          <Configurator />
        </div>
      </Container>
    </section>
  );
}
