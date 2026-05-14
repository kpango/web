import type { FC, PropsWithChildren } from "hono/jsx";
import { cn } from "../lib/cn";

export interface SectionLabelProps extends PropsWithChildren {
  class?: string;
  tag?: "h2" | "h3" | "h4" | "p" | "span" | "div";
  [key: string]: any;
}

export const SectionLabel: FC<SectionLabelProps> = ({
  children,
  class: className,
  tag: Tag = "h2",
  ...props
}) => (
  <Tag
    class={cn(
      "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3",
      className
    )}
    {...props}
  >
    {children}
  </Tag>
);
