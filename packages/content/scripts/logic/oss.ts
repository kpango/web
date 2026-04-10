import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { normalize, stripMarkdown, writeIfChanged } from "./utils";

export interface OssFrontmatter {
  title: string;
  description: string;
  github: string;
  stars: number;
  tags: string[];
  highlight?: string;
}

export interface OssProject {
  slug: string;
  frontmatter: OssFrontmatter;
  body: string;
  html: string;
}

export async function buildOss(ossDir: string, ossTsPath: string): Promise<OssProject[]> {
  const ossFiles = fs.readdirSync(ossDir).filter((f) => f.endsWith(".md"));
  const ossProjects: OssProject[] = [];

  for (const file of ossFiles) {
    const slug = file.replace(".md", "");
    const filePath = path.join(ossDir, file);
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
  search: {
    titleLow: string;
    excerptLow: string;
    keywordsLow: string;
  };
}

const oss: Record<string, OssEntry> = {
${ossProjects
  .map((project) => {
    const fullContent = `${project.frontmatter.title} ${project.frontmatter.description} ${project.frontmatter.tags.join(" ")} ${stripMarkdown(project.body)}`;
    const search = {
      titleLow: project.frontmatter.title.toLowerCase(),
      excerptLow: project.frontmatter.description.toLowerCase(),
      keywordsLow: normalize(fullContent).toLowerCase(),
    };
    return `  "${project.slug}": {
    slug: "${project.slug}",
    frontmatter: ${JSON.stringify(project.frontmatter, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/\n}/g, "\n    }")},
    html: \`${project.html.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
    search: ${JSON.stringify(search, null, 2).replace(/"([^"]+)":/g, "$1:").replace(/\n}/g, "\n    }")},
  },`;
  })
  .join("\n")}
};

export function getOss(slug: string): OssEntry | undefined {
  return oss[slug];
}

let cachedOss: OssEntry[] | null = null;

export function getAllOss(): OssEntry[] {
  if (cachedOss) return cachedOss;
  cachedOss = Object.values(oss).sort((a, b) => b.frontmatter.stars - a.frontmatter.stars);
  return cachedOss;
}
`;

  writeIfChanged(ossTsPath, ossTsContent);
  return ossProjects;
}
