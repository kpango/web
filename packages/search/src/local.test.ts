import { describe, it, expect } from "vitest";
import { performLocalSearch } from "./local";
import type { SearchIndexEntry } from "./local";

const testIndex: SearchIndexEntry[] = [
  {
    id: "cv",
    title: "CV — Yusuke Kato",
    url: "/cv",
    excerpt: "Lead Researcher at Yahoo Japan.",
    keywords: "cv resume yusuke kato go kubernetes",
  },
  {
    id: "vald",
    title: "Vald — Distributed Vector Search Engine",
    url: "/oss",
    excerpt: "Highly scalable distributed ANN vector search engine.",
    keywords: "vald vector search distributed kubernetes",
  },
  {
    id: "gache",
    title: "Gache — Ultra-Fast Lock-Free Cache",
    url: "/oss",
    excerpt: "Ultra-fast lock-free in-memory cache.",
    keywords: "gache cache lock-free performance go",
  },
];

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
      url: `/test-${i}`,
      excerpt: "common keyword match",
      keywords: "common",
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
