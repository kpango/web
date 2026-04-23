import type { OssEntry } from "@kpango/content";
import {
  Badge,
  BadgeList,
  ButtonLink,
  CardLink,
  ChevronRightIcon,
  cn,
  GitHubIcon,
  MailIcon,
  Section,
  SectionLabel,
  textPrimary,
  textSecondary,
} from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { ContentService } from "../lib/services";
import type { CV } from "../types/index";

const Hero: FC<{ cv: CV }> = ({ cv }) => {
  const siteData = ContentService.getSiteData();
  const githubUrl = ContentService.getProfileUrl("GitHub");
  const valdUrl = cv.oss.find((o) => o.slug === "vald")?.url ?? "https://github.com/vdaas/vald";

  return (
    <Section
      tag="header"
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
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                @{cv.basics.nickname}
              </a>
            </p>
          </div>
        </div>

        <p class="text-xl text-gray-300 max-w-2xl leading-relaxed mb-4">
          {siteData.home.hero.specialist}{" "}
          <span class="text-white font-semibold">{siteData.home.hero.company}</span>.{" "}
          {siteData.home.hero.founder}{" "}
          <a
            href={valdUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="text-indigo-300 hover:text-indigo-100 underline"
          >
            Vald
          </a>
          {siteData.home.hero.valdDescription}
        </p>

        <p class="text-gray-400 max-w-2xl leading-relaxed mb-10">
          {siteData.home.hero.expertiseSummary} Based in {cv.basics.location.city},{" "}
          {cv.basics.location.region}.
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
            href={githubUrl}
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
  );
};

const ExpertiseSection: FC<{ skills: string[] }> = ({ skills }) => {
  const siteData = ContentService.getSiteData();
  return (
    <Section background="card" border="bottom">
      <SectionLabel class="mb-6">{siteData.home.sections.expertise}</SectionLabel>
      <BadgeList items={skills} variant="indigo" />
    </Section>
  );
};

const FeaturedOssSection: FC<{ featuredOss: OssEntry[] }> = ({ featuredOss }) => {
  const siteData = ContentService.getSiteData();
  return (
    <Section>
      <div class="flex items-center justify-between mb-8">
        <h2 class={cn("text-2xl font-bold", textPrimary)}>{siteData.home.sections.oss}</h2>
        <a href="/oss" class="text-sm text-primary hover:underline font-medium">
          {siteData.search.viewAll}
        </a>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        {featuredOss.map((proj) => (
          <CardLink key={proj.slug} href={`/oss/${proj.slug}`} class="group p-5">
            <div class="flex items-start justify-between gap-4 mb-3">
              <div class="flex items-center gap-3">
                <h3
                  class={cn(
                    "font-semibold group-hover:text-primary transition-colors",
                    textPrimary
                  )}
                >
                  {proj.frontmatter.title.split(" - ")[0]}
                </h3>
                {proj.frontmatter.stars && (
                  <Badge variant="yellow">⭐ {proj.frontmatter.stars.toLocaleString()}</Badge>
                )}
              </div>
              <div class="relative z-40">
                <a
                  href={proj.frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-foreground bg-secondary hover:bg-muted transition-colors rounded-lg border border-border"
                >
                  <GitHubIcon class="w-3.5 h-3.5" />
                  GitHub
                </a>
              </div>
            </div>
            <p class={cn("text-sm mb-4 leading-relaxed", textSecondary)}>
              {proj.frontmatter.description}
            </p>
            <div>
              <BadgeList items={proj.frontmatter.tags.slice(0, 3)} variant="gray" class="gap-1" />
            </div>
          </CardLink>
        ))}
      </div>
    </Section>
  );
};

const AwardsSection: FC<{ awards: { title: string }[] }> = ({ awards }) => {
  const siteData = ContentService.getSiteData();
  return (
    <Section
      background="card"
      border="both"
      style="content-visibility: auto; contain-intrinsic-size: 0 300px;"
    >
      <SectionLabel class="mb-6">{siteData.home.sections.awards}</SectionLabel>
      <div class="grid gap-4 sm:grid-cols-2">
        {awards.map((award) => (
          <div key={award.title} class="flex items-center gap-3 p-3 bg-secondary rounded-xl">
            <span class="text-lg">{ContentService.getAwardEmoji(award.title)}</span>
            <span class="text-sm font-medium text-secondary-foreground">{award.title}</span>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ContactSection: FC<{ email: string }> = ({ email }) => {
  const siteData = ContentService.getSiteData();
  return (
    <Section
      tag="footer"
      class="text-center"
      style="content-visibility: auto; contain-intrinsic-size: 0 200px;"
    >
      <h2 class={cn("text-2xl font-bold mb-3", textPrimary)}>{siteData.home.sections.contact}</h2>
      <p class={cn("mb-6 max-w-md mx-auto", textSecondary)}>{siteData.home.contact.description}</p>
      <ButtonLink href={`mailto:${email}`} variant="primary" size="lg">
        <MailIcon />
        {email}
      </ButtonLink>
    </Section>
  );
};

export const HomePage: FC = () => {
  const cv = ContentService.getCV();
  const siteData = ContentService.getSiteData();
  const featuredOss = ContentService.getFeaturedOss();

  return (
    <PageShell
      title={siteData.meta.defaultTitle}
      description={siteData.meta.defaultDescription}
      path="/"
      mainClass=""
    >
      <main>
        <Hero cv={cv} />
        <ExpertiseSection skills={cv.skills} />
        <FeaturedOssSection featuredOss={featuredOss} />
        <AwardsSection awards={cv.awards} />
        <ContactSection email={cv.basics.email} />
      </main>
    </PageShell>
  );
};
