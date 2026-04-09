import { ChevronLeftIcon, cn } from "@kpango/ui";
import type { FC } from "hono/jsx";
import { textPrimary, textSecondary } from "../lib/styles";
import { PageShell } from "./PageShell";

interface ErrorPageProps {
  status: 404 | 500;
  message: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ status, message }) => {
  const heading = status === 404 ? "404 — Not Found" : "500 — Server Error";
  const title = status === 404 ? "Not Found — kpango" : "Error — kpango";

  return (
    <PageShell title={title} mainClass="flex-1 flex items-center justify-center min-h-[60vh]">
      <div class="text-center px-4">
        <h1 class={cn("text-4xl font-bold mb-4", textPrimary)}>{heading}</h1>
        <p class={cn("mb-8 max-w-md mx-auto", textSecondary)}>{message}</p>
        <a
          href="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors"
        >
          <ChevronLeftIcon />
          Back to Home
        </a>
      </div>
    </PageShell>
  );
};
