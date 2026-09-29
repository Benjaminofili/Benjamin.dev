"use client";

import { useCallback, useEffect, useState } from "react";
import { THEME_STORAGE_KEY, isThemeMode, type ThemeMode } from "~/lib/theme";

const SYSTEM_QUERY = "(prefers-color-scheme: dark)";

function applyMode(mode: ThemeMode) {
  const isDark =
    mode === "dark" ||
    (mode === "system" && window.matchMedia(SYSTEM_QUERY).matches);
  const root = document.documentElement;
  root.setAttribute("data-theme", isDark ? "dark" : "light");
  root.classList.toggle("dark", isDark);
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 20h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 16v4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const OPTIONS: { mode: ThemeMode; label: string; Icon: () => React.ReactNode }[] =
  [
    { mode: "system", label: "System theme", Icon: SystemIcon },
    { mode: "light", label: "Light theme", Icon: SunIcon },
    { mode: "dark", label: "Dark theme", Icon: MoonIcon },
  ];

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");
  // The stored preference is unknown during SSR, so the control renders in a
  // neutral state until mount. This keeps the server and client markup equal.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      stored = null;
    }
    setMode(isThemeMode(stored) ? stored : "system");
    setMounted(true);
  }, []);

  // Only while following the system does an OS-level change move the site.
  useEffect(() => {
    if (mode !== "system") return;
    const media = window.matchMedia(SYSTEM_QUERY);
    const onChange = () => applyMode("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mode]);

  const select = useCallback((next: ThemeMode) => {
    const root = document.documentElement;
    root.setAttribute("data-theme-transition", "");
    window.setTimeout(() => root.removeAttribute("data-theme-transition"), 260);

    setMode(next);
    applyMode(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // A rejected write only costs persistence, not the switch itself.
    }
  }, []);

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="flex items-center gap-0.5 border border-neutral-800 bg-neutral-900/80 p-0.5 backdrop-blur-sm"
    >
      {OPTIONS.map(({ mode: optionMode, label, Icon }) => {
        const selected = mounted && mode === optionMode;
        return (
          <button
            key={optionMode}
            type="button"
            onClick={() => select(optionMode)}
            aria-pressed={selected}
            aria-label={label}
            title={label}
            className={`relative flex h-7 w-7 items-center justify-center transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:outline-none ${
              selected
                ? "bg-neutral-800 text-emerald-400"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <Icon />
            {/* Selection is marked by more than colour: a filled cell plus an
                underline, so it survives greyscale and high-contrast modes. */}
            {selected && (
              <span
                aria-hidden="true"
                className="absolute inset-x-1.5 bottom-0.5 h-px bg-emerald-400"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
