import { forwardRef } from "react";
import { buttonVariants } from "./button.styles";
import type { ButtonProps } from "./button.types";
import { astralisMerge } from "../../../utils/astralis-merge";

const spinnerSizes = {
  xs: "astralis:h-3 astralis:w-3",
  sm: "astralis:h-3.5 astralis:w-3.5",
  md: "astralis:h-4 astralis:w-4",
  lg: "astralis:h-5 astralis:w-5",
  xl: "astralis:h-6 astralis:w-6",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "solid",
      size = "md",
      disabled = false,
      loading = false,
      loaderPlacement = "start",
      loader,
      rounded = "lg",
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const isIconOnly = !children && (!!leftIcon || !!rightIcon || loading);
    const isDisabledOrLoading = disabled || loading;

    const defaultSpinner = (
      <svg
        className={`astralis:animate-spin borde ${spinnerSizes[size || "md"]} astralis:shrink-0`}
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

    return (
      <button
        ref={ref}
        disabled={isDisabledOrLoading}
        className={astralisMerge(
          buttonVariants({
            variant,
            size,
            rounded,
            fullWidth,
            isDisabledOrLoading,
            isIconOnly,
          }),
          className
        )}
        {...props}
      >
        {leftSlot}
        {children && <span className="astralis:inline-flex astralis:items-center">{children}</span>}
        {rightSlot}
      </button>
    );
  }
);

Button.displayName = "Button";