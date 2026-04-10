import { getAllOss } from "@kpango/content";
import cvData from "@kpango/content/cv.json";
import {
  BadgeList,
  ButtonLink,
  ChevronRightIcon,
  cn,
  GitHubIcon,
  MailIcon,
  Section,
  SectionLabel,
} from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { awardEmoji } from "../lib/awards";
import { cardClass, textPrimary, textSecondary } from "../lib/styles";
import type { CV } from "../types/index";

export const HomePage: FC = () => {
  const cv = cvData as CV;
  const featuredOss = getAllOss().slice(0, 4);

  return (
    <PageShell
      title="kpango — Yusuke Kato"
      description="Distributed Systems / Search / Cloud / Security — Individual Contributor at LY Corporation. Founder of Vald."
      path="/"
      mainClass=""
    >
      <main>
        <Section
          background="transparent"
          container={false}
          class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 dark:from-gray-950 dark:via-indigo-950 dark:to-gray-950 py-24 sm:py-32"
          style="contain: layout style;"
        >
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent pointer-events-none" />
          <div class="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div class="w-20 h-20 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/assets/images/profile.webp"
                  alt="Profile"
                  class="w-full h-full object-cover"
                  width="80"
                  height="80"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div>
                <h1 class="text-4xl sm:text-5xl font-bold text-white">{cv.basics.name}</h1>
                <p class="text-indigo-300 font-mono text-lg mt-1">
                  <a href="https://github.com/kpango" target="_blank" rel="noopener noreferrer">
                    @{cv.basics.nickname}
                  </a>
                </p>
              </div>
            </div>

            <p class="text-xl text-gray-300 max-w-2xl leading-relaxed mb-4">
              Distributed Systems / Search / Cloud / Security specialist at{" "}
              <span class="text-white font-semibold">LY Corporation</span>. Founder &amp; lead
              developer of{" "}
              <a
                href="https://github.com/vdaas/vald"
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-300 hover:text-indigo-100 underline"
              >
                Vald
              </a>
              , a cloud-native distributed vector search engine.
            </p>

            <p class="text-gray-400 max-w-2xl leading-relaxed mb-10">
              Expert in Go, C/C++, Rust, Kubernetes, and distributed systems. 21 high-difficulty
              projects completed. 1300+ K8s clusters deployed with Athenz auth platform. Based in{" "}
              {cv.basics.location.city}, {cv.basics.location.region}.
            </p>

            <div class="flex flex-wrap gap-3">
              <ButtonLink href="/cv" variant="primary">
                View CV
                <ChevronRightIcon />
              </ButtonLink>
              <ButtonLink href="/oss" variant="outline">
                OSS Projects
              </ButtonLink>
              <ButtonLink href="/blog" variant="outline">
                Blog
              </ButtonLink>
              <ButtonLink
                href={
                  cv.basics.profiles.find((p) => p.network === "GitHub")?.url ??
                  "https://github.com/kpango"
                }
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                aria-label="GitHub Profile"
              >
                <GitHubIcon class="w-4 h-4" />
                GitHub Profile
              </ButtonLink>
            </div>
          </div>
        </Section>

        <Section background="card" border="bottom">
          <SectionLabel class="mb-6">Core Expertise</SectionLabel>
          <BadgeList items={cv.skills} variant="indigo" />
        </Section>

        <Section>
          <div class="flex items-center justify-between mb-8">
            <h2 class={cn("text-2xl font-bold", textPrimary)}>Featured OSS</h2>
            <a href="/oss" class="text-sm text-primary hover:underline font-medium">
              View all →
            </a>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            {featuredOss.map((proj) => (
              <div
                key={proj.slug}
                class={cn(
                  cardClass,
                  "relative group p-5 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
                )}
              >
                <div class="flex items-start justify-between mb-2">
                  <h3
                    class={cn(
                      "font-semibold group-hover:text-primary transition-colors",
                      textPrimary
                    )}
                  >
                    <a href={`/oss/${proj.slug}`} class="focus:outline-none">
                      <span class="absolute inset-0 z-10" aria-hidden="true" />
                      {proj.frontmatter.title.split(" - ")[0]}
                    </a>
                  </h3>
                  {proj.frontmatter.stars && (
                    <span
                      class={cn("flex items-center gap-1 text-xs relative z-20", textSecondary)}
                    >
                      ⭐ {proj.frontmatter.stars.toLocaleString()}
                    </span>
                  )}
                </div>
                <p class={cn("text-sm mb-3 leading-relaxed relative z-20", textSecondary)}>
                  {proj.frontmatter.description}
                </p>
                <div class="relative z-20">
                  <BadgeList
                    items={proj.frontmatter.tags.slice(0, 3)}
                    variant="gray"
                    class="gap-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section background="card" border="both">
          <SectionLabel class="mb-6">Awards</SectionLabel>
          <div class="grid gap-4 sm:grid-cols-2">
            {cv.awards.map((award) => (
              <div key={award.title} class="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                <span class="text-lg">{awardEmoji(award.title)}</span>
                <span class="text-sm font-medium text-secondary-foreground">{award.title}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section class="text-center">
          <h2 class={cn("text-2xl font-bold mb-3", textPrimary)}>Get in Touch</h2>
          <p class={cn("mb-6 max-w-md mx-auto", textSecondary)}>
            Open to collaboration on distributed systems, vector search, and cloud-native Go
            projects.
          </p>
          <ButtonLink href={`mailto:${cv.basics.email}`} variant="primary" size="lg">
            <MailIcon />
            {cv.basics.email}
          </ButtonLink>
        </Section>
      </main>
    </PageShell>
  );
};
