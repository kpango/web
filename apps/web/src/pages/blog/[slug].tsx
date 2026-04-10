import { Badge, ChevronLeftIcon, cn } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { raw } from "hono/utils/html";
import { PageShell } from "../../components/PageShell";
import { formatDisplayDate } from "../../lib/format";
import { cardClass, textPrimary, textSecondary } from "../../lib/styles";
import { proseStyles } from "../../styles/inline-css.js";

interface BlogPostPageProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  tags: string[];
  htmlContent: string;
}

export const BlogPostPage: FC<BlogPostPageProps> = ({
  slug,
  title,
  description,
  date,
  lastUpdated,
  tags,
  htmlContent,
}) => (
  <PageShell
    title={`${title} — kpango`}
    description={description}
    path={`/blog/${slug}`}
    currentPath="/blog"
    head={<style>{raw(proseStyles)}</style>}
  >
    {/* Back link */}
    <a
      href="/blog"
      class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
    >
      <ChevronLeftIcon />
      Back to Blog
    </a>

    <article class={cn(cardClass, "overflow-hidden")}>
      <div class="p-8 sm:p-10">
        {/* Metadata */}
        <div class="mb-6">
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span class="text-sm text-muted-foreground font-mono">
              {formatDisplayDate(date)}
              {lastUpdated && lastUpdated !== date && (
                <span class="ml-2 pl-2 border-l border-border opacity-70">
                  Last updated: {formatDisplayDate(lastUpdated)}
                </span>
              )}
            </span>
            {tags.map((tag) => (
              <Badge key={tag} variant="indigo">
                {tag}
              </Badge>
            ))}
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

    {/* Author */}
    <div class={cn("mt-8 flex items-center gap-4 p-5", cardClass)}>
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
        Y
      </div>
      <div>
        <p class={cn("font-semibold", textPrimary)}>Yusuke Kato</p>
        <p class={cn("text-sm", textSecondary)}>
          Lead Researcher @ Yahoo Japan ·{" "}
          <a
            href="https://twitter.com/kpang0"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            @kpang0
          </a>
        </p>
      </div>
    </div>
  </PageShell>
);
