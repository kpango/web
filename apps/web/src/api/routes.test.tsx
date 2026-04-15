import * as searchModule from "@kpango/search";
import { Hono } from "hono";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CACHE_CONTROL } from "../lib/cache";
import apiRouter from "./routes";

// Create a spy to mock the return value
vi.spyOn(searchModule, "performLocalSearch");

// Mock the dependencies
vi.mock("@kpango/content", () => ({
  searchIndex: [
    {
      id: "1",
      title: "Test Post",
      titleLow: "test post",
      url: "/test-post",
      excerpt: "This is a test post.",
      excerptLow: "this is a test post.",
      keywords: "test",
      keywordsLow: "test",
    },
  ],
}));

describe("API Routes - /search", () => {
  const app = new Hono().route("/", apiRouter);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return empty state when query is missing", async () => {
    const res = await app.request("/search");
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Type to search across CV, OSS, and blog posts.");
  });

  it("should return empty state when query is whitespace", async () => {
    const res = await app.request("/search?q=   ");
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Type to search across CV, OSS, and blog posts.");
  });

  it("should return results for a matching query", async () => {
    // Mock the search module's performLocalSearch function
    vi.mocked(searchModule.performLocalSearch).mockReturnValue([
      {
        id: "1",
        title: "Test Post",
        url: "/test-post",
        excerpt: "This is a test post.",
        score: 3,
      },
    ]);

    const res = await app.request("/search?q=test");
    expect(res.status).toBe(200);
    const html = await res.text();

    // Header should be set
    expect(res.headers.get("Cache-Control")).toBe(CACHE_CONTROL.DEFAULT);

    // Result should be in the HTML
    expect(html).toContain("Test Post");
    expect(html).toContain("/test-post");
    expect(html).toContain("This is a test post.");
  });

  it("should return no results message for non-matching query", async () => {
    vi.mocked(searchModule.performLocalSearch).mockReturnValue([]);

    const res = await app.request("/search?q=nomatch");
    expect(res.status).toBe(200);
    const html = await res.text();

    // Header should be set
    expect(res.headers.get("Cache-Control")).toBe(CACHE_CONTROL.DEFAULT);

    // "No results found" message - escaped since HTML output escapes quotes
    expect(html).toContain("No results found for &quot;nomatch&quot;");
  });
});
