import type { FC } from "hono/jsx";
import { cn } from "../lib/cn";
import { textPrimary, textSecondary, dateMonoClass } from "../lib/styles";
import { Badge } from "./Badge";
import { BadgeList } from "./BadgeList";
import { CardLink } from "./CardLink";
import { GitHubIcon, ChevronRightIcon } from "./Icons";

export interface OssCardProps {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    github: string;
    stars?: number;
    tags: string[];
    highlight?: string;
  };
}

export const OssCard: FC<OssCardProps> = ({ slug, frontmatter }) => (
  <CardLink href={`/oss/${slug}`} class="group overflow-hidden">
    <div class="flex items-start justify-between gap-4 mb-3">
      <div class="flex items-center gap-3">
        <h2 class={cn("text-xl font-bold group-hover:text-primary transition-colors", textPrimary)}>
          {frontmatter.title.split(" - ")[0]}
        </h2>
        {frontmatter.stars && <Badge variant="yellow">⭐ {frontmatter.stars.toLocaleString()}</Badge>}
      </div>
      <div class="relative z-40">
        <a
          href={frontmatter.github}
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground bg-secondary hover:bg-muted transition-colors rounded-lg border border-border"
        >
          <GitHubIcon class="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>

    <p class={cn("mb-4 leading-relaxed", textSecondary)}>{frontmatter.description}</p>

    <div>
      <BadgeList items={frontmatter.tags} variant="indigo" class="gap-1.5" />
    </div>

    {frontmatter.highlight && (
      <div class="mt-4 flex gap-2 p-3 bg-accent rounded-xl border border-primary/20">
        <span class="text-primary shrink-0 mt-0.5">💡</span>
        <p class="text-sm text-accent-foreground">{frontmatter.highlight}</p>
      </div>
    )}
  </CardLink>
);

export interface BlogCardProps {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: string[];
  };
  formatDisplayDate: (iso: string) => string;
}

export const BlogCard: FC<BlogCardProps> = ({ slug, frontmatter, formatDisplayDate }) => (
  <article class="group">
    <CardLink href={`/blog/${slug}`}>
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 min-w-0">
          <h2 class={cn("text-lg font-semibold group-hover:text-primary transition-colors mb-1", textPrimary)}>
            {frontmatter.title}
          </h2>
          <p class={cn("text-sm leading-relaxed mb-3", textSecondary)}>{frontmatter.description}</p>
          <div class="flex flex-wrap items-center gap-2">
            <span class={dateMonoClass}>{formatDisplayDate(frontmatter.date)}</span>
            <span class="text-border">•</span>
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="gray">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <ChevronRightIcon class="w-5 h-5 text-border group-hover:text-primary transition-colors shrink-0 mt-1" />
      </div>
    </CardLink>
  </article>
);
