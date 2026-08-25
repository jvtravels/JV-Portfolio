import type { Metadata } from "next";
import { Playfair_Display, Schibsted_Grotesk, Gloock } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const schibstedGrotesk = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const gloock = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-gloock" });
const figura = localFont({ src: "../public/fonts/FIGURA-ExtraBold.otf", variable: "--font-figura" });
const niven = localFont({ src: "../public/Agraham.otf", variable: "--font-niven" });
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import RevealObserver from "./components/RevealObserver";
import ScrollFadeBlur from "./components/ScrollFadeBlur";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import { SITE_URL } from "./lib/site";

const TITLE = "Jay Vyas — Designer";
const DESCRIPTION = "Product design, brand identity and web design for ambitious companies.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — Jay Vyas" },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Jay Vyas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var resolved = stored === "light" || stored === "dark"
      ? stored
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibstedGrotesk.variable} ${playfair.variable} ${gloock.variable} ${figura.variable} ${niven.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <CustomCursor />
          <RevealObserver />
          <ScrollFadeBlur />
          <SmoothScroll>{children}</SmoothScroll>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
