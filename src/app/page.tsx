import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Pricing from "@/components/sections/Pricing";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <Hero />
        <Gallery />
        <Pricing />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
