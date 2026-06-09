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
    const csp = securityHeaders.contentSecurityPolicy as any;

    it("should have defaultSrc set to 'self'", () => {
      expect(csp.defaultSrc).toContain("'self'");
    });

    it("should allow scripts from trusted domains and required inline hashes", () => {
      expect(csp.scriptSrc).toContain("'self'");
      expect(csp.scriptSrc).toContain("https://www.googletagmanager.com");
      expect(csp.scriptSrc).toContain("https://www.google-analytics.com");
      // Check for at least one hash
      expect(
        csp.scriptSrc.some((src: string) => src.startsWith("'sha256-"))
      ).toBe(true);
    });

    it("should prevent framing", () => {
      expect(csp.frameAncestors).toContain("'none'");
    });

    it("should enforce Trusted Types", () => {
      expect(csp.requireTrustedTypesFor).toContain("'script'");
      expect(csp.trustedTypes).toContain("default");
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
