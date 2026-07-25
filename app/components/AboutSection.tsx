"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BEST_AT = ["Web Design", "Branding", "Product Design", "Framer Development"];
const FOR_CLIENTS = ["AI & Tech", "Web3 / Crypto", "Design Agencies", "Dev Teams"];

const FAQS = [
  { q: "What does your process look like?", a: "We start by defining scope, goals, and constraints. Then I move straight into design, share progress early, iterate quickly and ship. No long workshops, no unnecessary steps — just clear communication and fast execution." },
  { q: "What happens after I submit the form?", a: "I review your request and get back to you within a few days. If it's a good fit, we jump on a short call to confirm scope, timeline, and budget. After that, I send a proposal and we can start." },
  { q: "Do you work on branding and web together?", a: "Yes — and I prefer it that way. Brand identity and digital presence are most effective when designed as one cohesive system. I often take projects from logo and visual language through to launched website." },
  { q: "Do you offer Framer development only?", a: "No — I design and build in Framer, React, and Next.js. The tool depends on the project scope and what makes most sense for your stack." },
  { q: "Do you work solo or with a team?", a: "I work solo on most projects, which means you have a direct line to the designer doing the work. For larger builds I bring in trusted developers I've worked with before." },
  { q: "How long do projects usually take?", a: "Brand projects run 3–5 weeks. Web design projects are 4–8 weeks depending on scope. Combined brand and web engagements are typically 6–10 weeks." },
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
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.82)", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 20, fontWeight: 300, color: "rgba(255,255,255,0.4)", flexShrink: 0, marginLeft: 20, lineHeight: 1, display: "inline-block" }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.72, paddingBottom: 20, maxWidth: 560 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="process" style={{
      padding: "100px 160px",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0 80px",
      boxSizing: "border-box",
    }}>
      {/* Left */}
      <div className="reveal" style={{ display: "flex", flexDirection: "column" }}>
        <p style={{
          fontSize: "clamp(18px, 1.7vw, 24px)",
          fontWeight: 400,
          lineHeight: 1.35,
          letterSpacing: "-0.025em",
          color: "rgba(255,255,255,0.9)",
          maxWidth: 480,
          marginBottom: 32,
        }}>
          From early launches to complex products, every decision is intentional and built to support long-term impact.
        </p>
        <a href="mailto:vyasjay85@gmail.com" style={{
          display: "inline-block",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#fff",
          background: "#ff623b",
          padding: "11px 20px",
          borderRadius: 2,
          alignSelf: "flex-start",
          transition: "background 0.2s ease",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e8502c")}
          onMouseLeave={e => (e.currentTarget.style.background = "#ff623b")}
        >
          Start a project
        </a>
      </div>

      {/* Right */}
      <div className="reveal reveal-delay-1">
        {/* Best at */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff623b", marginBottom: 16 }}>
            Best At
          </div>
          <ul style={{ listStyle: "none" }}>
            {BEST_AT.map(s => (
              <li key={s} style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", letterSpacing: "-0.01em", lineHeight: 2 }}>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Clients */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff623b", marginBottom: 16 }}>
            Clients
          </div>
          <ul style={{ listStyle: "none" }}>
            {FOR_CLIENTS.map(s => (
              <li key={s} style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", letterSpacing: "-0.01em", lineHeight: 2 }}>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* The Approach / FAQ */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff623b", marginBottom: 8 }}>
            The Approach
          </div>
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
        </div>
      </div>
    </section>
  );
}
