import { OssCard, PageHeader } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { ContentService } from "../lib/services";

export const OSSPage: FC = () => {
  const ossList = ContentService.getFeaturedOss(100); // Get all
  const siteData = ContentService.getSiteData();

  return (
    <PageShell
      title={`${siteData.oss.title} — kpango`}
      description={siteData.meta.defaultDescription}
      path="/oss"
    >
      <PageHeader title={siteData.oss.title} subtitle={siteData.oss.subtitle} />

      <div class="grid gap-6">
        {ossList.map((project) => (
          <OssCard key={project.slug} slug={project.slug} frontmatter={project.frontmatter} />
        ))}
      </div>
    </PageShell>
  );
};
