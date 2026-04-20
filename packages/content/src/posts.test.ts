import { describe, expect, it } from "vitest";
import { getAllPosts, getPost } from "./posts";

describe("getPost", () => {
  it("returns a post by slug", () => {
    const post = getPost("hello-world");
    expect(post).toBeDefined();
    expect(post?.slug).toBe("hello-world");
    expect(post?.frontmatter.title).toContain("Hello World");
  });

  it("returns undefined for unknown slug", () => {
    const post = getPost("nonexistent");
    expect(post).toBeUndefined();
  });
});

describe("getAllPosts", () => {
  it("returns all posts as an array", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThanOrEqual(1);
  });

  it("posts are sorted by date descending", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      const prev = new Date(posts[i - 1].frontmatter.date).getTime();
      const curr = new Date(posts[i].frontmatter.date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("each post has required fields", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.frontmatter.title).toBeTruthy();
      expect(post.frontmatter.date).toBeTruthy();
      expect(post.html).toBeTruthy();
    }
  });
});
