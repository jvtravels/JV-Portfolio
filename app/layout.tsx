import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import RevealObserver from "./components/RevealObserver";
import GradualBlur from "./components/GradualBlur";

export const metadata: Metadata = {
  title: "Jay Vyas — Designer",
  description: "Product design, brand identity and web design for ambitious companies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${playfair.variable}`}>
      <body>
        <CustomCursor />
        <RevealObserver />
        <GradualBlur
          position="bottom"
          strength={1}
          divCount={3}
          height="10rem"
          zIndex={9999}
          style={{ position: "fixed", bottom: 0 }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
