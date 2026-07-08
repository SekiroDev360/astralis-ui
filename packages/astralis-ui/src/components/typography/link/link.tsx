import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { astralisMerge } from "../../../utils/astralis-merge";
import { accentClass, type ColorScheme } from "../../../const/color-schemes";

export const linkVariants = cva(
  "astralis:cursor-pointer astralis:rounded-sm astralis:text-accent-label astralis:transition-colors " +
    "astralis:hover:text-accent-emphasized astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring",
  {
    variants: {
      variant: {
        underline: "astralis:underline astralis:underline-offset-2",
        hover: "astralis:hover:underline astralis:underline-offset-2",
        plain: "",
      },
    },
    defaultVariants: { variant: "hover" },
  },
);

export type LinkProps<T extends ElementType = "a"> = {
  /** Render as a router link component (e.g. Next's `Link`). */
  as?: T;
  /** Hue (via the accent channel). @default "brand" */
  colorScheme?: ColorScheme;
  /** Opens in a new tab with `rel="noopener noreferrer"` and an ↗ marker. */
  external?: boolean;
  className?: string;
  /** React 19: ref is a regular prop — no forwardRef, no polymorphic cast. */
  ref?: Ref<HTMLElement>;
  children: ReactNode;
} & VariantProps<typeof linkVariants> &
  Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "ref">;

/** An inline text link with accent-channel coloring and external-link handling. */
export function Link<T extends ElementType = "a">({
  as,
  variant,
  colorScheme = "brand",
  external = false,
  className = "",
  ref,
  children,
  ...rest
}: LinkProps<T>) {
  const Element = (as || "a") as ElementType;
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Element
      ref={ref}
      className={astralisMerge(linkVariants({ variant }), accentClass(colorScheme), className)}
      {...externalProps}
      {...rest}
    >
      {children}
      {external && <span aria-hidden="true" className="astralis:ml-0.5 astralis:align-super astralis:text-2xs">↗</span>}
    </Element>
  );
}

Link.displayName = "Link";
