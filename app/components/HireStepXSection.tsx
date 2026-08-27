import { DashedH, DashedV } from "@/app/components/DashedFrame";

const STATS = [
  { value: "50+ users", label: "People who tried the product" },
  { value: "25K impressions", label: "Reached through early launch activity" },
  { value: "76+ sessions", label: "Practice sessions completed" },
];

const LESSONS = [
  { title: "Ship to learn", text: "Real users challenge assumptions." },
  { title: "Distribution matters", text: "A good product still needs reach." },
  { title: "Everything connects", text: "Product, brand, marketing, and business shape each other." },
];

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.2,
      color: "var(--text)",
      margin: "0 0 12px",
    }}>
      {children}
    </h3>
  );
}

function CardText({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 15,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: 0,
      maxWidth: 440,
    }}>
      {children}
    </p>
  );
}

export default function HireStepXSection() {
  return (
    <section id="hirestepx">
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
            HireStepX
          </span>
          <h2 className="reveal hirestepx-heading" style={{
            textAlign: "center",
            fontFamily: "var(--font-niven)",
            fontWeight: 400,
            color: "var(--text)",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 720,
          }}>
            From idea to working product
          </h2>

          <div className="hirestepx-row hirestepx-row--2">
            <div className="reveal hirestepx-card">
              <CardHeading>Hiring with a little less guesswork</CardHeading>
              <CardText>
                I wanted hiring to feel less like sorting profiles and more like understanding what someone can actually do.
              </CardText>
            </div>

            <div className="reveal hirestepx-card hirestepx-card--stats">
              <div className="hirestepx-stats">
                {STATS.map((stat) => (
                  <div key={stat.value} style={{ textAlign: "center" }}>
                    <span style={{
                      display: "block",
                      fontSize: 24,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "var(--text)",
                      marginBottom: 8,
                    }}>
                      {stat.value}
                    </span>
                    <span style={{
                      display: "block",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--text-muted)",
                    }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hirestepx-row hirestepx-row--3">
            <div className="reveal hirestepx-card">
              <CardHeading>What I owned</CardHeading>
              <CardText>As founder, I worked across the product and the business operations.</CardText>
            </div>

            <div className="reveal hirestepx-card">
              <CardHeading>Hiring with a little less guesswork</CardHeading>
              <CardText>
                I wanted hiring to feel less like sorting profiles and more like understanding what someone can actually do.
              </CardText>
            </div>

            <div className="reveal hirestepx-card" style={{ justifyContent: "flex-start" }}>
              <CardHeading>What building it taught me</CardHeading>
              <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 12 }}>
                {LESSONS.map((lesson) => (
                  <li key={lesson.title} style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-muted)" }}>
                    <span style={{ fontWeight: 600, color: "var(--text)" }}>{lesson.title}</span> — {lesson.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <a
              href="https://hirestepx.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Check HireStepX"
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: 48,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "0 20px",
                borderRadius: 2,
                boxSizing: "border-box",
              }}
            >
              <span className="btn-primary-label">Check HireStepX</span>
              <span className="btn-primary-fill" aria-hidden="true">
                <span className="btn-primary-label">Check HireStepX</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
