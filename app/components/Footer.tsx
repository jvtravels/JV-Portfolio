import { DashedH } from "@/app/components/DashedFrame";

const SOCIAL_LINKS = [
  {
    label: "Email",
    href: "mailto:vyasjay85@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 3v4h4M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10v6M8 7.5v.01M12.5 16v-3.6c0-1.3.8-2.1 2-2.1s2 .8 2 2.1V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ position: "relative", padding: "56px 0 40px" }}>
      <DashedH style={{ top: 0, left: 0, right: 0 }} />

      <div className="section-px">
        {/* Top row — blurb + social icons */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}>
          <p style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.5,
            color: "var(--text)",
          }}>
            Let&apos;s connect.
            <br />
            I&apos;m always down for a chat.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="footer-social-link"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginTop: 40,
        }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: "-0.01em" }}>
            © {year} Jay Vyas
          </span>
          <span style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: "-0.01em" }}>
            Built with love
          </span>
        </div>
      </div>
    </footer>
  );
}
