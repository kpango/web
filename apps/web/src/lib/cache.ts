/**
 * Cache-Control constants and helpers.
 */

export const CACHE_CONTROL = {
  /** Cache static assets for 1 year (immutable). */
  ASSETS: "public, max-age=31536000, immutable",

  /** Cache HTML pages and API responses at the edge for 1 hour, stale-while-revalidate for 1 day. */
  DEFAULT: "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;
