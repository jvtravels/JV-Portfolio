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
    value: "system" as const,
    label: "System theme",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

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
            onClick={() => setTheme(opt.value)}
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
              cursor: "pointer",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}
