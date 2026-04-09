# ── Stage 1: Install dependencies ──────────────────────
FROM node:22-slim AS deps

WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/
COPY packages/ui/package.json packages/ui/
COPY packages/content/package.json packages/content/
COPY packages/search/package.json packages/search/
RUN npm ci

# ── Stage 2: Build and test ────────────────────────────
FROM deps AS build

COPY . .
RUN npx tsc --noEmit -p apps/web/tsconfig.json
RUN npx vitest run
RUN cd apps/web && npx vite build

# ── Stage 3: Production-like dev server ────────────────
FROM deps AS runtime

COPY . .
COPY --from=build /app/apps/web/dist apps/web/dist

WORKDIR /app/apps/web
EXPOSE 8787
CMD ["npx", "wrangler", "dev", "--ip", "0.0.0.0", "--port", "8787"]
