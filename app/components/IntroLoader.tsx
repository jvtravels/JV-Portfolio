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
const YELLOW_HOLD_MS = 300;
const SWEEP_MS = (BAND_COUNT - 1) * BAND_STAGGER * 1000 + BAND_DURATION * 1000;

export default function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [blindsOpen, setBlindsOpen] = useState(false);
  const [yellowOpen, setYellowOpen] = useState(false);
  // Skip in canvas/iframe context (Tempo storyboard viewport) and for users who prefer reduced motion
  const [gone, setGone] = useState(() =>
    typeof window !== "undefined" &&
    (window.self !== window.top || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  );

  const wordsDone = index >= WORDS.length;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!wordsDone) {
      const t = setTimeout(() => setIndex(i => i + 1), WORD_DURATION);
      return () => clearTimeout(t);
    } else {
      setBlindsOpen(true);
      const yellowTimer = setTimeout(() => setYellowOpen(true), SWEEP_MS + YELLOW_HOLD_MS);
      const goneTimer = setTimeout(() => setGone(true), SWEEP_MS + YELLOW_HOLD_MS + SWEEP_MS + 60);
      return () => { clearTimeout(yellowTimer); clearTimeout(goneTimer); };
    }
  }, [index, wordsDone]);

  if (!mounted || gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        pointerEvents: wordsDone ? "none" : "all",
      }}
    >
      {wordsDone &&
        Array.from({ length: BAND_COUNT }).map((_, i) => (
          <motion.div
            key={`yellow-${i}`}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: yellowOpen ? 0 : 1 }}
            transition={{
              duration: BAND_DURATION,
              ease: [0.16, 1, 0.3, 1],
              delay: (BAND_COUNT - 1 - i) * BAND_STAGGER,
            }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${(i * 100) / BAND_COUNT}%`,
              height: `${100 / BAND_COUNT}%`,
              background: "var(--accent-hover)",
              transformOrigin: "bottom",
              zIndex: -1,
            }}
          />
        ))}

      {Array.from({ length: BAND_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: blindsOpen ? 0 : 1 }}
          transition={{
            duration: BAND_DURATION,
            ease: [0.16, 1, 0.3, 1],
            delay: i * BAND_STAGGER,
          }}
          style={{
            flex: 1,
            position: "relative",
            background: "var(--bg)",
            transformOrigin: "top",
          }}
        />
      ))}

      <motion.div
        animate={{ opacity: wordsDone ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
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
    </div>
  );
}
