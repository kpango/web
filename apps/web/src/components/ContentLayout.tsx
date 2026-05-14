import type { AuthorCardProps } from "@kpango/ui";
import { AuthorCard, ChevronLeftIcon, cardClass, cn, textPrimary, textSecondary } from "@kpango/ui";
import type { Child, FC, PropsWithChildren } from "hono/jsx";
import { PageShell } from "./PageShell";

interface ContentLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
  path: string;
  currentPath: string;
  backLabel: string;
  backHref: string;
  metadata?: Child;
  headerExtras?: Child;
  author: AuthorCardProps;
}

export const ContentLayout: FC<ContentLayoutProps> = ({
  title,
  description,
  path,
  currentPath,
  backLabel,
  backHref,
  metadata,
  headerExtras,
  author,
  children,
}) => (
  <PageShell
    title={`${title} — kpango`}
    description={description}
    path={path}
    currentPath={currentPath}
  >
    {/* Back link */}
    <a
      href={backHref}
      class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
    >
      <ChevronLeftIcon />
      {backLabel}
    </a>

    <article class={cn(cardClass, "overflow-hidden")}>
      <div class="p-8 sm:p-10">
        <div class="mb-6">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
            {metadata}
            {headerExtras}
          </div>
          <h1 class={cn("text-3xl sm:text-4xl font-bold leading-tight", textPrimary)}>{title}</h1>
          {description && (
            <p class={cn("mt-3 text-lg leading-relaxed", textSecondary)}>{description}</p>
          )}
        </div>

        <hr class="border-border mb-8" />

        <div class="prose prose-indigo dark:prose-invert max-w-none">{children}</div>
      </div>
    </article>

    <AuthorCard {...author} />
  </PageShell>
);
