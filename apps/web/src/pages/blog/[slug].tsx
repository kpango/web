import type { PostEntry } from "@kpango/content";
import { Badge } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { raw } from "hono/utils/html";
import { ContentLayout } from "../../components/ContentLayout";
import { formatDisplayDate } from "../../lib/format";
import { ContentService } from "../../lib/services";

interface BlogPostPageProps {
  post: PostEntry;
}

export const BlogPostPage: FC<BlogPostPageProps> = ({ post }) => {
  const { slug, frontmatter, html: htmlContent } = post;
  const { title, description, date, lastUpdated, tags } = frontmatter;
  const siteData = ContentService.getSiteData();
  const author = ContentService.getAuthor();

  return (
    <ContentLayout
      title={title}
      description={description}
      path={`/blog/${slug}`}
      currentPath="/blog"
      backLabel={siteData.blog.backLabel}
      backHref="/blog"
      author={author}
      metadata={
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-sm text-muted-foreground font-mono">
            {formatDisplayDate(date)}
            {lastUpdated && lastUpdated !== date && (
              <span class="ml-2 pl-2 border-l border-border opacity-70">
                {siteData.blog.lastUpdated}: {formatDisplayDate(lastUpdated)}
              </span>
            )}
          </span>
          {tags.map((tag) => (
            <Badge key={tag} variant="indigo">
              {tag}
            </Badge>
          ))}
        </div>
      }
    >
      {raw(htmlContent)}
    </ContentLayout>
  );
};
