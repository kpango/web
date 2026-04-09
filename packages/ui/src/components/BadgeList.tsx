import type { FC } from "hono/jsx";
import { cn } from "../lib/cn";
import type { BadgeVariant } from "./Badge";
import { Badge } from "./Badge";

interface BadgeListProps {
  items: string[];
  variant?: BadgeVariant;
  class?: string;
}

export const BadgeList: FC<BadgeListProps> = ({ items, variant = "indigo", class: className }) => (
  <div class={cn("flex flex-wrap gap-2", className)}>
    {items.map((item) => (
      <Badge variant={variant}>{item}</Badge>
    ))}
  </div>
);
