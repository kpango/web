import type { FC } from "hono/jsx";
import { cn } from "../lib/cn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  class?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, class: className }) => (
  <div class={cn("mb-10", className)}>
    <h1 class="text-3xl font-bold text-foreground">{title}</h1>
    {subtitle && <p class="mt-2 text-muted-foreground">{subtitle}</p>}
  </div>
);
