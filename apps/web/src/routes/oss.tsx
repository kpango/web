import cvData from "@kpango/content/cv.json";
import { Badge, BadgeList, GitHubIcon, PageHeader, cn } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { cardClass, textPrimary, textSecondary } from "../lib/styles";
import type { CV } from "../types/index";

const cv = cvData as CV;

export const OSSPage: FC = () => (
  <PageShell
    title="OSS Projects — kpango"
    description="Open-source projects by Yusuke Kato (kpango): Vald, Gache, Glg, Fastime, Garm, Athenz Authorizer, Authorization Proxy, Athenz Client Sidecar."
    path="/oss"
  >
    <PageHeader
      title="Open Source Projects"
      subtitle="Projects I've founded, maintain, and contribute to. Production-grade libraries and platforms used at LINE Yahoo! Japan scale."
    />

    <div class="space-y-6">
      {cv.oss.map((project) => (
        <article
          key={project.name}
          class={cn(
            cardClass,
            "overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
          )}
        >
          <div class="p-6">
            <div class="flex items-start justify-between gap-4 mb-3">
              <div class="flex items-center gap-3">
                <h2 class={cn("text-xl font-bold", textPrimary)}>{project.name}</h2>
                {project.stars && (
                  <Badge variant="yellow">⭐ {project.stars.toLocaleString()}</Badge>
                )}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground bg-secondary rounded-lg hover:bg-muted transition-colors"
              >
                <GitHubIcon class="w-4 h-4" />
                GitHub
              </a>
            </div>

            <p class={cn("mb-4 leading-relaxed", textSecondary)}>{project.description}</p>

            <BadgeList items={project.tags} variant="indigo" class="gap-1.5" />

            {project.highlight && (
              <div class="mt-4 flex gap-2 p-3 bg-accent rounded-xl border border-primary/20">
                <span class="text-primary shrink-0 mt-0.5">💡</span>
                <p class="text-sm text-accent-foreground">{project.highlight}</p>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  </PageShell>
);
