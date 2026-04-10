import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
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

export async function buildBlog(blogDir: string, postsTsPath: string): Promise<Post[]> {
  const mdFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  const posts: Post[] = [];

  let currentPostsTs = "";
  if (fs.existsSync(postsTsPath)) {
    currentPostsTs = fs.readFileSync(postsTsPath, "utf8");
  }

  for (const file of mdFiles) {
    const slug = file.replace(".md", "");
    const filePath = path.join(blogDir, file);
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
    search: ${JSON.stringify(search, null, 2).replace(/"([^"]+)":/g, "$1:").replace(/\n}/g, "\n    }")},
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

  writeIfChanged(postsTsPath, postsTsContent);
  return posts;
}
