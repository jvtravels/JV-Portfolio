"use client";

import { useEffect, useState } from "react";
import GradualBlur from "./GradualBlur";

const FADE_DISTANCE = 160;
// Also fade the mask in as the user leaves the top of the page, so it
// doesn't sit permanently over the hero before any scrolling happens.
const TOP_FADE_DISTANCE = 200;

export default function ScrollFadeBlur() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      const bottomOpacity = Math.min(1, Math.max(0, distanceFromBottom / FADE_DISTANCE));
      const topOpacity = Math.min(1, Math.max(0, window.scrollY / TOP_FADE_DISTANCE));
      setOpacity(Math.min(bottomOpacity, topOpacity));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <GradualBlur
      position="bottom"
      strength={1}
      divCount={3}
      height="10rem"
      zIndex={9999}
      opacity={opacity}
      style={{ position: "fixed", bottom: 0 }}
    />
  );
}
