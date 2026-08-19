import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Schibsted_Grotesk, Gloock } from "next/font/google";

const schibstedGrotesk = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const gloock = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-gloock" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${schibstedGrotesk.variable} ${playfair.variable} ${gloock.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  );
}
