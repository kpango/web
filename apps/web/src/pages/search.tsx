import type { SearchResult } from "@kpango/search";
import { CardLink, cn, textPrimary, textSecondary } from "@kpango/ui";
import type { FC } from "hono/jsx";

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
          <CardLink href={result.url} stretched={false} class="p-3 rounded-xl block">
            <h3 class={cn("font-medium text-sm mb-1", textPrimary)}>{result.title}</h3>
            {result.excerpt && (
              <p class={cn("text-xs leading-relaxed line-clamp-2", textSecondary)}>
                {result.excerpt}
              </p>
            )}
            <span class="text-[10px] text-primary mt-1.5 block font-mono opacity-70">
              {result.url}
            </span>
          </CardLink>
        </li>
      ))}
    </ul>
  );
};
