import { siteData } from "@kpango/content";
import type { Child, FC, PropsWithChildren } from "hono/jsx";
import { raw } from "hono/utils/html";
import { inlineStyles, proseStyles } from "../styles/inline-css.js";

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description?: string;
  path?: string;
  head?: Child;
}
const DEFAULT_TITLE = siteData.meta.defaultTitle;
const DEFAULT_DESCRIPTION = siteData.meta.defaultDescription;

export const Layout: FC<LayoutProps> = ({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
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

          {/* High-priority CSS — Inlined to eliminate render-blocking requests */}
          <style>{raw(inlineStyles)}</style>
          <style>{raw(proseStyles)}</style>

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
          <meta property="og:url" content={`${siteData.meta.siteUrl}${path}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={siteData.meta.twitterHandle} />
          <link rel="icon" href="/favicon.ico" />
          <title>{title}</title>

          {head}

          {/* Trusted Types Policy for HTMX */}
          <script>
            {raw(
              `if(window.trustedTypes&&window.trustedTypes.createPolicy){window.trustedTypes.createPolicy("default",{createHTML:t=>t,createScriptURL:t=>t,createScript:t=>t})}`
            )}
          </script>

          {/* Dark mode initialization — Critical to run as early as possible to prevent FOUC */}
          <script>
            {raw(
              `!function(){function e(){var e=localStorage.getItem("theme")||"dark";"dark"!==e&&(document.documentElement.classList.remove("dark"),document.documentElement.classList.add(e))}e(),document.addEventListener("htmx:afterOnLoad",e)}();`
            )}
          </script>

          {/* Non-critical initial JS — deferred */}
          <script>
            {raw(
              `window.addEventListener("DOMContentLoaded",(function(){document.addEventListener("click",(function(e){var t=e.target.closest("[data-toggle-theme],[data-toggle-menu],[data-print]");if(t){var n=document.documentElement;if(t.hasAttribute("data-toggle-theme")){var o=n.classList.contains("dark")?"light":"dark";n.className=o,localStorage.setItem("theme",o)}else if(t.hasAttribute("data-toggle-menu")){var i=document.getElementById("mobile-menu");i&&i.classList.toggle("hidden")}else t.hasAttribute("data-print")&&window.print()}}))}));`
            )}
          </script>

          {/* HTMX — defer since it's not needed for initial render */}
          <script defer src="/assets/htmx.min.js" />
        </head>
        <body class="bg-background text-foreground min-h-screen" hx-boost="true">
          {children}

          {/* Google Analytics 4 — delayed until after load to free up main thread for LCP */}
          <script>
            {raw(
              `window.addEventListener("load",(function(){var e=document.createElement("script");e.src="/assets/ga.js",e.async=!0,document.body.appendChild(e)}));`
            )}
          </script>
        </body>
      </html>
    </>
  );
};
