import type { MiddlewareHandler } from "hono";
import { CACHE_CONTROL } from "../lib/cache";

/**
 * Middleware for static assets:
 * Sets immutable long-term caching (1 year).
 * Cloudflare edge cache is busted automatically on new deployments.
 */
export const assetsMiddleware = (): MiddlewareHandler => async (c, next) => {
  await next();
  if (c.res.ok) {
    c.res.headers.set("Cache-Control", CACHE_CONTROL.ASSETS);
  }
};
