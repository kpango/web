import type { FC } from "hono/jsx";
import { cn } from "../lib/cn";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  class?: string;
  [key: string]: any;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  class: className,
  ...props
}) => (
  <div class={cn("mb-10", className)} {...props}>
    <h1 class="text-3xl font-bold text-foreground">{title}</h1>
    {subtitle && <p class="mt-2 text-muted-foreground">{subtitle}</p>}
  </div>
);
