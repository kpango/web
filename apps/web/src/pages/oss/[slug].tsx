import type { OssEntry } from "@kpango/content";
import { Badge, GitHubIcon } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { raw } from "hono/utils/html";
import { ContentLayout } from "../../components/ContentLayout";
import { ContentService } from "../../lib/services";

interface OssProjectPageProps {
  project: OssEntry;
}

export const OssProjectPage: FC<OssProjectPageProps> = ({ project }) => {
  const { slug, frontmatter, html: htmlContent } = project;
  const { title, description, github, stars, tags } = frontmatter;
  const siteData = ContentService.getSiteData();
  const author = ContentService.getAuthor();

  return (
    <ContentLayout
      title={title}
      description={description}
      path={`/oss/${slug}`}
      currentPath="/oss"
      backLabel={siteData.oss.backLabel}
      backHref="/oss"
      author={author}
      metadata={
        <div class="flex flex-wrap items-center gap-2">
          {stars && <Badge variant="yellow">⭐ {stars.toLocaleString()}</Badge>}
          {tags.map((tag) => (
            <Badge key={tag} variant="indigo">
              {tag}
            </Badge>
          ))}
        </div>
      }
      headerExtras={
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-muted transition-colors rounded-lg border border-border"
        >
          <GitHubIcon class="w-4 h-4" />
          {siteData.oss.viewOnGitHub}
        </a>
      }
    >
      {raw(htmlContent)}
    </ContentLayout>
  );
};
