import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI CV Builder",
  description: "Generiraj i analiziraj CV pomoću umjetne inteligencije",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={`${geist.className} bg-gray-950`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}