"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bootPathname } from "./PageTransition";

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

// Module-scoped (not sessionStorage) so it resets on every real page load/reload
// but stays true across client-side route changes back to "/" within the same
// JS session (e.g. clicking Back from /work) — the intro should replay on an
// actual reload, just not on an in-app navigation back to the homepage.
let hasPlayedThisSession = false;

export default function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [blindsOpen, setBlindsOpen] = useState(false);
  const [yellowOpen, setYellowOpen] = useState(false);
  // Skip in canvas/iframe context (Tempo storyboard viewport), for users who prefer
  // reduced motion, on repeat in-app visits to the homepage, and when the site was
  // entered on some other page and only routed to "/" via client-side nav (e.g. the
  // Back link from /work) — that should show just the curtain, not the intro replay.
  const [gone, setGone] = useState(() =>
    typeof window !== "undefined" &&
    (window.self !== window.top ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      hasPlayedThisSession ||
      bootPathname !== "/")
  );

  const wordsDone = index >= WORDS.length;

  useEffect(() => { setMounted(true); }, []);

  // Skip case (reduced motion / iframe): content is visible immediately,
  // so tell the page to reveal right away instead of waiting on the blinds.
  useEffect(() => {
    if (gone) window.dispatchEvent(new Event("intro-reveal"));
  }, [gone]);

  useEffect(() => {
    if (!wordsDone) {
      const t = setTimeout(() => setIndex(i => i + 1), WORD_DURATION);
      return () => clearTimeout(t);
    } else {
      setBlindsOpen(true);
      // The hero underneath only actually becomes visible once the yellow
      // bands start their final opening sweep — kick off its text-fill
      // animation then, not when the first blinds start (still covered).
      const revealTimer = setTimeout(
        () => window.dispatchEvent(new Event("intro-reveal")),
        SWEEP_MS + YELLOW_HOLD_MS
      );
      const yellowTimer = setTimeout(() => setYellowOpen(true), SWEEP_MS + YELLOW_HOLD_MS);
      const goneTimer = setTimeout(() => {
        hasPlayedThisSession = true;
        setGone(true);
      }, SWEEP_MS + YELLOW_HOLD_MS + SWEEP_MS + 60);
      return () => { clearTimeout(revealTimer); clearTimeout(yellowTimer); clearTimeout(goneTimer); };
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
