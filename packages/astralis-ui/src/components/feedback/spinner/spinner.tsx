import type { Ref } from "react";
import type { SpinnerProps } from "./spinner.types";
import { spinnerVariants } from "./spinner.styles";
import { astralisMerge } from "../../../utils/astralis-merge";
import { accentClass } from "../../../const/color-schemes";
import { SpinnerIcon } from "../../icon/internal-icons";

/**
 * An indeterminate loading indicator. Announces itself as a live status
 * region with a visually-hidden label; the arc stays animated under
 * prefers-reduced-motion because it conveys state, not decoration.
 */
export function Spinner({
  size = "md",
  colorScheme = "brand",
  label = "Loading…",
  className = "",
  ref,
  ...rest
}: SpinnerProps & { ref?: Ref<HTMLSpanElement> }) {
    return (
      <span
        ref={ref}
        role="status"
        className={astralisMerge(spinnerVariants({ size }), accentClass(colorScheme), className)}
        {...rest}
      >
        <SpinnerIcon className="astralis:size-full astralis:animate-spin" />
        {label ? <span className="astralis:sr-only">{label}</span> : null}
      </span>
    );
}

Spinner.displayName = "Spinner";
