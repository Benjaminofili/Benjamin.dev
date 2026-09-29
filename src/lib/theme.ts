export const THEME_MODES = ["system", "light", "dark"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const THEME_STORAGE_KEY = "theme";

export function isThemeMode(value: unknown): value is ThemeMode {
  return (
    typeof value === "string" && THEME_MODES.includes(value as ThemeMode)
  );
}

/**
 * Runs synchronously in <head> before first paint, so the correct theme is
 * already on <html> by the time anything renders. Without it the document
 * would paint with the CSS default and then snap to the stored preference.
 *
 * Kept dependency-free and defensive: storage access throws in some privacy
 * modes, and a theme is more useful than a blank page if it does.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(m!=="light"&&m!=="dark"&&m!=="system"){m="system"}var d=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.setAttribute("data-theme",d?"dark":"light");r.classList.toggle("dark",d)}catch(e){var r2=document.documentElement;r2.setAttribute("data-theme","dark");r2.classList.add("dark")}})();`;
