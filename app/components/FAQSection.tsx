"use client";

import { useState } from "react";
import { FAQS } from "@/app/data/faqs";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

function FAQRow({
  faq,
  isOpen,
  onToggle,
  showIllustration,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
  showIllustration?: boolean;
}) {
  return (
    <div style={{
      position: "relative",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 16,
    }}>
      {showIllustration && (
        <img
          src="/faq.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "100%",
            left: 24,
            width: 150,
            height: "auto",
            // Flush against the card's top edge — no negative margin, so the
            // character rests exactly on the border instead of clipping into
            // the card or floating with a gap above it.
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      )}
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
        <div style={{ padding: "0 24px 22px", maxWidth: 640 }}>
          {faq.answer.split("\n\n").map((paragraph, i) => (
            <p key={i} style={{
              margin: i === 0 ? 0 : "12px 0 0",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--text-muted)",
            }}>
              {paragraph}
            </p>
          ))}
        </div>
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
            marginBottom: 16,
          }}>
            FAQ
          </span>
          <h2 className="reveal" style={{
            textAlign: "center",
            fontSize: "clamp(24px, 7vw, 32px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.75,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 640,
          }}>
            Curious about how I work?
          </h2>

          <div
            className="reveal"
            style={{
              maxWidth: 820,
              marginTop: 128,
              marginLeft: "auto",
              marginRight: "auto",
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
                showIllustration={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
