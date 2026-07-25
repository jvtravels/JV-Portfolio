"use client";

import { useState } from "react";

const FEATURED = {
  quoteDim: "“Jay is that rare design wizard every startup dreams of. You know that joke that all you need to build a great company is one extremely technical person, one overly charismatic chaos founder, and one insanely talented designer? Jay is that designer. ",
  quoteWhite: "Taste for days, pushes ideas way further than you thought they could go, and makes everything feel premium. Our site would not be our site without him. Absolute weapon.”",
  name: "Charlie Brizz",
  role: "Founder at Tractorbeam",
};

const TESTIMONIALS = [
  {
    quote: "Jay is as much an artist as he is a web designer. He was able to communicate authority, attention to detail, a clean user experience, and clarity.",
    highlight: "Anyone who lands on this page will now expect these characteristics from us; which creates the frame for us to offer premium services.",
    name: "Ben Smith",
    role: "Founder at Live Aura",
    initials: "BS",
  },
  {
    quote: "Jay was very creative and dependable in helping us establish a new brand identity and website for Calldesk.",
    highlight: "He worked fast, was extremely adaptive and we could reach him for any quick iterations needed.",
    name: "Marco van Bree",
    role: "CMO at Calldesk",
    initials: "MV",
  },
  {
    quote: "Jay was refreshing to work with, he integrated well into our landing page work, emulating the style I had already set perfectly.",
    highlight: "",
    name: "Daryl Ginn",
    role: "Founder at Endless",
    initials: "DG",
  },
  {
    quote: "Working with Jay over the last few months has been a blast. He’s quick, responsive and very collaborative.",
    highlight: "He always listens and understands what the client is looking for and explores all possibilities to make sure the client is satisfied. 10/10 recommend working with him — if you don’t, then more for me!",
    name: "Vimalan Vijayasekaran",
    role: "CEO at ViDesigns",
    initials: "VV",
  },
  {
    quote: "Jay designed our new site and absolutely nailed it.",
    highlight: "He brought great ideas to the table and was super easy to work with throughout the process. Would definitely work with him again!",
    name: "Tom Wolting",
    role: "Founder at Cypher",
    initials: "TW",
  },
  {
    quote: "Jay was an incredible partner.",
    highlight: "He worked efficiently and thoughtfully to help us recreate our website, was responsive and collaborative, and produced excellent work at a fraction of the cost and time.",
    name: "Ben Simon",
    role: "CEO at Axilon",
    initials: "BS",
  },
];

const SVG = (id: string, w: number, h: number) => ({
  src: `https://framerusercontent.com/images/${id}.svg`,
  w,
  h,
});

const LOGO_ROWS = [
  [
    SVG("NY8apwhg1QeGt0ITEmbp7xZ6dg", 93, 16),
    SVG("lGsVtyi9VEIeKNI32rTA33oUk3I", 93, 18),
    SVG("v5pW9rsnt4388mPWKmr4GdSRAI", 93, 14),
    SVG("rhlOEwI2RLOdGw9TtNJ7KowM", 60, 16),
    SVG("Rh6HoUp1jbkVF16IatAwjBb6w", 87, 18),
    SVG("jWFXBl7NVBC4XIfqaj6zVtNSP0", 97, 22),
  ],
  [
    SVG("obiHjrbqdtQRXLyjxxZULdb1zs", 94, 20),
    SVG("5MOXQ5kplb0JGBW6dF89baCP4", 127, 20),
    SVG("RPBuUa0R9IRImlXrMYVOlK1cmQ", 114, 16),
    SVG("c1TsRfZqGaDgTdKp4N0JoUIvSaY", 92, 17),
    SVG("LQlcP9cpvC1JVbGNFCIFmbuw9M", 58, 14),
    SVG("hvjQEO9dzLPiHmCVxqk53pQEw", 60, 16),
    SVG("tocUwvDeww9TrJ8aRbFOm6lTX4", 108, 14),
  ],
  [
    SVG("CbHZ4UOIeRzPQ1kcMSVtVsdJw9Y", 37, 40),
    SVG("WX3x2SSDYgWYfbSBQyPpXYU7CM", 63, 16),
    SVG("mWgTrnsyDfcYtDgQjtroKcrg030", 33, 22),
    SVG("MMQQCivoE7nSIMNk2ruqAzUHs", 37, 18),
    SVG("3qythHmDzlvowUTWAcESlw8EIlI", 40, 22),
    SVG("xAgJ9wGWE13wFusaW5Lhl0mk3Q", 79, 20),
    SVG("592ViBp5VH4iBwvkjhvE4M8dfPk", 50, 14),
  ],
];

const CARDS_VISIBLE = 3;
const MAX_INDEX = Math.max(0, TESTIMONIALS.length - CARDS_VISIBLE);

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(MAX_INDEX, i + 1));

  return (
    <section id="testimonials" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>

      {/* Featured testimonial */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        gap: 80,
        padding: "80px 160px",
        alignItems: "center",
      }}>
        <div>
          <h2 style={{
            fontSize: 19,
            fontWeight: 400,
            lineHeight: "1.35",
            letterSpacing: "-0.02em",
            margin: "0 0 32px",
          }}>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{FEATURED.quoteDim}</span>
            <span style={{ color: "#fff" }}>{FEATURED.quoteWhite}</span>
          </h2>
          <div>
            <p style={{ fontSize: 13, color: "#fff", fontWeight: 400, lineHeight: 1.35, letterSpacing: "-0.01em" }}>
              {FEATURED.name}
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 400, lineHeight: 1.35, letterSpacing: "-0.01em" }}>
              {FEATURED.role}
            </p>
          </div>
        </div>

        {/* Orange photo panel */}
        <div style={{
          background: "#ff623b",
          borderRadius: 20,
          position: "relative",
          overflow: "hidden",
          height: 380,
          flexShrink: 0,
        }}>
          <img
            src="https://framerusercontent.com/images/7LUK49pz7DKreXqx0HiySvOgNk.png"
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              zIndex: 1,
            }}
          />
          <div style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                <path d="M1 0.5L7.5 4.5L1 8.5V0.5Z" fill="white" />
              </svg>
            </div>
            <span style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#fff",
            }}>
              PLAY VIDEO
            </span>
          </div>
        </div>
      </div>

      {/* Words from Founders carousel */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 16,
          padding: "28px 160px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <span style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}>
            Words from Founders
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { ch: "<", action: prev, disabled: index === 0 },
              { ch: ">", action: next, disabled: index === MAX_INDEX },
            ].map(({ ch, action, disabled }) => (
              <button
                key={ch}
                onClick={action}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "none",
                  color: disabled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.55)",
                  fontSize: 14,
                  cursor: disabled ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${TESTIMONIALS.length}, calc(100% / ${CARDS_VISIBLE}))`,
              transform: `translateX(calc(-${index} * (100% / ${CARDS_VISIBLE})))`,
              transition: "transform 0.55s cubic-bezier(0.44, 0, 0.56, 1)",
              willChange: "transform",
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  padding: "40px 40px 60px",
                }}
              >
                {t.quote && (
                  <p style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.7,
                    letterSpacing: "-0.01em",
                    marginBottom: t.highlight ? 12 : 28,
                  }}>
                    {t.quote}
                  </p>
                )}
                {t.highlight && (
                  <p style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.82)",
                    lineHeight: 1.7,
                    letterSpacing: "-0.01em",
                    marginBottom: 28,
                  }}>
                    {t.highlight}
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.45)",
                    flexShrink: 0,
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 400, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.35 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", letterSpacing: "-0.01em", lineHeight: 1.35 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Trusted statement */}
      <div style={{ padding: "64px 160px 0" }}>
        <p className="reveal" style={{
          fontSize: "clamp(20px, 2vw, 28px)",
          fontWeight: 400,
          lineHeight: 1.35,
          letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.85)",
          maxWidth: 540,
        }}>
          Trusted by ambitious founders and teams shaping modern technology across the world.
        </p>
      </div>

      {/* Logo rows */}
      {LOGO_ROWS.map((row, ri) => (
        <div key={ri} style={{
          display: "grid",
          gridTemplateColumns: `repeat(${row.length}, 1fr)`,
          marginTop: ri === 0 ? 48 : 0,
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
          {row.map((logo, i) => (
            <div key={i} style={{
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: i < row.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <img
                src={logo.src}
                alt=""
                width={logo.w}
                height={logo.h}
                draggable={false}
                style={{ opacity: 0.22, maxWidth: logo.w, height: "auto" }}
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
