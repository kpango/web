import { getAllPosts, getOss, getPost } from "@kpango/content";
import { Hono } from "hono";
import { ErrorPage } from "../components/ErrorPage";
import { BlogListPage } from "./blog";
import { BlogPostPage } from "./blog/[slug]";
import { CVPage } from "./cv";
import { HomePage } from "./index";
import { OSSPage } from "./oss";
import { OssProjectPage } from "./oss/[slug]";

const pageRouter = new Hono();

pageRouter.get("/", (c) => c.html(<HomePage />));
pageRouter.get("/cv", (c) => c.html(<CVPage />));
pageRouter.get("/oss", (c) => c.html(<OSSPage />));
pageRouter.get("/blog", (c) => c.html(<BlogListPage posts={getAllPosts()} />));

pageRouter.get("/blog/:slug", (c) => {
  const slug = c.req.param("slug");
  const post = getPost(slug);

  if (!post) {
    return c.html(<ErrorPage status={404} message={`Blog post "${slug}" not found`} />, 404);
  }

  return c.html(
    <BlogPostPage
      slug={post.slug}
      title={post.frontmatter.title}
      description={post.frontmatter.description}
      date={post.frontmatter.date}
      lastUpdated={post.frontmatter.lastUpdated}
      tags={post.frontmatter.tags}
      htmlContent={post.html}
    />
  );
});

pageRouter.get("/oss/:slug", (c) => {
  const slug = c.req.param("slug");
  const project = getOss(slug);

  if (!project) {
    return c.html(<ErrorPage status={404} message={`OSS Project "${slug}" not found`} />, 404);
  }

  return c.html(
    <OssProjectPage
      slug={project.slug}
      title={project.frontmatter.title}
      description={project.frontmatter.description}
      github={project.frontmatter.github}
      stars={project.frontmatter.stars}
      tags={project.frontmatter.tags}
      htmlContent={project.html}
    />
  );
});

export default pageRouter;
