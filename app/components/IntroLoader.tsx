"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "HELLO",
  "HOLA",
  "नमस्ते",
  "BONJOUR",
  "こんにちは",
  "CIAO",
];

const WORD_DURATION = 560;
const BAND_COUNT = 9;
const BAND_DURATION = 0.5;
const BAND_STAGGER = 0.045;
const EXIT_MS = (BAND_COUNT - 1) * BAND_STAGGER * 1000 + BAND_DURATION * 1000;

export default function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // Skip in canvas/iframe context (Tempo storyboard viewport) and for users who prefer reduced motion
  const [gone, setGone] = useState(() =>
    typeof window !== "undefined" &&
    (window.self !== window.top || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  );

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (index < WORDS.length) {
      const t = setTimeout(() => setIndex(i => i + 1), WORD_DURATION);
      return () => clearTimeout(t);
    } else {
      setLeaving(true);
      const t = setTimeout(() => setGone(true), EXIT_MS + 80);
      return () => clearTimeout(t);
    }
  }, [index]);

  if (!mounted || gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        pointerEvents: leaving ? "none" : "all",
      }}
    >
      {Array.from({ length: BAND_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: leaving ? 0 : 1 }}
          transition={{
            duration: BAND_DURATION,
            ease: [0.16, 1, 0.3, 1],
            delay: leaving ? i * BAND_STAGGER : 0,
          }}
          style={{
            flex: 1,
            background: "#f7b538",
            transformOrigin: "top",
          }}
        />
      ))}

      <motion.div
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {index < WORDS.length && (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: /[ऀ-ॿ　-鿿゠-ヿ]/.test(WORDS[index]) ? "0" : "0.18em",
                color: "#780116",
                userSelect: "none",
                fontFamily: "inherit",
              }}
            >
              {WORDS[index]}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
