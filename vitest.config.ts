import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "packages/*/src/**/*.test.ts",
      "apps/*/src/**/*.test.ts",
      "apps/*/src/**/*.test.tsx",
    ],
  },
  resolve: {
    alias: {
      "@kpango/ui": "./packages/ui/src/index.ts",
      "@kpango/content": "./packages/content/src/index.ts",
      "@kpango/search": "./packages/search/src/index.ts",
    },
  },
});
