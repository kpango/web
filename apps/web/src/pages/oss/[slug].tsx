import { Badge, ChevronLeftIcon, cn, GitHubIcon } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { raw } from "hono/utils/html";
import { PageShell } from "../../components/PageShell";
import { cardClass, textPrimary, textSecondary } from "../../lib/styles";
import { proseStyles } from "../../styles/inline-css.js";

interface OssProjectPageProps {
  slug: string;
  title: string;
  description: string;
  github: string;
  stars?: number;
  tags: string[];
  htmlContent: string;
}

export const OssProjectPage: FC<OssProjectPageProps> = ({
  slug,
  title,
  description,
  github,
  stars,
  tags,
  htmlContent,
}) => (
  <PageShell
    title={`${title} — kpango`}
    description={description}
    path={`/oss/${slug}`}
    currentPath="/oss"
    head={<style>{raw(proseStyles)}</style>}
  >
    {/* Back link */}
    <a
      href="/oss"
      class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
    >
      <ChevronLeftIcon />
      Back to OSS
    </a>

    <article class={cn(cardClass, "overflow-hidden")}>
      <div class="p-8 sm:p-10">
        {/* Metadata */}
        <div class="mb-6">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div class="flex flex-wrap items-center gap-2">
              {stars && <Badge variant="yellow">⭐ {stars.toLocaleString()}</Badge>}
              {tags.map((tag) => (
                <Badge key={tag} variant="indigo">
                  {tag}
                </Badge>
              ))}
            </div>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              class="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-muted transition-colors rounded-lg border border-border"
            >
              <GitHubIcon class="w-4 h-4" />
              View on GitHub
            </a>
          </div>
          <h1 class={cn("text-3xl sm:text-4xl font-bold leading-tight", textPrimary)}>{title}</h1>
          {description && (
            <p class={cn("mt-3 text-lg leading-relaxed", textSecondary)}>{description}</p>
          )}
        </div>

        <hr class="border-border mb-8" />

        {/* Content */}
        <div class="prose prose-indigo dark:prose-invert max-w-none">{raw(htmlContent)}</div>
      </div>
    </article>

    {/* Author Card */}
    <div class={cn("mt-8 flex items-center gap-4 p-5", cardClass)}>
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
        Y
      </div>
      <div>
        <p class={cn("font-semibold", textPrimary)}>Yusuke Kato</p>
        <p class={cn("text-sm", textSecondary)}>
          Individual Contributor @ LY Corporation ·{" "}
          <a
            href="https://github.com/kpango"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            @kpango
          </a>
        </p>
      </div>
    </div>
  </PageShell>
);
