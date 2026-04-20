import { describe, expect, it, vi } from "vitest";
import { htmlMiddleware } from "./html-middleware";

interface MockContext {
  req: { header: (name: string) => string | null };
  res: { ok: boolean; headers: { has: ReturnType<typeof vi.fn>; set: ReturnType<typeof vi.fn> } };
  header: ReturnType<typeof vi.fn>;
}

describe("htmlMiddleware", () => {
  it("should NOT set Cache-Control header for HTML requests (caching logic removed)", async () => {
    const middleware = htmlMiddleware();
    const mockContext: MockContext = {
      req: {
        header: vi.fn((name: string) => {
          if (name === "Accept") return "text/html";
          return null;
        }),
      },
      res: {
        ok: true,
        headers: {
          has: vi.fn().mockReturnValue(false),
          set: vi.fn(),
        },
      },
      header: vi.fn(),
    };
    const next = vi.fn();

    await middleware(mockContext as never, next);

    expect(next).toHaveBeenCalled();
    // It should NOT set Cache-Control anymore
    expect(mockContext.res.headers.set).not.toHaveBeenCalledWith(
      "Cache-Control",
      expect.any(String)
    );
  });

  it("should still set Link header for HTML requests (Early Hints)", async () => {
    const middleware = htmlMiddleware();
    const mockContext: MockContext = {
      req: {
        header: vi.fn((name: string) => {
          if (name === "Accept") return "text/html";
          return null;
        }),
      },
      res: {
        ok: true,
        headers: {
          has: vi.fn().mockReturnValue(false),
          set: vi.fn(),
        },
      },
      header: vi.fn(),
    };
    const next = vi.fn();

    await middleware(mockContext as never, next);

    expect(next).toHaveBeenCalled();
    expect(mockContext.header).toHaveBeenCalledWith(
      "Link",
      expect.stringContaining("htmx.min.js"),
      expect.any(Object)
    );
  });

  it("should not set anything for non-HTML requests", async () => {
    const middleware = htmlMiddleware();
    const mockContext: MockContext = {
      req: {
        header: vi.fn((name: string) => {
          if (name === "Accept") return "application/json";
          return null;
        }),
      },
      res: {
        ok: true,
        headers: {
          has: vi.fn().mockReturnValue(false),
          set: vi.fn(),
        },
      },
      header: vi.fn(),
    };
    const next = vi.fn();

    await middleware(mockContext as never, next);

    expect(next).toHaveBeenCalled();
    expect(mockContext.res.headers.set).not.toHaveBeenCalled();
    expect(mockContext.header).not.toHaveBeenCalled();
  });
});
