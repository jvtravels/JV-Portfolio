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
  // Skip in canvas/iframe context so the Tempo storyboard viewport doesn't time out
  const [gone, setGone] = useState(() =>
    typeof window !== "undefined" && window.self !== window.top
  );

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (index < WORDS.length) {
      const t = setTimeout(() => setIndex(i => i + 1), WORD_DURATION);
      return () => clearTimeout(t);
    } else {
      setLeaving(true);
      const t = setTimeout(() => setGone(true), 600);
      return () => clearTimeout(t);
    }
  }, [index]);

  if (!mounted || gone) return null;

  return (
    <motion.div
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: leaving ? "none" : "all",
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
              color: "#ff623b",
              userSelect: "none",
              fontFamily: "inherit",
            }}
          >
            {WORDS[index]}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
