import { badgeVariants } from "./badge.styles";
import type { BadgeProps } from "./badge.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { accentClass } from "../../../const/color-schemes";

/**
 * A small label chip for statuses, counts, and categories. `variant` picks the
 * fill treatment and `colorScheme` the hue (via the accent channel).
 */
export function Badge({ children, variant = "subtle", colorScheme = "gray", size = "sm", className = "", ...rest }: BadgeProps) {
  return (
    <span className={astralisMerge(badgeVariants({ variant, size }), accentClass(colorScheme), className)} {...rest}>
      {children}
    </span>
  );
}

Badge.displayName = "Badge";
