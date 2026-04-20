import type { FC, PropsWithChildren } from "hono/jsx";
import { cn } from "../lib/cn";

interface TimelineItemProps extends PropsWithChildren {
  /** Tailwind colour class for the left border, e.g. "border-indigo-200 dark:border-indigo-900" */
  borderColor?: string;
  /** Tailwind colour class for the dot, e.g. "bg-indigo-500 dark:bg-indigo-400" */
  dotColor?: string;
  class?: string;
}

export const TimelineItem: FC<TimelineItemProps> = ({
  children,
  borderColor = "border-indigo-200 dark:border-indigo-900",
  dotColor = "bg-indigo-500 dark:bg-indigo-400",
  class: className,
}) => (
  <div class={cn("relative pl-6 border-l-2", borderColor, className)}>
    <div class={cn("absolute -left-1.5 top-1.5 w-3 h-3 rounded-full", dotColor)} />
    {children}
  </div>
);
