"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    q: "What does your process look like?",
    a: "I start by understanding the business goal and user context, then move straight into design. I share progress early and often, iterate quickly based on feedback, and ship. No unnecessary workshops or drawn-out phases — just clear communication and focused work.",
  },
  {
    q: "What happens after I reach out?",
    a: "I'll respond within 24 hours to schedule a short call. We'll align on scope, timeline, and budget. If it's a good fit, I send a brief proposal and we get started.",
  },
  {
    q: "Do you work on branding and web together?",
    a: "Yes — and I prefer it that way. Brand identity and digital presence are most effective when designed as one cohesive system. I often take projects from logo and visual language through to launched website.",
  },
  {
    q: "Do you work solo or with a team?",
    a: "I work solo on most projects, which means you have a direct line to the designer doing the work. For larger builds I bring in trusted developers I've worked with before.",
  },
  {
    q: "How long do projects typically take?",
    a: "Brand projects run 3–5 weeks. Web design projects are 4–8 weeks depending on scope. Combined brand and web engagements are typically 6–10 weeks.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontSize: 16,
          fontWeight: 400,
          color: "rgba(255,255,255,0.82)",
          letterSpacing: "-0.015em",
          lineHeight: 1.3,
        }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            flexShrink: 0,
            marginLeft: 24,
            lineHeight: 1,
            display: "inline-block",
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: 14,
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.72,
              letterSpacing: "-0.01em",
              paddingBottom: 22,
              maxWidth: 680,
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section style={{
      padding: "100px 120px",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      boxSizing: "border-box",
    }}>
      {/* Left */}
      <div>
        <div style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#ff623b",
          marginBottom: 24,
        }}>
          The Approach
        </div>
        <p style={{
          fontSize: "clamp(22px, 2vw, 30px)",
          fontWeight: 400,
          lineHeight: 1.35,
          letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.85)",
          maxWidth: 400,
        }}>
          Clear scope. Fast iteration. Work that ships.
        </p>
      </div>

      {/* Right: accordion */}
      <div>
        {FAQS.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} />
        ))}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
      </div>
    </section>
  );
}
