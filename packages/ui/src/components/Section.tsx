import type { FC, PropsWithChildren } from "hono/jsx";
import { cn } from "../lib/cn";

export interface SectionProps extends PropsWithChildren<{ class?: string; id?: string; [key: string]: any }> {
  background?: "default" | "card" | "transparent";
  border?: "none" | "top" | "bottom" | "both";
  container?: boolean;
}

export const Section: FC<SectionProps> = ({
  class: className,
  background = "default",
  border = "none",
  container = true,
  children,
  ...props
}) => {
  return (
    <section
      class={cn(
        "py-16",
        background === "card" && "bg-card",
        border === "top" && "border-t border-border",
        border === "bottom" && "border-b border-border",
        border === "both" && "border-t border-b border-border",
        className
      )}
      {...props}
    >
      {container ? (
        <div class="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};
