# kpango.com — Personal Portal

Personal portal for [Yusuke Kato (@kpango)](https://github.com/kpango), built with Hono + HTMX + Tailwind CSS on Cloudflare Workers.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun (build) / Cloudflare Workers (production) |
| Language | TypeScript (strict) |
| Backend / Routing | [Hono](https://hono.dev) on Cloudflare Workers |
| Frontend | [HTMX](https://htmx.org) + `hono/jsx` SSR (no React) |
| Styling | Tailwind CSS |
| Linting | [Biome](https://biomejs.dev) |
| CI/CD | GitHub Actions → Cloudflare Workers |

## Monorepo Structure

```
apps/
  web/              # Hono app — Cloudflare Workers entry, all routes & components
packages/
  content/          # Markdown blog posts, cv.json, OSS documentation
  ui/               # Reusable hono/jsx components (Badge, CardLink, Spinner …)
  search/           # Local keyword search
.github/workflows/  # ci.yml (typecheck + lint + build), deploy.yml (Cloudflare Workers)
```

## Getting Started

```bash
# Install dependencies
make install

# Start local development server (Cloudflare Workers runtime)
make dev

# Build CSS assets
make build

# Run tests / lint / type check
make test
make lint
make typecheck

# Auto-format code
make format

# Deploy to Cloudflare Workers
make deploy

# Show all available commands
make help
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero — name, title, quick links |
| `/cv` | Full résumé with timeline, print-friendly |
| `/oss` | OSS project showcase (Vald, Gache, …) |
| `/blog` | Blog post listing |
| `/blog/:slug` | Individual blog post |
| `/api/search?q=…` | Keyword search → HTMX HTML fragment |

## License

MIT
