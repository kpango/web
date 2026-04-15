import { describe, expect, it, vi, afterEach } from "vitest";
import { getToday, stripMarkdown, normalize } from "./utils";

describe("utils", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getToday", () => {
    it("returns the current date in YYYY-MM-DD format", () => {
      // Use a fixed UTC timestamp to ensure deterministic results across timezones
      const date = new Date("2023-11-05T12:00:00Z");
      vi.spyOn(global, "Date").mockImplementation(() => date as unknown as string);

      expect(getToday()).toBe("2023-11-05");
    });

    it("returns the correct date for UTC boundary", () => {
      const date = new Date("2023-12-31T23:59:59Z");
      vi.spyOn(global, "Date").mockImplementation(() => date as unknown as string);

      expect(getToday()).toBe("2023-12-31");
    });
  });

  describe("stripMarkdown", () => {
    it("removes links but keeps text", () => {
      expect(stripMarkdown("[Google](https://google.com)")).toBe("Google");
    });

    it("removes special characters", () => {
      expect(stripMarkdown("# Title with *bold* and `code`")).toBe("Title with bold and code");
    });

    it("replaces multiple newlines with a single space", () => {
      expect(stripMarkdown("Line 1\n\nLine 2")).toBe("Line 1 Line 2");
    });

    it("trims the result", () => {
      expect(stripMarkdown("  # Hello  ")).toBe("Hello");
    });
  });

  describe("normalize", () => {
    it("converts to lowercase", () => {
      expect(normalize("HELLO WORLD")).toBe("hello world");
    });

    it("removes non-alphanumeric characters except spaces and hyphens", () => {
      expect(normalize("hello, world! (test-case)")).toBe("hello world test-case");
    });

    it("filters out words with length <= 1", () => {
      expect(normalize("a quick brown fox")).toBe("quick brown fox");
    });

    it("deduplicates words", () => {
      expect(normalize("hello world hello")).toBe("hello world");
    });

    it("handles multiple spaces", () => {
      expect(normalize("hello   world")).toBe("hello world");
    });
  });
});
