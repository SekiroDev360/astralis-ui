import { createContext, useContext } from "react";
import type { ButtonVariant, ButtonColorScheme } from "../button/button.styles";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "../button/button.styles";

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

/**
 * Defaults a ButtonGroup pushes onto its child Buttons. Every field is optional —
 * a Button reads it only to fill props the caller left undefined, so an explicit
 * prop on the Button always wins.
 */
export interface ButtonGroupContextValue {
  size?: ButtonSize;
  variant?: ButtonVariant;
  colorScheme?: ButtonColorScheme;
  disabled?: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

export function useButtonGroup(): ButtonGroupContextValue | null {
  return useContext(ButtonGroupContext);
}
