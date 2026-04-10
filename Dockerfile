# Use the official Bun image
FROM oven/bun:latest AS base
WORKDIR /app

# --- Stage 1: Dependencies ---
FROM base AS install
# Use bind mounts for package files and cache mount for bun's cache to speed up installation
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lock,target=bun.lock \
    --mount=type=bind,source=apps/web/package.json,target=apps/web/package.json \
    --mount=type=bind,source=packages/content/package.json,target=packages/content/package.json \
    --mount=type=bind,source=packages/search/package.json,target=packages/search/package.json \
    --mount=type=bind,source=packages/ui/package.json,target=packages/ui/package.json \
    --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# --- Stage 2: Build ---
FROM base AS build
# Copy node_modules from install stage (includes root and workspace node_modules)
COPY --from=install /app /app
# Copy the rest of the source code
COPY . .

# Run the build script
RUN bun run build

# --- Stage 3: Runner ---
FROM base AS runner
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app .

EXPOSE 8787

ENV CI=true
ENV WRANGLER_SEND_METRICS=false

# Use bunx to run wrangler dev from the apps/web directory
WORKDIR /app/apps/web
CMD ["bunx", "wrangler", "dev"]
