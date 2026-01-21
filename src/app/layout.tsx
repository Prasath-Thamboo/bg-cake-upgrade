import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "BG cake",
  description: "BG cake - gâteaux pour vos événements",
  icons: {
    icon: "/image/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
