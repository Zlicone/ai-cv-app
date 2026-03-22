import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AI CV Builder",
  description: "Generiraj i analiziraj CV pomoću umjetne inteligencije",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}