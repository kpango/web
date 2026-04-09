import type { PostEntry } from "@kpango/content";
import { Badge, CardLink, ChevronRightIcon, PageHeader, cn } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { formatDisplayDate } from "../lib/format";
import { dateMonoClass, textPrimary, textSecondary } from "../lib/styles";

interface BlogListPageProps {
  posts: PostEntry[];
}

export const BlogListPage: FC<BlogListPageProps> = ({ posts }) => (
  <PageShell
    title="Blog — kpango"
    description="Articles on distributed systems, Go, Kubernetes, vector search, and engineering at scale."
    path="/blog"
  >
    <PageHeader
      title="Blog"
      subtitle="Thoughts on distributed systems, Go, Kubernetes, and vector search."
    />

    <div id="post-list" class="space-y-4">
      {posts.map((post) => (
        <article key={post.slug} class="group">
          <CardLink href={`/blog/${post.slug}`}>
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h2
                  class={cn(
                    "text-lg font-semibold group-hover:text-primary transition-colors mb-1",
                    textPrimary
                  )}
                >
                  {post.frontmatter.title}
                </h2>
                <p class={cn("text-sm leading-relaxed mb-3", textSecondary)}>
                  {post.frontmatter.description}
                </p>
                <div class="flex flex-wrap items-center gap-2">
                  <span class={dateMonoClass}>{formatDisplayDate(post.frontmatter.date)}</span>
                  <span class="text-border">•</span>
                  {post.frontmatter.tags.map((tag) => (
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
      ))}
    </div>

  </PageShell>
);
