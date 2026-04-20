import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

function inlineCssPlugin() {
  return {
    name: "inline-css",
    closeBundle() {
      const cssPath = path.join(process.cwd(), "dist/assets/main.css");
      const proseCssPath = path.join(process.cwd(), "dist/assets/prose.css");
      const outPath = path.join(process.cwd(), "src/styles/inline-css.ts");

      function escapeCss(css: string) {
        return css.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
      }

      let mainCss = "";
      let proseCss = "";

      if (fs.existsSync(cssPath)) {
        mainCss = fs.readFileSync(cssPath, "utf8").trim();
      }

      if (fs.existsSync(proseCssPath)) {
        proseCss = fs.readFileSync(proseCssPath, "utf8").trim();
      }

      let content = "";
      content += `export const inlineStyles = \`${escapeCss(mainCss)}\`;\n`;
      content += `export const proseStyles = \`${escapeCss(proseCss)}\`;\n`;

      fs.writeFileSync(outPath, content);
    },
  };
}

export default defineConfig({
  plugins: [inlineCssPlugin()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/styles/globals.css",
        prose: "src/styles/prose.css",
        ga: "src/ga.ts",
      },
      output: {
        // Use a stable filename so the Worker can reference it with a known
        // path.  Cloudflare's edge cache handles invalidation on each deploy.
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "assets/[name].js",
      },
    },
  },
  css: {
    postcss: "./postcss.config.ts",
  },
});
