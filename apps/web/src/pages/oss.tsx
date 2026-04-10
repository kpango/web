import { getAllOss } from "@kpango/content";
import { Badge, BadgeList, cn, GitHubIcon, PageHeader } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { cardClass, textPrimary, textSecondary } from "../lib/styles";

export const OSSPage: FC = () => {
  const ossList = getAllOss();

  return (
    <PageShell
      title="OSS Projects — kpango"
      description="Open-source projects by Yusuke Kato (kpango): Vald, Gache, Glg, Fastime, Garm, Athenz Authorizer, Authorization Proxy, Athenz Client Sidecar."
      path="/oss"
    >
      <PageHeader
        title="Open Source Projects"
        subtitle="Projects I've founded, maintain, and contribute to. Production-grade libraries and platforms used at LY Corporation scale."
      />

      <div class="grid gap-6">
        {ossList.map((project) => (
          <article
            key={project.slug}
            class={cn(
              cardClass,
              "relative group overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all p-6"
            )}
          >
            <div class="flex items-start justify-between gap-4 mb-3">
              <div class="flex items-center gap-3">
                <h2
                  class={cn(
                    "text-xl font-bold group-hover:text-primary transition-colors",
                    textPrimary
                  )}
                >
                  <a href={`/oss/${project.slug}`} class="focus:outline-none">
                    <span class="absolute inset-0 z-10" aria-hidden="true" />
                    {project.frontmatter.title.split(" - ")[0]}
                  </a>
                </h2>
                {project.frontmatter.stars && (
                  <Badge variant="yellow">⭐ {project.frontmatter.stars.toLocaleString()}</Badge>
                )}
              </div>
              <div class="relative z-20">
                <a
                  href={project.frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground bg-secondary hover:bg-muted transition-colors rounded-lg border border-border"
                >
                  <GitHubIcon class="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>

            <p class={cn("mb-4 leading-relaxed relative z-20", textSecondary)}>
              {project.frontmatter.description}
            </p>

            <div class="relative z-20">
              <BadgeList items={project.frontmatter.tags} variant="indigo" class="gap-1.5" />
            </div>

            {project.frontmatter.highlight && (
              <div class="mt-4 flex gap-2 p-3 bg-accent rounded-xl border border-primary/20 relative z-20">
                <span class="text-primary shrink-0 mt-0.5">💡</span>
                <p class="text-sm text-accent-foreground">{project.frontmatter.highlight}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
};
