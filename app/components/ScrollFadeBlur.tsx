"use client";

import { useEffect, useState } from "react";
import GradualBlur from "./GradualBlur";

const FADE_DISTANCE = 160;

export default function ScrollFadeBlur() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setOpacity(Math.min(1, Math.max(0, distanceFromBottom / FADE_DISTANCE)));
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
