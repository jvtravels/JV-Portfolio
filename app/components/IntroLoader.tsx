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
      const t = setTimeout(() => setGone(true), 1000);
      return () => clearTimeout(t);
    }
  }, [index]);

  if (!mounted || gone) return null;

  return (
    <motion.div
      animate={{ y: leaving ? "-100%" : "0%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: leaving ? "none" : "all",
      }}
    >
      <motion.div
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
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
                color: "var(--accent-hover)",
                userSelect: "none",
                fontFamily: "inherit",
              }}
            >
              {WORDS[index]}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom seam: brand duotone rule, only appears once the word cycle ends, then unzips apart to lead the shutter's exit */}
      {leaving && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, display: "flex" }}>
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "50%", height: "100%", background: "#780116" }}
          />
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "50%", height: "100%", background: "#f7b538" }}
          />
        </div>
      )}
    </motion.div>
  );
}
