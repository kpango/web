import type { FC, PropsWithChildren } from "hono/jsx";
import { cn } from "../lib/cn";
import { containerClass } from "../lib/styles";

export interface SectionProps
  extends PropsWithChildren<{
    class?: string;
    id?: string;
    tag?: "section" | "div" | "header" | "footer" | "main";
    [key: string]: any;
  }> {
  background?: "default" | "card" | "transparent";
  border?: "none" | "top" | "bottom" | "both";
  container?: boolean;
}

const BACKGROUND_STYLES = {
  card: "bg-card",
  transparent: "bg-transparent",
  default: "",
} as const;

const BORDER_STYLES = {
  top: "border-t border-border",
  bottom: "border-b border-border",
  both: "border-t border-b border-border",
  none: "",
} as const;

export const Section: FC<SectionProps> = ({
  class: className,
  background = "default",
  border = "none",
  container = true,
  tag: Tag = "section",
  children,
  ...props
}) => {
  return (
    <Tag
      class={cn("py-16", BACKGROUND_STYLES[background], BORDER_STYLES[border], className)}
      {...props}
    >
      {container ? <div class={containerClass}>{children}</div> : children}
    </Tag>
  );
};
