import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Pricing from "@/components/sections/Pricing";
import Reviews from "@/components/sections/Reviews";
import Composer from "@/components/sections/Composer";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Gallery />
        <Composer />
        <Pricing />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
