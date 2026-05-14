import siteData from "../site.json";
import { getAllOss } from "./oss";
import { getAllPosts } from "./posts";

export { default as siteData } from "../site.json";
export type { OssEntry } from "./oss";
export { getAllOss, getOss } from "./oss";
export type { PostEntry } from "./posts";
export { getAllPosts, getPost } from "./posts";

export const searchIndex = [
  ...(siteData.searchIndex || []).map((entry) => ({
    ...entry,
    titleLow: entry.title.toLowerCase(),
    excerptLow: entry.excerpt.toLowerCase(),
    keywordsLow: entry.keywords.toLowerCase(),
  })),
  ...getAllOss().map((o) => ({
    id: `oss-${o.slug}`,
    title: o.frontmatter.title,
    url: `/oss/${o.slug}`,
    excerpt: o.frontmatter.description,
    keywords: o.search.keywordsLow, // Use lowercased as main keywords for simplicity
    ...o.search,
  })),
  ...getAllPosts().map((p) => ({
    id: `blog-${p.slug}`,
    title: p.frontmatter.title,
    url: `/blog/${p.slug}`,
    excerpt: p.frontmatter.description,
    keywords: p.search.keywordsLow, // Use lowercased as main keywords for simplicity
    ...p.search,
  })),
];
