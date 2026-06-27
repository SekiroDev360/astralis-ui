import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import { buttonVariants, buttonColorClasses } from "./button.styles";
import type { ButtonProps } from "./button.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { accentClass } from "../../../const/color-schemes";
import { useButtonGroup } from "../button-group/button-group.context";

type ButtonComponent = <T extends ElementType = "button">(
  props: ButtonProps<T> & { ref?: Ref<any> },
) => ReactNode;

const spinnerSizes = {
  xs: "astralis:h-3 astralis:w-3",
  sm: "astralis:h-3.5 astralis:w-3.5",
  md: "astralis:h-4 astralis:w-4",
  lg: "astralis:h-5 astralis:w-5",
  xl: "astralis:h-6 astralis:w-6",
};

const ButtonImpl = forwardRef(
  <T extends ElementType = "button">(
    {
      as,
      children,
      variant: variantProp,
      colorScheme: colorSchemeProp,
      size: sizeProp,
      disabled: disabledProp,
      loading = false,
      loadingText,
      loaderPlacement = "start",
      loader,
      rounded = "lg",
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      ...props
    }: ButtonProps<T>,
    ref: Ref<any>
  ) => {
    // A surrounding ButtonGroup supplies defaults; an explicit prop always wins.
    const group = useButtonGroup();
    const variant = variantProp ?? group?.variant ?? "solid";
    const colorScheme = colorSchemeProp ?? group?.colorScheme ?? "brand";
    const size = sizeProp ?? group?.size ?? "md";
    const disabled = disabledProp ?? group?.disabled ?? false;

    const Element = (as || "button") as ElementType;
    const isNativeButton = Element === "button";
    const isDisabledOrLoading = disabled || loading;

    // While loading, `loadingText` (if given) becomes the label.
    const label = loading && loadingText != null ? loadingText : children;
    const isIconOnly = !label && (!!leftIcon || !!rightIcon || loading);

    const defaultSpinner = (
      <svg
        className={`astralis:animate-spin ${spinnerSizes[size]} astralis:shrink-0`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="astralis:opacity-low" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="astralis:opacity-high"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const spinnerNode = loading ? (
      <span className="astralis:inline-flex astralis:shrink-0">{loader ?? defaultSpinner}</span>
    ) : null;

    const leftSlot =
      loading && loaderPlacement === "start" ? (
        spinnerNode
      ) : !loading && leftIcon ? (
        <span className="astralis:inline-flex astralis:shrink-0">{leftIcon}</span>
      ) : null;

    const rightSlot =
      loading && loaderPlacement === "end" ? (
        spinnerNode
      ) : !loading && rightIcon ? (
        <span className="astralis:inline-flex astralis:shrink-0">{rightIcon}</span>
      ) : null;

    // a11y: an icon-only button has no text for AT — nudge for an accessible name.
    if (
      process.env.NODE_ENV !== "production" &&
      isIconOnly &&
      !(props as { "aria-label"?: string; "aria-labelledby"?: string })["aria-label"] &&
      !(props as { "aria-labelledby"?: string })["aria-labelledby"]
    ) {
      console.warn(
        "[Astralis] Icon-only Button has no accessible name. Pass `aria-label` so assistive tech can announce it.",
      );
    }

    // `disabled` is only a real attribute on <button>. On any other element
    // (e.g. an <a>) we signal disablement to AT and remove it from the tab order
    // instead; `pointer-events-none` from the variant blocks interaction visually.
    const disabledProps = isNativeButton
      ? { disabled: isDisabledOrLoading }
      : isDisabledOrLoading
        ? { "aria-disabled": true, tabIndex: -1 }
        : {};

    return (
      <Element
        ref={ref}
        className={astralisMerge(
          buttonVariants({ size, rounded, fullWidth, isDisabledOrLoading, isIconOnly }),
          buttonColorClasses(variant),
          accentClass(colorScheme),
          className
        )}
        {...disabledProps}
        {...props}
      >
        {leftSlot}
        {label && <span className="astralis:inline-flex astralis:items-center">{label}</span>}
        {rightSlot}
      </Element>
    );
  }
);

(ButtonImpl as { displayName?: string }).displayName = "Button";

export const Button = ButtonImpl as ButtonComponent & { displayName?: string };
