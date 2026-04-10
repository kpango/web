import type { FC } from "hono/jsx";
import { cn } from "../lib/cn";
import type { BadgeVariant } from "./Badge";
import { Badge } from "./Badge";

export interface BadgeListProps {
  items: string[];
  variant?: BadgeVariant;
  class?: string;
  [key: string]: any;
}

export const BadgeList: FC<BadgeListProps> = ({
  items,
  variant = "indigo",
  class: className,
  ...props
}) => (
  <div class={cn("flex flex-wrap gap-2", className)} {...props}>
    {items.map((item) => (
      <Badge key={item} variant={variant}>
        {item}
      </Badge>
    ))}
  </div>
);
