import { forwardRef, useMemo, type HTMLAttributes } from "react";
import { buttonGroupVariants } from "./button-group.styles";
import { ButtonGroupContext, type ButtonGroupContextValue } from "./button-group.context";
import type { ButtonGroupProps } from "./button-group.types";
import { astralisMerge } from "../../../utils/astralis-merge";

/**
 * Groups related buttons and shares `size`/`variant`/`colorScheme`/`disabled`
 * down to them via context. With `attached`, the buttons render as one segmented
 * control (collapsed inner radii, merged borders).
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      orientation = "horizontal",
      attached = false,
      spacing = "md",
      size,
      variant,
      colorScheme,
      disabled,
      className = "",
      role = "group",
      ...props
    },
    ref
  ) => {
    const shared = useMemo<ButtonGroupContextValue>(
      () => ({ size, variant, colorScheme, disabled }),
      [size, variant, colorScheme, disabled]
    );

    return (
      <ButtonGroupContext.Provider value={shared}>
        <div
          ref={ref}
          role={role}
          className={astralisMerge(
            buttonGroupVariants({ orientation, attached, spacing }),
            className
          )}
          {...(props as HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
