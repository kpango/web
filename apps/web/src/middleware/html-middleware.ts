import type { MiddlewareHandler } from "hono";
import { CACHE_CONTROL } from "../lib/cache";

/**
 * Middleware for HTML pages:
 * 1. Sends Early Hints for critical fonts and scripts.
 * 2. Sets default edge cache-control headers.
 */
export const htmlMiddleware = (): MiddlewareHandler => async (c, next) => {
  const isHtml = c.req.header("Accept")?.includes("text/html");

  if (isHtml) {
    // Early Hints for faster FCP
    c.header(
      "Link",
      "</assets/fonts/Inter-Regular.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
      { append: true }
    );
    c.header(
      "Link",
      "</assets/fonts/JetBrainsMono-Regular.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
      { append: true }
    );
    c.header("Link", "</assets/htmx.min.js>; rel=preload; as=script", { append: true });
  }

  await next();

  // Apply default HTML caching if not already set by a route
  if (isHtml && !c.res.headers.has("Cache-Control") && c.res.ok) {
    c.res.headers.set("Cache-Control", CACHE_CONTROL.DEFAULT);
  }
};
