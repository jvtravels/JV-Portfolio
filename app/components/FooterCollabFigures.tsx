// The "Let's Collaborate" heading and the man+dog illustration are baked
// into one flattened image per theme (design-provided), so the swap between
// modes is pure CSS driven by the html[data-theme] attribute — no JS needed,
// no flash on load since that attribute is set before first paint.
export default function FooterCollabFigures() {
  return (
    <div className="reveal footer-collab-figures">
      <img
        src="/FooterCollabDark.png"
        alt="Let's Collaborate"
        width={6100}
        height={1020}
        className="footer-collab-img footer-collab-img-dark"
      />
      <img
        src="/FooterCollabLight.png"
        alt="Let's Collaborate"
        width={6100}
        height={1020}
        className="footer-collab-img footer-collab-img-light"
      />
    </div>
  );
}
