"use client";

import { useTheme } from "./ThemeProvider";

const OPTIONS = [
  {
    value: "light" as const,
    label: "Light theme",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "dark" as const,
    label: "Dark theme",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = (value: (typeof OPTIONS)[number]["value"], e: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(value);
      return;
    }

    document.documentElement.style.setProperty("--theme-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--theme-y", `${e.clientY}px`);
    document.startViewTransition(() => setTheme(value));
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: "var(--toggle-bg)",
        borderRadius: 999,
        padding: 4,
        boxShadow: "var(--toggle-shadow)",
      }}
    >
      {OPTIONS.map((opt) => {
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            onClick={(e) => handleClick(opt.value, e)}
            style={{
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "none",
              background: active ? "var(--toggle-active-bg)" : "transparent",
              color: active ? "var(--toggle-icon-active)" : "var(--toggle-icon)",
              boxShadow: active ? "0 0 0 2px var(--accent)" : "0 0 0 2px transparent",
              transform: active ? "scale(1)" : "scale(0.94)",
              cursor: "pointer",
              transition: "background 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}
