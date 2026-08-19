import { DashedH, DashedV } from "@/app/components/DashedFrame";

const STEPS = [
  {
    number: "01",
    title: "Discovery & framing",
    description: "I dig into the problem, the users, and the constraints before touching a screen, so what gets built actually earns its place in the product.",
  },
  {
    number: "02",
    title: "Design & prototyping",
    description: "I move fast between wireframes and high-fidelity flows, testing ideas in real components instead of static comps.",
  },
  {
    number: "03",
    title: "Build & ship",
    description: "As a founder, I stay close to engineering, trading off scope, cost, and speed so what ships matches what was designed.",
  },
  {
    number: "04",
    title: "Iterate with data",
    description: "I watch how people actually use what we built and fold that back into the next version instead of moving on.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process">
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
            HireStepX
          </span>
          <h2 className="reveal" style={{
            textAlign: "center",
            fontSize: "clamp(24px, 7vw, 40px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.25,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 640,
          }}>
            How I work when I own the product end-to-end
          </h2>

          <div className="steps-grid">
            {STEPS.map((step) => (
              <div key={step.number} className="reveal steps-card">
                <span style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "var(--text-muted)",
                  marginBottom: 16,
                }}>
                  {step.number}
                </span>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                  margin: "0 0 10px",
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                  margin: 0,
                  maxWidth: 440,
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
