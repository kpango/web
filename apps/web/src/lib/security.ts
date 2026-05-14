export const securityHeaders = {
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'sha256-fAUNvp3YmWmftxjxXhCz+FxWUBEnCiuh/GrjmrRnmgg='", // Trusted Types bootstrap
      "'sha256-DP8jHTFztqRxLUYoOqVfqS8sblBs3KbnMm2IjpDKA78='", // Dark mode init
      "'sha256-9om4xYgxKuzZDjIJ0NbankrFKmkNfnY6Ul0rurB+Clw='", // Deferred event listeners
      "'sha256-pnRMKIKHyAcrxNdopR7JroLsskecQenxrbkLyzcQwQQ='", // Google Analytics loader
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
    trustedTypes: ["default", "goog#html"],
  },
  strictTransportSecurity: "max-age=63072000; includeSubDomains; preload",
  xFrameOptions: "DENY",
  crossOriginOpenerPolicy: "same-origin",
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: "same-origin",
  referrerPolicy: "strict-origin-when-cross-origin",
};
