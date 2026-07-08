import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { astralisMerge } from "../../../utils/astralis-merge";

export const kbdVariants = cva(
  // The heavier bottom border gives the keycap its pressed-key depth.
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:font-mono astralis:font-medium " +
    "astralis:rounded-md astralis:border-normal astralis:border-b-2 astralis:border-stroke-base " +
    "astralis:bg-surface-subtle astralis:text-label-muted astralis:whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "astralis:text-2xs astralis:px-1 astralis:min-w-4 astralis:h-4",
        md: "astralis:text-xs astralis:px-1.5 astralis:min-w-5 astralis:h-5",
        lg: "astralis:text-sm astralis:px-2 astralis:min-w-6 astralis:h-6",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface KbdProps extends ComponentPropsWithoutRef<"kbd">, VariantProps<typeof kbdVariants> {}

/** A keyboard-key cap: `<Kbd>⌘</Kbd> <Kbd>K</Kbd>`. Renders a semantic `<kbd>`. */
export const Kbd = forwardRef<HTMLElement, KbdProps>(({ size, className = "", children, ...rest }, ref) => (
  <kbd ref={ref} className={astralisMerge(kbdVariants({ size }), className)} {...rest}>
    {children}
  </kbd>
));

Kbd.displayName = "Kbd";
