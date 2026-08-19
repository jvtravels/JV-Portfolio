import Image from "next/image";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

const BRAND_LOGOS = [
  { src: "/Companies/T1.png", height: 30, natWidth: 484, natHeight: 128, name: "Tempo" },
  { src: "/Companies/T2.png", height: 22, natWidth: 722, natHeight: 96, name: "DynaChrg" },
  { src: "/Companies/T3.png", height: 28, natWidth: 908, natHeight: 128, name: "Joy Technologies" },
  { src: "/Companies/T4.png", height: 34, natWidth: 667, natHeight: 128, name: "Unpause" },
  { src: "/Companies/T5.png", height: 22, natWidth: 602, natHeight: 112, name: "Two Words" },
  { src: "/Companies/T6.png", height: 22, natWidth: 1005, natHeight: 96, name: "Catalyst iQ" },
];

export default function BrandsSection() {
  const track = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section id="brands">
      <div className="section-py" style={{ position: "relative" }}>
        {/* Dashed frame */}
        <DashedH style={{ top: 0, left: "var(--frame-inset)", right: "var(--frame-inset)" }} />
        <DashedH style={{ bottom: 0, left: "var(--frame-inset)", right: "var(--frame-inset)" }} />
        <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
        <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />

        <div className="section-px">
          <p className="reveal" style={{
            textAlign: "center",
            fontSize: "clamp(15px, 4vw, 20px)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "var(--text)",
          }}>
            Brands I have worked with
          </p>
        </div>

        <div className="brands-marquee">
          <div className="brands-marquee-track">
            {track.map((logo, i) => (
              <Image
                key={i}
                src={logo.src}
                alt={logo.name}
                width={logo.natWidth}
                height={logo.natHeight}
                draggable={false}
                style={{ height: logo.height, width: "auto", objectFit: "contain", flexShrink: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
