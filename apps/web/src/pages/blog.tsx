import type { PostEntry } from "@kpango/content";
import { BlogCard, PageHeader } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { formatDisplayDate } from "../lib/format";
import { ContentService } from "../lib/services";

interface BlogListPageProps {
  posts: PostEntry[];
}

export const BlogListPage: FC<BlogListPageProps> = ({ posts }) => {
  const siteData = ContentService.getSiteData();

  return (
    <PageShell
      title={`${siteData.blog.title} — kpango`}
      description={siteData.meta.defaultDescription}
      path="/blog"
    >
      <PageHeader title={siteData.blog.title} subtitle={siteData.blog.subtitle} />

      <div id="post-list" class="space-y-4">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            frontmatter={post.frontmatter}
            formatDisplayDate={formatDisplayDate}
          />
        ))}
      </div>
    </PageShell>
  );
};
