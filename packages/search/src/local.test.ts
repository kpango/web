import { describe, expect, it } from "vitest";
import type { SearchIndexEntry } from "./local";
import { calculateScore, performLocalSearch } from "./local";

const testIndex: SearchIndexEntry[] = [
  {
    id: "cv",
    title: "CV — Yusuke Kato",
    titleLow: "cv — yusuke kato",
    url: "/cv",
    excerpt: "Lead Researcher at Yahoo Japan.",
    excerptLow: "lead researcher at yahoo japan.",
    keywords: "cv resume yusuke kato go kubernetes",
    keywordsLow: "cv resume yusuke kato go kubernetes",
  },
  {
    id: "vald",
    title: "Vald — Distributed Vector Search Engine",
    titleLow: "vald — distributed vector search engine",
    url: "/oss",
    excerpt: "Highly scalable distributed ANN vector search engine.",
    excerptLow: "highly scalable distributed ann vector search engine.",
    keywords: "vald vector search distributed kubernetes",
    keywordsLow: "vald vector search distributed kubernetes",
  },
  {
    id: "gache",
    title: "Gache — Ultra-Fast Lock-Free Cache",
    titleLow: "gache — ultra-fast lock-free cache",
    url: "/oss",
    excerpt: "Ultra-fast lock-free in-memory cache.",
    excerptLow: "ultra-fast lock-free in-memory cache.",
    keywords: "gache cache lock-free performance go",
    keywordsLow: "gache cache lock-free performance go",
  },
];

describe("calculateScore", () => {
  it("returns 0 when there are no matches", () => {
    expect(calculateScore(testIndex[0], "nonexistent")).toBe(0);
  });

  it("adds 3 for title matches", () => {
    const item = { ...testIndex[0], keywordsLow: "", excerptLow: "" };
    expect(calculateScore(item, "cv")).toBe(3);
  });

  it("adds 2 for excerpt matches", () => {
    const item = { ...testIndex[0], titleLow: "", keywordsLow: "" };
    expect(calculateScore(item, "researcher")).toBe(2);
  });

  it("adds 1 for keyword matches", () => {
    const item = { ...testIndex[0], titleLow: "", excerptLow: "" };
    expect(calculateScore(item, "go")).toBe(1);
  });
});

describe("performLocalSearch", () => {
  it("returns empty array for empty query", () => {
    const results = performLocalSearch("", testIndex);
    expect(results).toEqual([]);
  });

  it("returns empty array when nothing matches", () => {
    const results = performLocalSearch("nonexistent", testIndex);
    expect(results).toEqual([]);
  });

  it("matches by title", () => {
    const results = performLocalSearch("Vald", testIndex);
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].id).toBe("vald");
  });

  it("matches by keywords", () => {
    const results = performLocalSearch("kubernetes", testIndex);
    expect(results.length).toBe(2);
    const ids = results.map((r) => r.id);
    expect(ids).toContain("cv");
    expect(ids).toContain("vald");
  });

  it("ranks title matches higher than keyword matches", () => {
    const results = performLocalSearch("Gache", testIndex);
    expect(results[0].id).toBe("gache");
    expect(results[0].score).toBeGreaterThan(0);
  });

  it("returns at most 8 results", () => {
    const largeIndex: SearchIndexEntry[] = Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i}`,
      title: `Test Item ${i}`,
      titleLow: `test item ${i}`,
      url: `/test-${i}`,
      excerpt: "common keyword match",
      excerptLow: "common keyword match",
      keywords: "common",
      keywordsLow: "common",
    }));
    const results = performLocalSearch("common", largeIndex);
    expect(results.length).toBeLessThanOrEqual(8);
  });

  it("is case-insensitive", () => {
    const results = performLocalSearch("vald", testIndex);
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].id).toBe("vald");
  });

  it("returns correct result shape", () => {
    const results = performLocalSearch("cv", testIndex);
    expect(results.length).toBeGreaterThanOrEqual(1);
    const result = results[0];
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("excerpt");
    expect(result).toHaveProperty("score");
    expect(typeof result.score).toBe("number");
  });
});
