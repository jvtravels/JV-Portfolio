import dynamic from "next/dynamic";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

const Lanyard = dynamic(() => import("@/app/components/Lanyard/Lanyard"), { ssr: false });

export default function AboutMeSection() {
  return (
    <section id="about-me">
      <div className="section-py" style={{ position: "relative" }}>
        {/* Dashed frame */}
        <DashedH style={{ bottom: 0, left: 0, right: 0 }} />
        <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
        <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />

        <div className="section-px about-grid">
          {/* Left — interactive 3D lanyard badge */}
          <div className="reveal about-lanyard" style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", minHeight: 480, borderRadius: 8, overflow: "hidden" }}>
            <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} frontImage="/About-me.png" backImage="/About-me.png" />
          </div>

          {/* Right — heading + copy */}
          <div className="reveal">
            <span style={{
              display: "block",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 16,
            }}>
              About Me
            </span>

            <h2 style={{
              fontSize: "clamp(24px, 7vw, 40px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              lineHeight: 1.25,
            }}>
              I&apos;m Jay Vyas, the person you&apos;re looking for.
            </h2>

            {[
              "I'm Jay Vyas, a Senior Product Designer working across AI, SaaS, and complex digital products.",
              "Over 7+ years, I've learned to look beyond the interface, into the workflows, systems, trade-offs, and product decisions underneath it.",
              "I work across 0→1 ideas and mature products, helping teams simplify complexity and scale without losing clarity.",
              "Building HireStepX added a founder's perspective: balancing user experience with technical constraints, cost, speed, and what's actually worth building next.",
              "I care about making complex products feel clear, coherent, and useful.",
            ].map((line, i) => (
              <p key={i} style={{
                fontSize: 16,
                fontWeight: 400,
                color: "rgba(var(--fg-rgb),0.7)",
                lineHeight: "26px",
                letterSpacing: "-0.01em",
                margin: "0 0 16px",
              }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
