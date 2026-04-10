import type { SearchResult } from "./index";

export interface SearchIndexEntry {
  id: string;
  title: string;
  titleLow: string;
  url: string;
  excerpt: string;
  excerptLow: string;
  keywords: string;
  keywordsLow: string;
}

export function performLocalSearch(query: string, index: SearchIndexEntry[]): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: (SearchResult & { score: number })[] = [];

  for (let i = 0; i < index.length; i++) {
    const item = index[i];
    let score = 0;

    if (item.titleLow.includes(q)) {
      score += 3;
    }
    if (item.excerptLow.includes(q)) {
      score += 2;
    }
    if (item.keywordsLow.includes(q)) {
      score += 1;
    }

    if (score > 0) {
      results.push({
        id: item.id,
        title: item.title,
        url: item.url,
        excerpt: item.excerpt,
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}
