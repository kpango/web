import type { FC, PropsWithChildren } from "hono/jsx";
import { cn } from "../lib/cn";

interface CardLinkProps extends PropsWithChildren {
  href: string;
  /** Opens link in a new tab */
  external?: boolean;
  class?: string;
}

export const CardLink: FC<CardLinkProps> = ({
  href,
  external = false,
  class: className,
  children,
}) => (
  <a
    href={href}
    class={cn(
      "block p-6 rounded-2xl border border-border bg-card text-card-foreground hover:border-indigo-300 hover:shadow-md transition-all dark:hover:border-indigo-700",
      className
    )}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
  </a>
);
