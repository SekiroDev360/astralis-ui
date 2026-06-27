import type { ReactNode, HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonGroupVariants } from "./button-group.styles";
import type { ButtonVariant, ButtonColorScheme } from "../button/button.styles";
import type { buttonVariants } from "../button/button.styles";

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export interface ButtonGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof buttonGroupVariants> {
  children?: ReactNode;
  /** Shared size applied to every child Button (each can still override). */
  size?: ButtonSize;
  /** Shared visual style applied to every child Button. */
  variant?: ButtonVariant;
  /** Shared hue applied to every child Button. */
  colorScheme?: ButtonColorScheme;
  /** Disable every child Button at once. */
  disabled?: boolean;
}
