export interface SearchResult {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  score: number;
}

export type { SearchIndexEntry } from "./local";
export { performLocalSearch } from "./local";
