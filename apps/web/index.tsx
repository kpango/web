import { getAllPosts, getPost, searchIndex } from "@kpango/content";
import { performLocalSearch } from "@kpango/search";
import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { ErrorPage } from "./src/components/ErrorPage";
import { BlogListPage } from "./src/routes/blog";
import { BlogPostPage } from "./src/routes/blog/[slug]";
import { CVPage } from "./src/routes/cv";
import { HomePage } from "./src/routes/index";
import { OSSPage } from "./src/routes/oss";
import { SearchResultsFragment } from "./src/routes/search";

const app = new Hono();

// ---- Middleware ----

app.use(
  "*",
  jsxRenderer(({ children }) => <>{children}</>)
);

/** Cache static assets for 1 year (immutable, Cloudflare CDN busts on deploy). */
app.use("/assets/*", async (c, next) => {
  await next();
  if (c.res.ok) {
    c.res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }
});

/** Cache HTML pages at the edge for 60 s, stale-while-revalidate for 300 s. */
app.use("*", async (c, next) => {
  await next();
  if (
    !c.res.headers.has("Cache-Control") &&
    c.res.headers.get("Content-Type")?.includes("text/html")
  ) {
    c.res.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  }
});

// ---- Page routes ----

app.get("/", (c) => c.html(<HomePage />));
app.get("/cv", (c) => c.html(<CVPage />));
app.get("/oss", (c) => c.html(<OSSPage />));
app.get("/blog", (c) => c.html(<BlogListPage posts={getAllPosts()} />));

app.get("/blog/:slug", (c) => {
  const slug = c.req.param("slug");
  const post = getPost(slug);
  if (!post) {
    return c.html(<ErrorPage status={404} message={`Blog post "${slug}" not found`} />, 404);
  }
  return c.html(
    <BlogPostPage
      slug={post.slug}
      title={post.frontmatter.title}
      description={post.frontmatter.description}
      date={post.frontmatter.date}
      tags={post.frontmatter.tags}
      htmlContent={post.html}
    />
  );
});

// ---- API routes ----

app.get("/api/search", (c) => {
  const query = c.req.query("q") ?? "";
  if (!query.trim()) {
    return c.html(<SearchResultsFragment query="" results={[]} />);
  }
  const results = performLocalSearch(query, searchIndex);
  return c.html(<SearchResultsFragment query={query} results={results} />);
});

// ---- Error handling ----

app.notFound((c) =>
  c.html(<ErrorPage status={404} message="The page you're looking for doesn't exist." />, 404)
);

app.onError((_err, c) =>
  c.html(<ErrorPage status={500} message="Something went wrong. Please try again later." />, 500)
);

export default app;
