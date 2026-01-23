import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BG-Cake",
  description: "Gâteaux artisanaux premium pour vos événements",
  icons: { icon: "/image/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${poppins.className} antialiased bg-bg text-cocoa`}>
        <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(225,198,153,0.65),transparent),radial-gradient(900px_500px_at_80%_10%,rgba(200,173,127,0.55),transparent)]">
          {children}
        </div>
      </body>
    </html>
  );
}
