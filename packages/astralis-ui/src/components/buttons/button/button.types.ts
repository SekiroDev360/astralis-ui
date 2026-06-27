import type { ReactNode, ElementType, ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants, type ButtonVariant, type ButtonColorScheme } from "./button.styles";

export type ButtonLoaderPlacement = "start" | "end";

/**
 * Props owned by Button. Everything else is forwarded to the rendered element,
 * whose attribute set is derived from `as` (defaults to `"button"`).
 */
interface ButtonOwnProps
  // Structural CVA variants (size/rounded/fullWidth), minus the flags Button derives itself.
  extends Omit<VariantProps<typeof buttonVariants>, "isDisabledOrLoading" | "isIconOnly"> {
  /** Visual style. `surface` is the bordered sibling of `subtle`; `text` is the ghost style. */
  variant?: ButtonVariant;
  /** Hue the variant paints with. Defaults to `brand`; use `gray` for a neutral button. */
  colorScheme?: ButtonColorScheme;
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  /** Replaces the label while `loading` (e.g. "Saving…"); the spinner still shows. */
  loadingText?: ReactNode;
  loaderPlacement?: ButtonLoaderPlacement;
  loader?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

/**
 * Polymorphic Button. `as` swaps the underlying element (e.g. `"a"`, a router
 * `Link`); the forwarded HTML props follow that element automatically. Defaults
 * to a native `<button>`.
 */
export type ButtonProps<T extends ElementType = "button"> = { as?: T } & ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps | "as">;
