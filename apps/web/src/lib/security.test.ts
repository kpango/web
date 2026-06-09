import { describe, expect, it } from "vitest";
import { securityHeaders } from "./security";

describe("securityHeaders", () => {
  it("should have correct overall structure", () => {
    expect(securityHeaders).toBeDefined();
    expect(typeof securityHeaders).toBe("object");
    expect(securityHeaders).toHaveProperty("contentSecurityPolicy");
    expect(securityHeaders).toHaveProperty("strictTransportSecurity");
    expect(securityHeaders).toHaveProperty("xFrameOptions");
    expect(securityHeaders).toHaveProperty("crossOriginOpenerPolicy");
    expect(securityHeaders).toHaveProperty("crossOriginEmbedderPolicy");
    expect(securityHeaders).toHaveProperty("crossOriginResourcePolicy");
    expect(securityHeaders).toHaveProperty("referrerPolicy");
  });

  describe("Content Security Policy", () => {
    const csp = securityHeaders.contentSecurityPolicy;

    it("should have defaultSrc set to 'self'", () => {
      expect(csp.defaultSrc).toEqual(["'self'"]);
    });

    it("should allow only the intended script sources (including required hashes)", () => {
      expect(csp.scriptSrc).toEqual([
        "'self'",
        "'sha256-fAUNvp3YmWmftxjxXhCz+FxWUBEnCiuh/GrjmrRnmgg='",
        "'sha256-DP8jHTFztqRxLUYoOqVfqS8sblBs3KbnMm2IjpDKA78='",
        "'sha256-9om4xYgxKuzZDjIJ0NbankrFKmkNfnY6Ul0rurB+Clw='",
        "'sha256-pnRMKIKHyAcrxNdopR7JroLsskecQenxrbkLyzcQwQQ='",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
      ]);
    });

    it("should prevent framing", () => {
      expect(csp.frameAncestors).toEqual(["'none'"]);
    });

    it("should enforce Trusted Types", () => {
      expect(csp.requireTrustedTypesFor).toEqual(["'script'"]);
      expect(csp.trustedTypes).toEqual(["default", "goog#html"]);
    });
  });

  describe("Other security headers", () => {
    it("should enforce strict transport security with preload", () => {
      expect(securityHeaders.strictTransportSecurity).toContain("max-age=63072000");
      expect(securityHeaders.strictTransportSecurity).toContain("includeSubDomains");
      expect(securityHeaders.strictTransportSecurity).toContain("preload");
    });

    it("should deny framing via X-Frame-Options", () => {
      expect(securityHeaders.xFrameOptions).toBe("DENY");
    });

    it("should have strict cross-origin policies", () => {
      expect(securityHeaders.crossOriginOpenerPolicy).toBe("same-origin");
      expect(securityHeaders.crossOriginEmbedderPolicy).toBe(false);
      expect(securityHeaders.crossOriginResourcePolicy).toBe("same-origin");
    });

    it("should have strict referrer policy", () => {
      expect(securityHeaders.referrerPolicy).toBe("strict-origin-when-cross-origin");
    });
  });
});
