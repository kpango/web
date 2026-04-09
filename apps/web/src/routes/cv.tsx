import cvData from "@kpango/content/cv.json";
import { BadgeList, PrintIcon, SectionLabel, TimelineItem, cn } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "../components/PageShell";
import { formatDate } from "../lib/format";
import { cardClass, dateMonoClass, textAccent, textPrimary, textSecondary } from "../lib/styles";
import type { CV } from "../types/index";

const cv = cvData as CV;

export const CVPage: FC = () => (
  <PageShell
    title="CV — Yusuke Kato (kpango)"
    description="Full CV and work history of Yusuke Kato — Distributed Systems, Search, Cloud, and Security specialist at LINE Yahoo! Japan."
    path="/cv"
  >
    {/* Header */}
    <div class="mb-10 print-break-inside-avoid">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 class={cn("text-3xl font-bold", textPrimary)}>{cv.basics.name}</h1>
          <p class={cn("text-lg mt-1", textAccent)}>{cv.basics.label}</p>
          <p class={cn("text-sm mt-1", textSecondary)}>
            {cv.basics.location.city}, {cv.basics.location.region}
          </p>
        </div>
        <div class={cn("flex flex-col gap-2 text-sm", textSecondary)}>
          <a href={`mailto:${cv.basics.email}`} class="hover:text-primary transition-colors">
            ✉ {cv.basics.email}
          </a>
          {cv.basics.profiles.map((p) => (
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

      {/* Print button */}
      <div class="mt-4 no-print">
        <button
          type="button"
          onclick="window.print()"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          <PrintIcon />
          Print / Save PDF
        </button>
      </div>
    </div>

    {/* Summary */}
    <section class="mb-10">
      <SectionLabel>Summary</SectionLabel>
      <p class="text-muted-foreground leading-relaxed">{cv.basics.summary}</p>
    </section>

    {/* Skills */}
    <section class="mb-10">
      <SectionLabel>Skills</SectionLabel>
      <BadgeList items={cv.skills} variant="indigo" />
    </section>

    {/* Areas of Expertise */}
    <section class="mb-10">
      <SectionLabel class="mb-6">Areas of Expertise</SectionLabel>
      <div class="grid gap-4 sm:grid-cols-2">
        {cv.expertise.map((area) => (
          <div key={area.title} class={cn("p-4", cardClass, "rounded-xl")}>
            <h3 class={cn("font-semibold mb-2", textPrimary)}>{area.title}</h3>
            <p class={cn("text-sm leading-relaxed", textSecondary)}>{area.description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Work Experience */}
    <section class="mb-10">
      <SectionLabel class="mb-6">Work Experience</SectionLabel>
      <div class="space-y-8">
        {cv.work.map((job) => (
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

    {/* Awards */}
    <section class="mb-10">
      <SectionLabel class="mb-6">Awards</SectionLabel>
      <div class="space-y-4">
        {cv.awards.map((award) => (
          <div
            key={award.title}
            class={cn("p-4 print-break-inside-avoid", cardClass, "rounded-xl")}
          >
            <h3 class={cn("font-semibold mb-1", textPrimary)}>🏆 {award.title}</h3>
            <p class={cn("text-sm leading-relaxed", textSecondary)}>{award.description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Education */}
    <section class="mb-10">
      <SectionLabel class="mb-6">Education</SectionLabel>
      {cv.education.map((edu) => (
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

    {/* Languages */}
    <section class="mb-10">
      <SectionLabel>Languages</SectionLabel>
      <div class="flex gap-6">
        {cv.languages.map((lang) => (
          <div key={lang.language}>
            <span class={cn("font-medium", textPrimary)}>{lang.language}</span>
            <span class={cn("text-sm ml-2", textSecondary)}>{lang.fluency}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Public Information & Links */}
    <section class="mb-10">
      <SectionLabel class="mb-6">Public Information &amp; Links</SectionLabel>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(cv.publicInfo).map((category) => (
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

    {/* PR / Self Introduction */}
    <section class="mb-10">
      <SectionLabel>About Me</SectionLabel>
      <div class="p-5 bg-accent rounded-xl border border-primary/20">
        <p class="text-muted-foreground leading-relaxed text-sm">{cv.pr}</p>
      </div>
    </section>
  </PageShell>
);
