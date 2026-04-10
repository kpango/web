import { Hono } from "hono";
import { etag } from "hono/etag";
import { jsxRenderer } from "hono/jsx-renderer";
import { secureHeaders } from "hono/secure-headers";
import apiRouter from "./api/routes";
import { ErrorPage } from "./components/ErrorPage";
import { CACHE_CONTROL } from "./lib/cache";
import pageRouter from "./pages/routes";

const app = new Hono();

// ---- Middleware ----

app.use(etag());
app.use(
  secureHeaders({
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'sha256-FdUJoZ//+8VxR2yHJprG+zXGHsiBKhULM6/EQktpqAU='", // Trusted Types bootstrap
        "'sha256-piObtmD3ixCA9Si14zS6IeqsKSN9HX5P1ivqSICRGCU='", // Dark mode init
        "'sha256-Rd1QvbPO7vQtYfY08K6YCHGxdmW56qWbgN14LRs7ipc='", // Deferred event listeners
        "'sha256-8RyP7tNp66PINZ7PYThCM04vZauMCOjogPe87TO/W2E='", // Google Analytics loader
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
      ],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
      imgSrc: [
        "'self'",
        "data:",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
      ],
      connectSrc: [
        "'self'",
        "https://www.google-analytics.com",
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://*.googletagmanager.com",
      ],
      frameAncestors: ["'none'"],
      requireTrustedTypesFor: ["'script'"],
      trustedTypes: ["default"],
    },
    strictTransportSecurity: "max-age=63072000; includeSubDomains; preload",
    xFrameOptions: "DENY",
    crossOriginOpenerPolicy: "same-origin",
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: "same-origin",
    referrerPolicy: "strict-origin-when-cross-origin",
  })
);

app.use(jsxRenderer(({ children }) => <>{children}</>));

/** Cache static assets for 1 year (immutable, Cloudflare CDN busts on deploy). */
app.use("/assets/*", async (c, next) => {
  await next();
  if (c.res.ok) {
    c.res.headers.set("Cache-Control", CACHE_CONTROL.ASSETS);
  }
});

/** Cache HTML pages at the edge for 1 hour, stale-while-revalidate for 1 day. */
app.use("*", async (c, next) => {
  await next();
  if (
    !c.res.headers.has("Cache-Control") &&
    c.res.headers.get("Content-Type")?.includes("text/html")
  ) {
    c.res.headers.set("Cache-Control", CACHE_CONTROL.DEFAULT);
  }
});

// ---- Mount Routers ----

app.route("/", pageRouter);
app.route("/api", apiRouter);

// ---- Error handling ----

app.notFound((c) =>
  c.html(<ErrorPage status={404} message="The page you're looking for doesn't exist." />, 404)
);

app.onError((_err, c) =>
  c.html(<ErrorPage status={500} message="Something went wrong. Please try again later." />, 500)
);

export default app;
