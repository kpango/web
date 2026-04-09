import cvData from "@kpango/content/cv.json";
import {
  BadgeList,
  CardLink,
  ChevronRightIcon,
  GitHubIcon,
  MailIcon,
  SectionLabel,
  cn,
} from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { awardEmoji } from "../lib/awards";
import { containerClass, textPrimary, textSecondary } from "../lib/styles";
import type { CV } from "../types/index";

const cv = cvData as CV;

export const HomePage: FC = () => (
  <PageShell
    title="kpango — Yusuke Kato"
    description="Distributed Systems / Search / Cloud / Security — Individual Contributor at LINE Yahoo! Japan. Founder of Vald."
    path="/"
    mainClass=""
  >
    <main>
      {/* Hero */}
      <section class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 dark:from-gray-950 dark:via-indigo-950 dark:to-gray-950 py-24 sm:py-32">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent pointer-events-none" />
        <div class={cn(containerClass, "relative")}>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
              Y
            </div>
            <div>
              <h1 class="text-4xl sm:text-5xl font-bold text-white">{cv.basics.name}</h1>
              <p class="text-indigo-300 font-mono text-lg mt-1">@{cv.basics.nickname}</p>
            </div>
          </div>

          <p class="text-xl text-gray-300 max-w-2xl leading-relaxed mb-4">
            Distributed Systems / Search / Cloud / Security specialist at{" "}
            <span class="text-white font-semibold">LINE Yahoo! Japan</span>. Founder &amp; lead
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
            projects completed. 450+ K8s clusters deployed with Athenz auth platform. Based in{" "}
            {cv.basics.location.city}, {cv.basics.location.region}.
          </p>

          <div class="flex flex-wrap gap-3">
            <a
              href="/cv"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors shadow-lg shadow-indigo-900/40"
            >
              View CV
              <ChevronRightIcon />
            </a>
            <a
              href="/oss"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/20"
            >
              OSS Projects
            </a>
            <a
              href="/blog"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/20"
            >
              Blog
            </a>
            <a
              href={
                cv.basics.profiles.find((p) => p.network === "GitHub")?.url ??
                "https://github.com/kpango"
              }
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/20"
            >
              <GitHubIcon class="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Skills — driven from cv.json */}
      <section class="py-16 bg-card border-b border-border">
        <div class={containerClass}>
          <SectionLabel class="mb-6">Core Expertise</SectionLabel>
          <BadgeList items={cv.skills} variant="indigo" />
        </div>
      </section>

      {/* Featured OSS — first 4 from cv.json */}
      <section class="py-16">
        <div class={containerClass}>
          <div class="flex items-center justify-between mb-8">
            <h2 class={cn("text-2xl font-bold", textPrimary)}>Featured OSS</h2>
            <a href="/oss" class="text-sm text-primary hover:underline font-medium">
              View all →
            </a>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            {cv.oss.slice(0, 4).map((proj) => (
              <CardLink key={proj.name} href={proj.url} external class="group p-5">
                <div class="flex items-start justify-between mb-2">
                  <h3
                    class={cn(
                      "font-semibold group-hover:text-primary transition-colors",
                      textPrimary
                    )}
                  >
                    {proj.name}
                  </h3>
                  {proj.stars && (
                    <span class={cn("flex items-center gap-1 text-xs", textSecondary)}>
                      ⭐ {proj.stars.toLocaleString()}
                    </span>
                  )}
                </div>
                <p class={cn("text-sm mb-3 leading-relaxed", textSecondary)}>{proj.description}</p>
                <BadgeList items={proj.tags.slice(0, 3)} variant="gray" class="gap-1" />
              </CardLink>
            ))}
          </div>
        </div>
      </section>

      {/* Awards — driven from cv.json */}
      <section class="py-16 bg-card border-t border-b border-border">
        <div class={containerClass}>
          <SectionLabel class="mb-6">Awards</SectionLabel>
          <div class="grid gap-4 sm:grid-cols-2">
            {cv.awards.map((award) => (
              <div key={award.title} class="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                <span class="text-lg">{awardEmoji(award.title)}</span>
                <span class="text-sm font-medium text-secondary-foreground">{award.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section class="py-16">
        <div class={cn(containerClass, "text-center")}>
          <h2 class={cn("text-2xl font-bold mb-3", textPrimary)}>Get in Touch</h2>
          <p class={cn("mb-6 max-w-md mx-auto", textSecondary)}>
            Open to collaboration on distributed systems, vector search, and cloud-native Go
            projects.
          </p>
          <a
            href={`mailto:${cv.basics.email}`}
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors shadow-lg shadow-indigo-900/20"
          >
            <MailIcon />
            {cv.basics.email}
          </a>
        </div>
      </section>
    </main>
  </PageShell>
);
