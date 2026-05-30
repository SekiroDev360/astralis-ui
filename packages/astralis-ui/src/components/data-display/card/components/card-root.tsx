import { forwardRef } from "react";
import { CardContext } from "../card.context";
import type { CardRootProps, CardSize, CardVariant } from "../card.types";

const SIZE_MAP: Record<CardSize, { root: string }> = {
  sm: { root: "astralis-rounded-lg" },
  md: { root: "astralis-rounded-xl" },
  lg: { root: "astralis-rounded-2xl" },
};

const VARIANT_MAP: Record<CardVariant, string> = {
  elevated:
    "astralis-bg-surface-raised astralis-shadow-md astralis-border astralis-border-border-subtle",
  outline:
    "astralis-bg-transparent astralis-border astralis-border-border-subtle",
  filled:
    "astralis-bg-surface-sunken astralis-border astralis-border-transparent",
  unstyled: "",
};

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  (
    {
      variant = "elevated",
      size = "md",
      hoverable = false,
      className = "",
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const sizeClasses = SIZE_MAP[size].root;
    const variantClasses = VARIANT_MAP[variant];

    return (
      <CardContext.Provider value={{ size }}>
        <div
          ref={ref}
          className={[
            "astralis-overflow-hidden astralis-transition-all astralis-duration-200",
            sizeClasses,
            variantClasses,
            hoverable &&
              "astralis-cursor-pointer hover:astralis-shadow-lg hover:-astralis-translate-y-0.5 active:astralis-scale-[0.98]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  },
);

CardRoot.displayName = "Card.Root";
