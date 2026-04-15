import type { FC, PropsWithChildren } from "hono/jsx";
import { cn } from "../lib/cn";

interface CardLinkProps extends PropsWithChildren {
  href: string;
  /** Opens link in a new tab */
  external?: boolean;
  class?: string;
  /**
   * If true, the entire card is clickable via an absolute positioned link.
   * This allows placing other interactive elements (like tag links) inside.
   * Note: The container must have 'relative' positioning.
   */
  stretched?: boolean;
}

export const CardLink: FC<CardLinkProps> = ({
  href,
  external = false,
  class: className,
  stretched = true,
  children,
}) => {
  const baseClass = cn(
    "block rounded-2xl border border-border bg-card text-card-foreground transition-all duration-200",
    "hover:border-indigo-300 hover:shadow-md hover:bg-indigo-50/10",
    "dark:hover:border-indigo-700 dark:hover:bg-indigo-900/10",
    "active:scale-[0.99] active:shadow-sm",
    className
  );

  if (stretched) {
    return (
      <div class={cn("relative group p-6", baseClass)}>
        <a
          href={href}
          class="absolute inset-0 z-30 focus:outline-none"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span class="sr-only">View details</span>
        </a>
        {children}
      </div>
    );
  }

  return (
    <a
      href={href}
      class={cn("p-6", baseClass)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
};
