import type { FC, PropsWithChildren } from "hono/jsx";
import { cn } from "../lib/cn";

interface SectionLabelProps extends PropsWithChildren {
  class?: string;
}

export const SectionLabel: FC<SectionLabelProps> = ({ children, class: className }) => (
  <h2
    class={cn(
      "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3",
      className
    )}
  >
    {children}
  </h2>
);
