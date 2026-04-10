import type { SearchResult } from "./index";

export interface SearchIndexEntry {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  keywords: string;
}

export function performLocalSearch(query: string, index: SearchIndexEntry[]): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return index
    .map((item) => {
      let score = 0;
      if (item.title.toLowerCase().includes(q)) score += 3;
      if (item.excerpt.toLowerCase().includes(q)) score += 2;
      if (item.keywords.toLowerCase().includes(q)) score += 1;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      excerpt: item.excerpt,
      score: item.score,
    }));
}
