import CrowdCanvas from "@/app/components/CrowdCanvas";
import FooterCollabFigures from "@/app/components/FooterCollabFigures";

const RESUME_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M14 3v4h4M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const LINKEDIN_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 10v6M8 7.5v.01M12.5 16v-3.6c0-1.3.8-2.1 2-2.1s2 .8 2 2.1V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ position: "relative" }}>
      <div className="footer-collab">
        <FooterCollabFigures />

        <div className="reveal footer-collab-bottom-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "rgba(243, 241, 234, 0.6)", letterSpacing: "-0.01em" }}>
            © {year} Jay Vyas
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/resume.pdf" className="footer-collab-pill">
              {RESUME_ICON}
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-collab-pill"
            >
              {LINKEDIN_ICON}
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div
        className="reveal footer-crowd"
        style={{
          position: "relative",
          width: "100%",
          marginTop: 40,
          overflow: "hidden",
        }}
      >
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} scale={0.9} />
      </div>
    </footer>
  );
}
