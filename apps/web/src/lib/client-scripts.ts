/**
 * Small inline-safe JavaScript snippets used in onclick handlers.
 *
 * Centralised here so every toggle button uses the same logic and the
 * strings are easy to audit / update in one place.
 */

/** Toggle between dark and light mode, persisting the choice. */
export const toggleThemeScript =
  "var d=document.documentElement;var t=d.className==='dark'?'light':'dark';d.className=t;localStorage.setItem('theme',t);";

/** Toggle the mobile navigation menu visibility. */
export const toggleMobileMenuScript =
  "document.getElementById('mobile-menu').classList.toggle('hidden')";
