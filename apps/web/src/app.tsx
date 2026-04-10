import { Hono } from "hono";
import { etag } from "hono/etag";
import { jsxRenderer } from "hono/jsx-renderer";
import { secureHeaders } from "hono/secure-headers";
import apiRouter from "./api/routes";
import { ErrorPage } from "./components/ErrorPage";
import { securityHeaders } from "./lib/security";
import { assetsMiddleware } from "./middleware/assets-middleware";
import { htmlMiddleware } from "./middleware/html-middleware";
import pageRouter from "./pages/routes";

const app = new Hono();

// ---- Middleware ----

app.use(etag());
app.use(secureHeaders(securityHeaders));

// Centralized HTML middleware (Early Hints & HTML Caching)
app.use("*", htmlMiddleware());

// Optimized Assets middleware (Long-term caching)
app.use("/assets/*", assetsMiddleware());

app.use(jsxRenderer(({ children }) => <>{children}</>));

// ---- Mount Routers ----

app.route("/", pageRouter);
app.route("/api", apiRouter);

// ---- Error handling ----

app.notFound((c) =>
  c.html(<ErrorPage status={404} message="The page you're looking for doesn't exist." />, 404)
);

app.onError((_err, c) =>
  c.html(<ErrorPage status={500} message="Something went wrong. Please try again later." />, 500)
);

export default app;
