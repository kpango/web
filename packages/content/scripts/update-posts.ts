import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBlog } from "./logic/blog";
import { buildOss } from "./logic/oss";
import { buildSearchIndex } from "./logic/search";
import { setupMarkdownHighlighter } from "./logic/shiki";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_DIR = path.resolve(ROOT_DIR, "blog");
const OSS_DIR = path.resolve(ROOT_DIR, "oss");
const SRC_DIR = path.resolve(ROOT_DIR, "src");

const POSTS_TS_PATH = path.resolve(SRC_DIR, "posts.ts");
const OSS_TS_PATH = path.resolve(SRC_DIR, "oss.ts");

async function main() {
  await setupMarkdownHighlighter();

  await buildBlog(BLOG_DIR, POSTS_TS_PATH);
  await buildOss(OSS_DIR, OSS_TS_PATH);

  const { execSync } = await import("node:child_process");
  try {
    execSync(`bunx @biomejs/biome format --write ${POSTS_TS_PATH} ${OSS_TS_PATH}`);
  } catch (e) {
    console.error("Failed to format files with Biome:", e);
  }
}

main().catch(console.error);
