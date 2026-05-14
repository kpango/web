import { cva, type VariantProps } from "class-variance-authority";
import type { FC, PropsWithChildren } from "hono/jsx";

export const buttonLinkVariants = cva(
  "inline-flex items-center gap-2 font-medium rounded-xl transition-colors",
  {
    variants: {
      variant: {
        primary:
          "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-indigo-900/40",
        outline: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
        secondary:
          "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export type ButtonLinkProps = PropsWithChildren<
  {
    class?: string;
    href?: string;
    target?: string;
    rel?: string;
    [key: string]: any;
  } & VariantProps<typeof buttonLinkVariants>
>;

export const ButtonLink: FC<ButtonLinkProps> = ({
  class: className,
  variant,
  size,
  children,
  ...props
}) => {
  return (
    <a class={buttonLinkVariants({ variant, size, class: className })} {...props}>
      {children}
    </a>
  );
};
