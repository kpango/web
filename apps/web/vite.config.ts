import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/styles/globals.css",
      },
      output: {
        // Use a stable filename so the Worker can reference it with a known
        // path.  Cloudflare's edge cache handles invalidation on each deploy.
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
