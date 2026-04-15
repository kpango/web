import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { PostEntry } from "../../src/posts"; // Adjust import path depending on where logic/blog.ts is
import { getToday, normalize, stripMarkdown, writeIfChanged } from "./utils";

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  tags: string[];
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
  html: string;
}

async function getExistingPosts(postsTsPath: string): Promise<Record<string, PostEntry>> {
  if (fs.existsSync(postsTsPath)) {
    try {
      // Dynamic import requires file URL to bypass cache or just import it.
      // But since it's a TS file, bun can import it directly!
      const mod = await import(postsTsPath);
      // we need to access the unexported `posts` object, BUT `getPost` and `getAllPosts` are exported!
      const all = mod.getAllPosts() as PostEntry[];
      const map: Record<string, PostEntry> = {};
      for (const p of all) {
        map[p.slug] = p;
      }
      return map;
    } catch (e) {
      console.warn("Failed to load existing posts.ts, treating as empty.", e);
    }
  }
  return {};
}

function checkShouldUpdate(
  _slug: string,
  html: string,
  frontmatter: Frontmatter,
  existingPost: PostEntry | undefined
): boolean {
  if (!existingPost) return true;
  if (html.trim() !== existingHtml(existingPost)) return true;
  if (existingPost.frontmatter.title !== frontmatter.title) return true;
  if (existingPost.frontmatter.description !== frontmatter.description) return true;
  return false;
}

function existingHtml(post: PostEntry): string {
  return post.html.trim();
}

function updateFrontmatterIfChanged(
  filePath: string,
  body: string,
  frontmatter: Frontmatter
): void {
  const today = getToday();
  if (frontmatter.lastUpdated !== today) {
    frontmatter.lastUpdated = today;
    const updatedContent = matter.stringify(body, frontmatter);
    writeIfChanged(filePath, updatedContent);
  }
}

function generatePostsTsContent(posts: Post[]): string {
  return `export interface PostEntry {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    lastUpdated?: string;
    tags: string[];
  };
  html: string;
  search: {
    titleLow: string;
    excerptLow: string;
    keywordsLow: string;
  };
}

const posts: Record<string, PostEntry> = {
${posts
  .map((post) => {
    const fullContent = `${post.frontmatter.title} ${post.frontmatter.description} ${post.frontmatter.tags.join(" ")} ${stripMarkdown(post.body)}`;
    const search = {
      titleLow: post.frontmatter.title.toLowerCase(),
      excerptLow: post.frontmatter.description.toLowerCase(),
      keywordsLow: normalize(fullContent).toLowerCase(),
    };
    return `  "${post.slug}": {
    slug: "${post.slug}",
    frontmatter: ${JSON.stringify(post.frontmatter, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/\n}/g, "\n    }")},
    html: \`${post.html.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
    search: ${JSON.stringify(search, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/\n}/g, "\n    }")},
  },`;
  })
  .join("\n")}
};

export function getPost(slug: string): PostEntry | undefined {
  return posts[slug];
}

let cachedPosts: PostEntry[] | null = null;

export function getAllPosts(): PostEntry[] {
  if (cachedPosts) return cachedPosts;
  cachedPosts = Object.values(posts).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return cachedPosts;
}
`;
}

export async function buildBlog(blogDir: string, postsTsPath: string): Promise<Post[]> {
  const mdFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  const existingPosts = await getExistingPosts(postsTsPath);

  return await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.replace(".md", "");
      const filePath = path.join(blogDir, file);
      const fileContent = await fs.promises.readFile(filePath, "utf8");
      const { data, content: body } = matter(fileContent);
      const frontmatter = data as Frontmatter;

      const html = await marked.parse(body);
      const existingPost = existingPosts[slug];

      if (checkShouldUpdate(slug, html, frontmatter, existingPost)) {
        updateFrontmatterIfChanged(filePath, body, frontmatter);
      }

      return {
        slug,
        frontmatter,
        body,
        html: html.trim(),
      };
    })
  );
}
