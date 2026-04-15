---
title: Hello World — kpango.com is live
description: >-
  Introducing the new kpango.com personal portal built with Hono, HTMX, and
  Tailwind CSS
date: '2026-04-08'
tags:
  - Meta
  - Hono
  - HTMX
  - TypeScript
  - Cloudflare
lastUpdated: '2026-04-15'
---

# Hello World

Welcome to the new **kpango.com** — my personal portal, rebuilt from scratch.

## Why a rebuild?

The old site was a static GitHub Pages export. It served its purpose, but I wanted something that felt more like a living document: a place where my CV, OSS projects, and occasional blog posts all live together in a fast, maintainable codebase.

## Tech stack

 - **[Hono](https://hono.dev)** — lightweight edge-ready web framework for [TypeScript](https://www.typescriptlang.org)
- **[HTMX](https://htmx.org)** — hypermedia-driven interactivity without a heavy JS framework
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first CSS for rapid, consistent styling
- **[Cloudflare Workers](https://workers.cloudflare.com)** — globally distributed, near-zero cold starts
- **[TypeScript](https://www.typescriptlang.org)** — strict mode throughout; no `any`

The entire UI is rendered server-side with `hono/jsx`. HTMX handles partial page updates and `hx-boost` gives SPA-like navigation without a client-side router.

## What's here

- **/cv** — my full résumé with work history, education, and skills
- **/oss** — deep dives into the open-source projects I maintain (Vald, Gache, Glg, Garm…)
- **/blog** — occasional posts on distributed systems, Go, and whatever I'm hacking on

## What's next

I plan to add vector search powered by Cloudflare Vectorize so you can semantically search across all content on the site. Stay tuned.

---

*kpango — Tokyo, 2026*
