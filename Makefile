.PHONY: all install dev build test lint typecheck format deploy clean update help \
       docker-build docker-test docker-run docker-push

# Default target
all: install build test lint typecheck

## ── Setup ──────────────────────────────────────────────

# Install all dependencies
install:
	npm install

## ── Development ────────────────────────────────────────

# Start the local development server (Cloudflare Workers runtime)
dev:
	cd apps/web && npx wrangler dev

## ── Build ──────────────────────────────────────────────

# Build CSS assets (Tailwind → dist/assets/main.css)
build:
	cd apps/web && npx tsc -b && npx vite build

## ── Quality ────────────────────────────────────────────

# Run all tests
test:
	npx vitest run

# Lint with Biome
lint:
	cd apps/web && npx biome check .

# TypeScript type checking
typecheck:
	npx tsc --noEmit -p apps/web/tsconfig.json

# Auto-format code with Biome
format:
	cd apps/web && npx biome check --write .

## ── Deploy ─────────────────────────────────────────────

# Deploy to Cloudflare Workers (requires CLOUDFLARE_API_TOKEN)
deploy: build
	cd apps/web && npx wrangler deploy

## ── Maintenance ────────────────────────────────────────

# Update all dependencies to latest compatible versions
update:
	npm update
	npm outdated || true

# Remove build artifacts and caches
clean:
	rm -rf apps/web/dist
	rm -rf apps/web/.wrangler
	rm -rf node_modules/.cache
	rm -rf coverage

## ── Docker ─────────────────────────────────────────────

DOCKER_IMAGE ?= kpango/web
DOCKER_TAG   ?= latest

# Build the Docker image (runs typecheck, tests, and CSS build inside the container)
docker-build:
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

# Run typecheck and tests inside a disposable container (no image kept)
docker-test:
	docker build --target build -t $(DOCKER_IMAGE):test .

# Start a local dev server in Docker on port 8787
docker-run:
	docker run --rm --name kpango -p 8787:8787 $(DOCKER_IMAGE):$(DOCKER_TAG)

# Push the Docker image to Docker Hub
docker-push: docker-build
	docker push $(DOCKER_IMAGE):$(DOCKER_TAG)

## ── Help ───────────────────────────────────────────────

# Show available commands
help:
	@echo ""
	@echo "  make install      — Install all dependencies"
	@echo "  make dev          — Start local dev server (wrangler)"
	@echo "  make build        — Build CSS assets"
	@echo "  make test         — Run all tests"
	@echo "  make lint         — Lint with Biome"
	@echo "  make typecheck    — TypeScript type checking"
	@echo "  make format       — Auto-format code with Biome"
	@echo "  make deploy       — Deploy to Cloudflare Workers"
	@echo "  make update       — Update dependencies"
	@echo "  make clean        — Remove build artifacts"
	@echo "  make docker-build — Build Docker image (includes tests)"
	@echo "  make docker-test  — Run typecheck + tests in Docker"
	@echo "  make docker-run   — Start dev server in Docker (port 8787)"
	@echo "  make docker-push  — Push Docker image to Docker Hub"
	@echo "  make help         — Show this help"
	@echo ""
