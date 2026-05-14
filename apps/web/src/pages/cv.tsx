import {
  BadgeList,
  cardClass,
  cn,
  dateMonoClass,
  PrintIcon,
  SectionLabel,
  TimelineItem,
  textAccent,
  textPrimary,
  textSecondary,
} from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { formatDate } from "../lib/format";
import { ContentService } from "../lib/services";
import type { CV } from "../types/index";

const CVHeader: FC<{ basics: CV["basics"] }> = ({ basics }) => {
  const siteData = ContentService.getSiteData();
  return (
    <header class="mb-10 print-break-inside-avoid">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 class={cn("text-3xl font-bold", textPrimary)}>{basics.name}</h1>
          <p class={cn("text-lg mt-1", textAccent)}>{basics.label}</p>
          <p class={cn("text-sm mt-1", textSecondary)}>
            {basics.location.city}, {basics.location.region}
          </p>
        </div>
        <div class={cn("flex flex-col gap-2 text-sm", textSecondary)}>
          <a href={`mailto:${basics.email}`} class="hover:text-primary transition-colors">
            ✉ {basics.email}
          </a>
          {basics.profiles.map((p) => (
            <a
              key={p.network}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              {p.network}: {p.username}
            </a>
          ))}
        </div>
      </div>

      <div class="mt-4 no-print">
        <button
          type="button"
          data-print
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          <PrintIcon />
          {siteData.cv.printButton}
        </button>
      </div>
    </header>
  );
};

const SummarySection: FC<{ summary: string; pr: string }> = ({ summary, pr }) => {
  const siteData = ContentService.getSiteData();
  return (
    <>
      <section class="mb-10">
        <SectionLabel>{siteData.cv.sections.summary}</SectionLabel>
        <p class="text-muted-foreground leading-relaxed">{summary}</p>
      </section>
      <section class="mb-10">
        <SectionLabel>{siteData.cv.sections.aboutMe}</SectionLabel>
        <div class="p-5 bg-accent rounded-xl border border-primary/20">
          <p class="text-muted-foreground leading-relaxed text-sm">{pr}</p>
        </div>
      </section>
    </>
  );
};

const SkillsSection: FC<{
  skills: string[];
  expertise: CV["expertise"];
  languages: CV["languages"];
}> = ({ skills, expertise, languages }) => {
  const siteData = ContentService.getSiteData();
  return (
    <>
      <section class="mb-10">
        <SectionLabel>{siteData.cv.sections.skills}</SectionLabel>
        <BadgeList items={skills} variant="indigo" />
      </section>

      <section class="mb-10">
        <SectionLabel class="mb-6">{siteData.cv.sections.expertise}</SectionLabel>
        <div class="grid gap-4 sm:grid-cols-2">
          {expertise.map((area) => (
            <div key={area.title} class={cn("p-4", cardClass, "rounded-xl")}>
              <h3 class={cn("font-semibold mb-2", textPrimary)}>{area.title}</h3>
              <p class={cn("text-sm leading-relaxed", textSecondary)}>{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section class="mb-10">
        <SectionLabel>{siteData.cv.sections.languages}</SectionLabel>
        <div class="flex gap-6">
          {languages.map((lang) => (
            <div key={lang.language}>
              <span class={cn("font-medium", textPrimary)}>{lang.language}</span>
              <span class={cn("text-sm ml-2", textSecondary)}>{lang.fluency}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const ExperienceSection: FC<{ work: CV["work"] }> = ({ work }) => {
  const siteData = ContentService.getSiteData();
  return (
    <section class="mb-10">
      <SectionLabel class="mb-6">{siteData.cv.sections.work}</SectionLabel>
      <div class="space-y-8">
        {work.map((job) => (
          <TimelineItem
            key={`${job.company}-${job.position}-${job.startDate}`}
            class="print-break-inside-avoid"
          >
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
              <div>
                <h3 class={cn("font-semibold", textPrimary)}>{job.position}</h3>
                <p class={cn("text-sm", textAccent)}>
                  {job.company} — {job.department}
                </p>
              </div>
              <span class={dateMonoClass}>
                {formatDate(job.startDate)} – {formatDate(job.endDate)}
              </span>
            </div>
            <ul class="space-y-1">
              {job.highlights.map((h) => (
                <li key={h} class={cn("text-sm flex gap-2", textSecondary)}>
                  <span class="text-primary mt-0.5 shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </TimelineItem>
        ))}
      </div>
    </section>
  );
};

const EducationSection: FC<{ education: CV["education"] }> = ({ education }) => {
  const siteData = ContentService.getSiteData();
  return (
    <section class="mb-10">
      <SectionLabel class="mb-6">{siteData.cv.sections.education}</SectionLabel>
      {education.map((edu) => (
        <TimelineItem
          key={edu.institution}
          borderColor="border-border"
          dotColor="bg-muted-foreground"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
            <div>
              <h3 class={cn("font-semibold", textPrimary)}>
                {edu.studyType}
                {edu.area ? ` in ${edu.area}` : ""}
              </h3>
              <p class={cn("text-sm", textSecondary)}>
                {edu.institution}, {edu.location}
              </p>
            </div>
            <span class={dateMonoClass}>
              {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
            </span>
          </div>
        </TimelineItem>
      ))}
    </section>
  );
};

const PublicInfoSection: FC<{ awards: CV["awards"]; publicInfo: CV["publicInfo"] }> = ({
  awards,
  publicInfo,
}) => {
  const siteData = ContentService.getSiteData();
  return (
    <>
      <section class="mb-10">
        <SectionLabel class="mb-6">{siteData.cv.sections.awards}</SectionLabel>
        <div class="space-y-4">
          {awards.map((award) => (
            <div
              key={award.title}
              class={cn("p-4 print-break-inside-avoid", cardClass, "rounded-xl")}
            >
              <h3 class={cn("font-semibold mb-1", textPrimary)}>
                {ContentService.getAwardEmoji(award.title)} {award.title}
              </h3>
              <p class={cn("text-sm leading-relaxed", textSecondary)}>{award.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section class="mb-10">
        <SectionLabel class="mb-6">{siteData.cv.sections.public}</SectionLabel>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(publicInfo).map((category) => (
            <div key={category.label} class={cn("p-4", cardClass, "rounded-xl")}>
              <h3 class={cn("font-semibold mb-3", textPrimary)}>{category.label}</h3>
              <ul class="space-y-1.5">
                {category.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class={cn("text-sm hover:underline", textAccent)}
                    >
                      {link.title} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export const CVPage: FC = () => {
  const cv = ContentService.getCV();
  const siteData = ContentService.getSiteData();

  return (
    <PageShell title={siteData.cv.title} description={siteData.cv.description} path="/cv">
      <CVHeader basics={cv.basics} />
      <SummarySection summary={cv.basics.summary} pr={cv.pr} />
      <SkillsSection skills={cv.skills} expertise={cv.expertise} languages={cv.languages} />
      <ExperienceSection work={cv.work} />
      <EducationSection education={cv.education} />
      <PublicInfoSection awards={cv.awards} publicInfo={cv.publicInfo} />
    </PageShell>
  );
};
