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

  return c.html(<BlogPostPage post={post} />);
});

pageRouter.get("/oss/:slug", (c) => {
  const slug = c.req.param("slug");
  const project = getOss(slug);

  if (!project) {
    return c.html(<ErrorPage status={404} message={`OSS Project "${slug}" not found`} />, 404);
  }

  return c.html(<OssProjectPage project={project} />);
});

export default pageRouter;
