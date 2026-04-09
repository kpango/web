export interface SearchResult {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  score: number;
}

export { performLocalSearch } from "./local";
export type { SearchIndexEntry } from "./local";
