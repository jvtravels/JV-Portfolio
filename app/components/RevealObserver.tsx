"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealObserver() {
  const pathname = usePathname();

  // Mounted once in the root layout, so it never remounts on client-side
  // navigation — re-run the scan on every pathname change to pick up the
  // new page's ".reveal" elements instead of only the ones present at the
  // very first page load.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
