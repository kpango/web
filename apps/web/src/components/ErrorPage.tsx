import { siteData } from "@kpango/content";
import { ButtonLink, ChevronLeftIcon, cn, textPrimary, textSecondary } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { PageShell } from "./PageShell";

interface ErrorPageProps {
  status: 404 | 500;
  message: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ status, message }) => {
  const data = siteData.error[status.toString() as keyof typeof siteData.error];

  return (
    <PageShell title={data.title} mainClass="flex-1 flex items-center justify-center min-h-[60vh]">
      <div class="text-center px-4">
        <h1 class={cn("text-4xl font-bold mb-4", textPrimary)}>{data.heading}</h1>
        <p class={cn("mb-8 max-w-md mx-auto", textSecondary)}>{message}</p>
        <ButtonLink href="/" variant="primary">
          <ChevronLeftIcon />
          {data.back}
        </ButtonLink>
      </div>
    </PageShell>
  );
};
