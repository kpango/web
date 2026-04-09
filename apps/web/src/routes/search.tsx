import type { SearchResult } from "@kpango/search";
import { CardLink, cn } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { textPrimary, textSecondary } from "../lib/styles";

interface SearchPageProps {
  query?: string;
  results?: SearchResult[];
  error?: string;
}

export const SearchResultsFragment: FC<SearchPageProps> = ({ query = "", results = [], error }) => {
  if (error) {
    return (
      <div class="p-4 bg-destructive/10 rounded-xl border border-destructive/20 text-destructive text-sm">
        {error}
      </div>
    );
  }

  if (!query) {
    return (
      <p class="text-muted-foreground text-sm text-center py-8">
        Type to search across CV, OSS, and blog posts.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p class="text-muted-foreground text-sm text-center py-8">No results found for "{query}".</p>
    );
  }

  return (
    <ul class="space-y-3">
      {results.map((result) => (
        <li key={result.url}>
          <CardLink href={result.url} class="p-4 rounded-xl hover:shadow-sm">
            <h3 class={cn("font-medium mb-1", textPrimary)}>{result.title}</h3>
            {result.excerpt && (
              <p class={cn("text-sm leading-relaxed line-clamp-2", textSecondary)}>
                {result.excerpt}
              </p>
            )}
            <span class="text-xs text-primary mt-2 block">{result.url}</span>
          </CardLink>
        </li>
      ))}
    </ul>
  );
};
