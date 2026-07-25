const CLIENTS = [
  { name: "AIXBT", mark: "✳" },
  { name: "RUYUI", mark: null },
  { name: "chronicle", mark: "◇" },
  { name: "NEO", mark: null },
  { name: "Calldesk", mark: "▌▌" },
  { name: "IVERSON", mark: null },
  { name: "The Signal", mark: "[ ]" },
];

export default function ClientSection() {
  return (
    <section id="clients" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Logo grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${CLIENTS.length}, 1fr)`,
      }}>
        {CLIENTS.map(({ name, mark }, i) => (
          <div key={name} style={{
            height: 130,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRight: i < CLIENTS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            gap: 6,
          }}>
            {mark && (
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.28)", lineHeight: 1 }}>{mark}</span>
            )}
            <span style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.22)",
              textAlign: "center",
              userSelect: "none",
              fontVariantNumeric: "tabular-nums",
            }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
