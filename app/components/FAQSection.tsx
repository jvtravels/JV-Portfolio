"use client";

import { useState } from "react";
import { FAQS } from "@/app/data/faqs";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

function FAQRow({ faq, isOpen, onToggle }: { faq: (typeof FAQS)[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 16,
    }}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "20px 24px",
          background: "transparent",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span style={{
          fontSize: 17,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--text)",
        }}>
          {faq.question}
        </span>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "var(--surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? 400 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <p style={{
          margin: 0,
          padding: "0 24px 22px",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--text-muted)",
          maxWidth: 640,
        }}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq">
      <div className="section-py" style={{ position: "relative" }}>
        <DashedH style={{ bottom: 0, left: 0, right: 0 }} />
        <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
        <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />

        <div className="section-px">
          <span style={{
            display: "block",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 12,
          }}>
            FAQ
          </span>
          <h2 className="reveal" style={{
            textAlign: "center",
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.25,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 640,
          }}>
            Frequently asked questions
          </h2>

          <div
            className="reveal"
            style={{
              maxWidth: 720,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {FAQS.map((faq, i) => (
              <FAQRow
                key={faq.question}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
