import { type VariantProps, cva } from "class-variance-authority";
import type { FC, PropsWithChildren } from "hono/jsx";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
        green: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
        yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
        red: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
        gray: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "indigo",
    },
  }
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

interface BadgeProps extends PropsWithChildren, VariantProps<typeof badgeVariants> {
  class?: string;
}

export const Badge: FC<BadgeProps> = ({ children, variant, class: className }) => (
  <span class={cn(badgeVariants({ variant }), className)}>{children}</span>
);

export { badgeVariants };
