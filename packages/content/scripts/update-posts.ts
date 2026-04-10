import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";
import { createHighlighter, bundledLanguages, bundledThemes } from "shiki";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_DIR = path.resolve(ROOT_DIR, "blog");
const OSS_DIR = path.resolve(ROOT_DIR, "oss");
const SRC_DIR = path.resolve(ROOT_DIR, "src");
const POSTS_TS_PATH = path.resolve(SRC_DIR, "posts.ts");
const OSS_TS_PATH = path.resolve(SRC_DIR, "oss.ts");
const SEARCH_INDEX_TS_PATH = path.resolve(SRC_DIR, "search-index.ts");

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  tags: string[];
}

interface OssFrontmatter {
  title: string;
  description: string;
  github: string;
  stars: number;
  tags: string[];
  highlight?: string;
}

interface Post {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
  html: string;
}

interface OssProject {
  slug: string;
  frontmatter: OssFrontmatter;
  body: string;
  html: string;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function writeIfChanged(filePath: string, newContent: string) {
  if (fs.existsSync(filePath)) {
    const currentContent = fs.readFileSync(filePath, "utf8");
    if (currentContent === newContent) {
      return;
    }
  }
  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${path.basename(filePath)}`);
}

async function updatePosts() {
  const highlighter = await createHighlighter({
    themes: ["catppuccin-latte", "tokyo-night"],
    langs: Object.keys(bundledLanguages),
  });

  marked.use({
    renderer: {
      code(codeOrToken: any, langOrUndefined: any) {
        const text = typeof codeOrToken === "string" ? codeOrToken : codeOrToken.text;
        const lang = (typeof codeOrToken === "string" ? langOrUndefined : codeOrToken.lang) || "";
        const mappedLang = lang.toLowerCase();

        try {
          return highlighter.codeToHtml(text, {
            lang: mappedLang || "plaintext",
            themes: {
              light: "catppuccin-latte",
              dark: "tokyo-night",
            },
          });
        } catch (e) {
          console.error(`Failed to highlight ${mappedLang}:`, e);
          return `<pre><code>${text}</code></pre>`;
        }
      },
    },
  });

  // --- Blog Posts ---
  const mdFiles = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts: Post[] = [];

  let currentPostsTs = "";
  if (fs.existsSync(POSTS_TS_PATH)) {
    currentPostsTs = fs.readFileSync(POSTS_TS_PATH, "utf8");
  }

  for (const file of mdFiles) {
    const slug = file.replace(".md", "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content: body } = matter(fileContent);
    const frontmatter = data as Frontmatter;

    const html = await marked.parse(body);

    const currentMetadata = { ...frontmatter };
    delete currentMetadata.lastUpdated;

    const postInTsRegex = new RegExp(`"${slug}":\\s*{[\\s\\S]*?html:\\s*\`(.*)\`\\s*},?`, "m");
    const match = currentPostsTs.match(postInTsRegex);
    const existingHtml = match ? match[1] : null;

    let shouldUpdateLastUpdated = false;

    if (!existingHtml) {
      shouldUpdateLastUpdated = true;
    } else {
      if (html.trim() !== existingHtml.trim()) {
        shouldUpdateLastUpdated = true;
      }

      if (
        !currentPostsTs.includes(`title: "${frontmatter.title}"`) ||
        !currentPostsTs.includes(`description: "${frontmatter.description}"`)
      ) {
        shouldUpdateLastUpdated = true;
      }
    }

    if (shouldUpdateLastUpdated) {
      const today = getToday();
      if (frontmatter.lastUpdated !== today) {
        frontmatter.lastUpdated = today;
        const updatedContent = matter.stringify(body, frontmatter);
        writeIfChanged(filePath, updatedContent);
      }
    }

    posts.push({
      slug,
      frontmatter,
      body,
      html: html.trim(),
    });
  }

  const postsTsContent = `export interface PostEntry {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    lastUpdated?: string;
    tags: string[];
  };
  html: string;
}

const posts: Record<string, PostEntry> = {
${posts
  .map(
    (post) => `  "${post.slug}": {
    slug: "${post.slug}",
    frontmatter: ${JSON.stringify(post.frontmatter, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/\n}/g, "\n    }")},
    html: \`${post.html.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
  },`
  )
  .join("\n")}
};

export function getPost(slug: string): PostEntry | undefined {
  return posts[slug];
}

export function getAllPosts(): PostEntry[] {
  return Object.values(posts).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}
`;

  writeIfChanged(POSTS_TS_PATH, postsTsContent);

  // --- OSS Projects ---
  const ossFiles = fs.readdirSync(OSS_DIR).filter((f) => f.endsWith(".md"));
  const ossProjects: OssProject[] = [];

  for (const file of ossFiles) {
    const slug = file.replace(".md", "");
    const filePath = path.join(OSS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content: body } = matter(fileContent);
    const frontmatter = data as OssFrontmatter;
    const html = await marked.parse(body);

    ossProjects.push({
      slug,
      frontmatter,
      body,
      html: html.trim(),
    });
  }

  const ossTsContent = `export interface OssEntry {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    github: string;
    stars: number;
    tags: string[];
    highlight?: string;
  };
  html: string;
}

const oss: Record<string, OssEntry> = {
${ossProjects
  .map(
    (project) => `  "${project.slug}": {
    slug: "${project.slug}",
    frontmatter: ${JSON.stringify(project.frontmatter, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/\n}/g, "\n    }")},
    html: \`${project.html.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
  },`
  )
  .join("\n")}
};

export function getOss(slug: string): OssEntry | undefined {
  return oss[slug];
}

export function getAllOss(): OssEntry[] {
  return Object.values(oss).sort((a, b) => b.frontmatter.stars - a.frontmatter.stars);
}
`;

  writeIfChanged(OSS_TS_PATH, ossTsContent);

  // --- Search Index ---
  const blogSearchEntries = posts.map((post) => ({
    id: `blog-${post.slug}`,
    title: post.frontmatter.title,
    url: `/blog/${post.slug}`,
    excerpt: post.frontmatter.description,
    keywords: `${post.frontmatter.tags.join(" ").toLowerCase()} blog`,
  }));

  const ossSearchEntries = ossProjects.map((project) => ({
    id: `oss-${project.slug}`,
    title: project.frontmatter.title,
    url: `/oss/${project.slug}`,
    excerpt: project.frontmatter.description,
    keywords: `${project.frontmatter.tags.join(" ").toLowerCase()} oss open source ${project.slug}`,
  }));

  const finalSearchIndexTs = `export interface SearchIndexEntry {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  keywords: string;
}

export const searchIndex: SearchIndexEntry[] = [
  {
    id: "cv",
    title: "CV — Yusuke Kato",
    url: "/cv",
    excerpt:
      "Distributed Systems, Search, Cloud, and Security specialist at LY Corporation. Expert in Go, Kubernetes, and distributed systems.",
    keywords:
      "cv resume work experience education yusuke kato kpango line yahoo japan vector search kubernetes go distributed systems security athenz awards",
  },
${ossSearchEntries
  .map(
    (entry) =>
      `  ${JSON.stringify(entry, null, 2)
        .replace(/"([^"]+)":/g, "$1:")
        .replace(/\n/g, "\n  ")},`
  )
  .join("\n")}
${blogSearchEntries
  .map(
    (entry) =>
      `  ${JSON.stringify(entry, null, 2)
        .replace(/"([^"]+)":/g, "$1:")
        .replace(/\n/g, "\n  ")},`
  )
  .join("\n")}
];
`;

  writeIfChanged(SEARCH_INDEX_TS_PATH, finalSearchIndexTs);

  const { execSync } = await import("node:child_process");
  try {
    execSync(`bunx @biomejs/biome format --write ${POSTS_TS_PATH} ${OSS_TS_PATH} ${SEARCH_INDEX_TS_PATH}`);
  } catch (e) {
    console.error("Failed to format files with Biome:", e);
  }
}

updatePosts().catch(console.error);
