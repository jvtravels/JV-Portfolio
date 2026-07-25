const AWARDS = [
  "Awwwards Honourable Mention",
  "4x Landbook Featured Website",
  "Midjourney Magazine",
  "Today in Design Designer Spotlight",
  "Lummi Artist Spotlight",
  "Uncover Faces Interview",
];

export default function BioSection() {
  return (
    <section id="about" style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      padding: "140px 0 120px",
    }}>
      {/* Left — portrait photo with orange duotone */}
      <div style={{
        paddingLeft: 200,
        paddingRight: 40,
        display: "flex",
        alignItems: "flex-start",
      }}>
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: 280,
          borderRadius: 12,
          overflow: "hidden",
          aspectRatio: "0.78 / 1",
        }}>
          <img
            src="/JV.png"
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              filter: "grayscale(100%) contrast(0.55) brightness(1.8)",
            }}
          />
          {/* Orange duotone overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "#ff623b",
            mixBlendMode: "multiply",
          }} />
        </div>
      </div>

      {/* Right — bio */}
      <div className="reveal" style={{ paddingRight: 160 }}>
        <p style={{
          fontSize: "clamp(18px, 1.6vw, 24px)",
          fontWeight: 400,
          lineHeight: 1.4,
          letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.9)",
          marginBottom: 56,
        }}>
          Design has been my focus for over 8 years. Along the way, working across different teams and industries taught me how design decisions connect directly to business goals.
        </p>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
            About
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, letterSpacing: "-0.01em", marginBottom: 18 }}>
            Before starting my own studio in 2023, I worked in design agencies, startups, and product companies, gaining hands-on experience across different industries and ways of building products.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, letterSpacing: "-0.01em", marginBottom: 18 }}>
            That background shapes how I approach design today. I see it not just as visuals, but as a practical tool that supports clear decisions and long-term business outcomes.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, letterSpacing: "-0.01em" }}>
            I&apos;m also deeply interested in AI, not as a trend, but as a tool to simplify workflows, improve decision-making, and explore new creative possibilities.
          </p>
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>
            Press &amp; Awwwards
          </div>
          <ul style={{ listStyle: "none" }}>
            {AWARDS.map((a, i) => (
              <li key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 14,
                color: "rgba(255,255,255,0.88)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                padding: "18px 0",
              }}>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, flexShrink: 0 }}>→</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
