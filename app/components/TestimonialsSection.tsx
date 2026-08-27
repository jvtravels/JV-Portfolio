"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

const TESTIMONIALS = [
  {
    quote: "Jay was someone I could discuss an idea with, not just hand a design task to. He would understand what we were trying to build, ask questions, and point out things we had missed.",
    highlight: "Many times, the final solution was better because of those discussions. I really valued that about working with him.",
    name: "Vanshil Patel",
    role: "Founder at Nousoft",
    avatar: "/Testimonial-Person/P1.png",
    logo: "/Testimonial-logo/T1.png",
  },
  {
    quote: "A lot of our conversations started with something pretty rough — an idea, a problem, or just a direction we wanted to explore. He was good at helping us make sense of it, asking questions, and pointing out when something wasn't quite working.",
    highlight: "We'd go back and forth a bit, and usually end up somewhere much clearer.",
    name: "Johnathan Sanjay",
    role: "Product Manager at Tempo",
    avatar: "/Testimonial-Person/P2.png",
    logo: "/Testimonial-logo/T2.png",
  },
  {
    quote: "Jay was refreshing to work with, he integrated well into our landing page work, emulating the style I had already set perfectly.",
    highlight: "He picked up on the tone we'd already established and carried it forward without needing much direction from us.",
    name: "Naren Lokwani",
    role: "CEO at Frshr Technologies",
    avatar: "/Testimonial-Person/P3.jpeg",
    logo: "/Testimonial-logo/T3.png",
  },
  {
    quote: "Working with Jay over the last few months has been a blast. He’s quick, responsive and very collaborative.",
    highlight: "He always listens and understands what the client is looking for and explores all possibilities to make sure the client is satisfied. 10/10 recommend working with him — if you don’t, then more for me!",
    name: "Samuel Darwin",
    role: "CEO at Joy Technologies",
    avatar: "/Testimonial-Person/P4.jpeg",
    logo: "/Testimonial-logo/T4.png",
  },
  {
    quote: "Jay designed our new site and absolutely nailed it.",
    highlight: "He brought great ideas to the table and was super easy to work with throughout the process. Would definitely work with him again!",
    name: "Nikhil Ranka",
    role: "Co-founder at Catalyst IQ",
    avatar: "/Testimonial-Person/P5.jpeg",
    logo: "/Testimonial-logo/T5.png",
  },
  {
    quote: "Jay was an incredible partner.",
    highlight: "He worked efficiently and thoughtfully to help us recreate our website, was responsive and collaborative, and produced excellent work at a fraction of the cost and time.",
    name: "Riddhi Keralia",
    role: "Founder at Unpause",
    avatar: "/Testimonial-Person/P6.jpeg",
    logo: "/Testimonial-logo/T6.png",
  },
  {
    quote: "Jay brought real clarity to a project that needed it.",
    highlight: "He was thoughtful about the details and easy to work with from start to finish.",
    name: "Thuy-an Nguyen",
    role: "CPO at Dynachrg",
    avatar: "/Testimonial-Person/P7.webp",
    logo: "/Testimonial-logo/T7.png",
  },
  {
    quote: "Jay understood exactly what we were going for.",
    highlight: "He moved quickly without cutting corners, and the final result felt polished from day one.",
    name: "Nihar Tanna",
    role: "Founder at Two Words Studio",
    avatar: "/Testimonial-Person/P8.jpeg",
    logo: "/Testimonial-logo/T8.png",
  },
];

function getCardsVisible(width: number) {
  if (width < 640) return 1;
  if (width < 1000) return 2;
  return 3;
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(3);

  useEffect(() => {
    const update = () => setCardsVisible(getCardsVisible(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsVisible);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const controls = (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        aria-live="polite"
        style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: "-0.01em" }}
      >
        {index + 1} / {maxIndex + 1}
      </span>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { ch: "‹", label: "Previous testimonial", action: prev, disabled: index === 0 },
          { ch: "›", label: "Next testimonial", action: next, disabled: index === maxIndex },
        ].map(({ ch, label, action, disabled }) => (
          <button
            key={ch}
            onClick={action}
            aria-label={label}
            disabled={disabled}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "none",
              background: "none",
              color: disabled ? "rgba(var(--fg-rgb),0.18)" : "rgba(var(--fg-rgb),0.75)",
              fontSize: 20,
              cursor: disabled ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease",
              userSelect: "none",
            }}
            onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = disabled ? "rgba(var(--fg-rgb),0.18)" : "rgba(var(--fg-rgb),0.75)"; }}
            onFocus={(e) => { if (!disabled) e.currentTarget.style.color = "var(--text)"; }}
            onBlur={(e) => { e.currentTarget.style.color = disabled ? "rgba(var(--fg-rgb),0.18)" : "rgba(var(--fg-rgb),0.75)"; }}
          >
            {ch}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="testimonials">

      {/* Words from Founders carousel */}
      <div
        className="section-py-sm"
        style={{
          position: "relative",
        }}
      >
        {/* Dashed frame */}
        <DashedH style={{ bottom: 0, left: 0, right: 0 }} />
        <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
        <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />

        <div className="section-px">
          {/* Eyebrow + heading + arrows */}
          <span className="testimonial-eyebrow" style={{
            display: "block",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 16,
          }}>
            Testimonial
          </span>
          <div className="testimonial-header reveal" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <h2 className="testimonial-heading" style={{
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              lineHeight: 1.75,
              margin: 0,
            }}>
              Words from founders
            </h2>
            <div className="testimonial-controls-desktop">{controls}</div>
          </div>

          {/* Cards */}
          <div className="reveal reveal-delay-1" style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${TESTIMONIALS.length}, calc(100% / ${cardsVisible}))`,
                transform: `translateX(calc(-${index} * (100% / ${cardsVisible})))`,
                transition: "transform 0.55s cubic-bezier(0.44, 0, 0.56, 1)",
                willChange: "transform",
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    paddingRight: cardsVisible === 1 || i === TESTIMONIALS.length - 1 ? 0 : 24,
                  }}
                >
                <div
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.setProperty("--glow", "1")}
                  onMouseLeave={(e) => e.currentTarget.style.setProperty("--glow", "0")}
                  className="testimonial-card"
                  style={{
                    position: "relative",
                    background: "rgba(var(--fg-rgb),0.035)",
                    borderRadius: 8,
                    padding: "32px 32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 300,
                    height: "100%",
                    overflow: "hidden",
                    border: "1px solid rgba(var(--fg-rgb),0.07)",
                  } as React.CSSProperties}
                >
                  {/* Cursor-tracked glow */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 8,
                    background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--fg-rgb),0.06), transparent 65%)",
                    opacity: "var(--glow, 0)",
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  } as React.CSSProperties} />
                  {/* Cursor-tracked border highlight */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 8,
                    padding: 1,
                    background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--fg-rgb),0.5), transparent 65%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    opacity: "var(--glow, 0)",
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  } as React.CSSProperties} />
                  <p style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: "rgba(var(--fg-rgb),0.85)",
                    lineHeight: 1.6,
                    letterSpacing: "-0.01em",
                    margin: "0 0 28px",
                  }}>
                    {t.quote}{t.highlight ? ` ${t.highlight}` : ""}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ position: "relative", width: 66, height: 40, flexShrink: 0 }}>
                      <Image
                        src={t.avatar}
                        alt=""
                        width={40}
                        height={40}
                        draggable={false}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 26,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}>
                        {t.logo ? (
                          <Image
                            src={t.logo}
                            alt=""
                            width={26}
                            height={26}
                            draggable={false}
                            style={{ width: 26, height: 26, objectFit: "contain" }}
                          />
                        ) : (
                          <svg width="19" height="19" viewBox="0 0 24 24">
                            <path d="M11 20A7 7 0 0 1 4 13c0-4 8-10 15-11-1 7-1 14-8 18z" fill="black" />
                            <path d="M4 21c5-4 8-8 12-14" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 400, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.4 }}>{t.name}</div>
                      <div style={{ fontSize: 13, color: "var(--text-dim)", letterSpacing: "-0.01em", lineHeight: 1.4, marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonial-controls-mobile" style={{ justifyContent: "center", marginTop: 20 }}>
            {controls}
          </div>
        </div>
      </div>
    </section>
  );
}
