import IntroLoader from "./components/IntroLoader";
import Nav from "./components/Nav";
import Noise from "./components/Noise";
import Hero from "./components/Hero";
import WorkSection from "./components/WorkSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BioSection from "./components/BioSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <Noise patternSize={200} patternRefreshInterval={2} patternAlpha={22} />
      <Nav />
      <Hero />
      <WorkSection />
      <TestimonialsSection />
      <BioSection />
      <Footer />
    </>
  );
}
