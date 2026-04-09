import type { FC, PropsWithChildren } from "hono/jsx";
import { raw } from "hono/utils/html";

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description?: string;
  path?: string;
}

export const Layout: FC<LayoutProps> = ({
  children,
  title = "kpango — Yusuke Kato",
  description = "Distributed Systems / Search / Cloud / Security — Individual Contributor at LINE Yahoo! Japan. Founder of Vald.",
  path = "/",
}) => {
  const GA_ID = "G-KCPFP9R997";

  return (
    <html lang="en" class="dark">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://kpango.com${path}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@kpang0" />
        <title>{title}</title>

        {/* Prebuilt Tailwind CSS — replaces the ~75 KB runtime CDN script */}
        <link rel="stylesheet" href="/assets/main.css" />

        {/* Fonts — preconnect first, then load stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* DNS prefetch for external origins */}
        <link rel="dns-prefetch" href="https://unpkg.com" />
        {GA_ID && <link rel="dns-prefetch" href="https://www.googletagmanager.com" />}

        {/* Dark mode — must run synchronously before first paint to avoid flash */}
        <script>
          {raw(
            "(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.className=t})();"
          )}
        </script>

        {/* HTMX — defer since it's not needed for initial render */}
        <script
          defer
          src="https://unpkg.com/htmx.org@2.0.4"
          integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+"
          crossorigin="anonymous"
        />

        {/* Google Analytics 4 — only rendered when GA_ID env var is set */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script>
              {raw(
                `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false});document.addEventListener('htmx:afterSettle',function(){if(typeof gtag==='function')gtag('event','page_view',{page_title:document.title,page_location:window.location.href,page_path:window.location.pathname})});window.addEventListener('DOMContentLoaded',function(){if(typeof gtag==='function')gtag('event','page_view',{page_title:document.title,page_location:window.location.href,page_path:window.location.pathname})});`
              )}
            </script>
          </>
        )}
      </head>
      <body class="bg-background text-foreground min-h-screen" hx-boost="true">
        {children}
      </body>
    </html>
  );
};
