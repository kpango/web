import { cva, type VariantProps } from "class-variance-authority";
import type { FC } from "hono/jsx";
import { cn } from "../lib/cn";

const spinnerVariants = cva(
  "border-2 border-primary border-t-transparent rounded-full animate-spin",
  {
    variants: {
      size: {
        sm: "w-3 h-3",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  class?: string;
  [key: string]: any;
}

export const Spinner: FC<SpinnerProps> = ({ size, class: className, ...props }) => (
  <div class={cn(spinnerVariants({ size }), className)} {...props} />
);

export { spinnerVariants };
