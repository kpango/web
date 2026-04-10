import type { Child, FC, PropsWithChildren } from "hono/jsx";
import { raw } from "hono/utils/html";
import { inlineStyles } from "../styles/inline-css.js";

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description?: string;
  path?: string;
  head?: Child;
}

export const Layout: FC<LayoutProps> = ({
  children,
  title = "kpango — Yusuke Kato",
  description = "Distributed Systems / Search / Cloud / Security — Individual Contributor at LY Corporation. Founder of Vald.",
  path = "/",
  head,
}) => {
  return (
    <>
      {raw("<!DOCTYPE html>")}
      <html lang="en" class="dark">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          {/* Critical Font Preloads with high priority */}
          <link
            rel="preload"
            href="/assets/fonts/Inter-Regular.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
            fetchpriority="high"
          />

          {/* High-priority CSS — Inlined to eliminate render-blocking request */}
          <style>{raw(inlineStyles)}</style>

          {/* Other font preloads */}
          <link
            rel="preload"
            href="/assets/fonts/JetBrainsMono-Regular.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />

          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={`https://kpango.com${path}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@kpang0" />
          <link rel="icon" href="/favicon.ico" />
          <title>{title}</title>

          {/* DNS prefetch and preconnect for external origins */}
          <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin="anonymous" />
          <link rel="preconnect" href="https://www.google-analytics.com" crossorigin="anonymous" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />

          {head}

          {/* Trusted Types Policy for HTMX */}
          <script>
            {raw(`if (window.trustedTypes && window.trustedTypes.createPolicy) {
                window.trustedTypes.createPolicy('default', {
                  createHTML: (string) => string,
                  createScriptURL: (string) => string,
                  createScript: (string) => string,
                });
              }`)}
          </script>

          {/* Dark mode initialization — Critical to run as early as possible to prevent FOUC */}
          <script>
            {raw(`(function() {
  function applyTheme() {
    var t = localStorage.getItem("theme") || "dark";
    if (t !== "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add(t);
    }
  }
  applyTheme();
  // Handle HTMX swaps to ensure theme persists
  document.addEventListener('htmx:afterOnLoad', applyTheme);
})();`)}
          </script>

          {/* Non-critical initial JS — deferred */}
          <script>
            {raw(`window.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    var target = e.target.closest('[data-toggle-theme],[data-toggle-menu],[data-print]');
    if (!target) return;
    var d = document.documentElement;
    if (target.hasAttribute('data-toggle-theme')) {
      var n = d.classList.contains('dark') ? 'light' : 'dark';
      d.classList.remove('dark', 'light');
      d.classList.add(n);
      localStorage.setItem('theme', n);
    } else if (target.hasAttribute('data-toggle-menu')) {
      var m = document.getElementById('mobile-menu');
      if (m) m.classList.toggle('hidden');
    } else if (target.hasAttribute('data-print')) {
      window.print();
    }
  });
});`)}
          </script>

          {/* HTMX — defer since it's not needed for initial render */}
          <script defer src="/assets/htmx.min.js" />
        </head>
        <body class="bg-background text-foreground min-h-screen" hx-boost="true">
          {children}

          {/* Google Analytics 4 — delayed until after load to free up main thread for LCP */}
          <script>
            {raw(`window.addEventListener('load', function() {
              var s = document.createElement('script');
              s.src = '/assets/ga.js';
              s.async = true;
              document.body.appendChild(s);
            });`)}
          </script>
        </body>
      </html>
    </>
  );
};
