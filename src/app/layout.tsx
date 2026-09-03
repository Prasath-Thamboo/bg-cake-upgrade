import type { Metadata } from "next";
import "./globals.css";
import { Spectral, Hanken_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";

/* Serif d'affichage — porte l'identité premium (titres, chiffres-clés) */
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

/* Sans humaniste — texte courant et interface */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BG-Cake — Layer cakes haut de gamme",
    template: "%s · BG-Cake",
  },
  description:
    "Gâteaux artisanaux premium, conçus sur-mesure pour vos événements les plus importants.",
  icons: { icon: "/image/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${spectral.variable} ${hanken.variable} scroll-smooth`}
    >
      <body className="bg-bg text-cocoa font-sans antialiased">
        <SmoothScroll />
        <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_-5%,rgba(224,214,179,0.55),transparent),radial-gradient(1000px_520px_at_85%_0%,rgba(201,168,111,0.32),transparent)]">
          {children}
        </div>
      </body>
    </html>
  );
}
