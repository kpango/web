import { searchIndex } from "@kpango/content";
import { performLocalSearch } from "@kpango/search";
import { Hono } from "hono";
import { CACHE_CONTROL } from "../lib/cache";
import { SearchResultsFragment } from "../pages/search";

const apiRouter = new Hono();

apiRouter.get("/search", (c) => {
  const query = c.req.query("q") ?? "";

  if (!query.trim()) {
    return c.html(<SearchResultsFragment query="" results={[]} />);
  }

  const results = performLocalSearch(query, searchIndex);

  // Cache search results for 1 hour at the edge
  c.header("Cache-Control", CACHE_CONTROL.DEFAULT);

  return c.html(<SearchResultsFragment query={query} results={results} />);
});

export default apiRouter;
