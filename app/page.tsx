import IntroLoader from "./components/IntroLoader";
import Nav from "./components/Nav";
import Noise from "./components/Noise";
import Hero from "./components/Hero";
import WorkSection from "./components/WorkSection";
import AboutMeSection from "./components/AboutMeSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ProcessSection from "./components/ProcessSection";
import ArticlesSection from "./components/ArticlesSection";
import GallerySection from "./components/GallerySection";
import FAQSection from "./components/FAQSection";
import BrandsSection from "./components/BrandsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <Noise patternSize={200} patternRefreshInterval={2} patternAlpha={22} />
      <Nav />
      <main id="main-content">
        <Hero />
        <BrandsSection />
        <WorkSection />
        <AboutMeSection />
        <TestimonialsSection />
        <ProcessSection />
        <ArticlesSection />
        <GallerySection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
