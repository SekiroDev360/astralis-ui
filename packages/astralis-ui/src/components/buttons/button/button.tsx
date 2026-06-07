import { forwardRef } from "react";
import type { ButtonProps } from "./button.types";
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
    ref,
  ) => {
    // Rounded radius scale
    const roundedStyles = {
      none: "astralis-rounded-none",
      sm: "astralis-rounded-sm",
      md: "astralis-rounded-md",
      lg: "astralis-rounded-lg",
      xl: "astralis-rounded-xl",
      "2xl": "astralis-rounded-2xl",
      full: "astralis-rounded-full",
    }[rounded];
    // Base layout & transition styles
    const baseStyles = [
      "astralis-inline-flex astralis-items-center astralis-justify-center astralis-font-medium astralis-cursor-pointer",
      roundedStyles,
      "astralis-transition-all",
      "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed disabled:active:astralis-scale-100",
      !disabled && !loading
        ? "active:astralis-scale-[0.98]"
        : "astralis-pointer-events-none",
    ].join(" ");
    // Color variations
    const variants = {
      solid: [
        "astralis-bg-brand-600 astralis-text-white hover:astralis-bg-brand-700",
      ].join(" "),
      subtle: [
        "astralis-bg-surface-subtle astralis-text-label-base hover:astralis-bg-surface-muted",
        "astralis-border astralis-border-base",
      ].join(" "),
      outline: [
        "astralis-border astralis-border-base astralis-bg-transparent astralis-text-label-base hover:astralis-bg-surface-muted",
      ].join(" "),
      text: [
        "astralis-bg-transparent hover:astralis-bg-surface-muted astralis-text-label-base",
      ].join(" "),
      link: [
        "astralis-bg-transparent astralis-text-brand-600 hover:astralis-text-brand-700",
      ].join(" "),
    };
    // Calculate layout sizing depending on text presence (square if icon-only)
    const isIconOnly = !children && (!!leftIcon || !!rightIcon || loading);

    const sizes = {
      xs: [
        isIconOnly ? "astralis-w-7" : "astralis-px-2.5",
        "astralis-h-7 astralis-text-xs astralis-gap-1",
      ].join(" "),
      sm: [
        isIconOnly ? "astralis-w-8" : "astralis-px-3",
        "astralis-h-8 astralis-text-sm astralis-gap-1.5",
      ].join(" "),
      md: [
        isIconOnly ? "astralis-w-10" : "astralis-px-4",
        "astralis-h-10 astralis-text-base astralis-gap-2",
      ].join(" "),
      lg: [
        isIconOnly ? "astralis-w-12" : "astralis-px-5",
        "astralis-h-12 astralis-text-lg astralis-gap-2.5",
      ].join(" "),
      xl: [
        isIconOnly ? "astralis-w-14" : "astralis-px-7",
        "astralis-h-14 astralis-text-xl astralis-gap-3",
      ].join(" "),
    };
    const widthStyle = fullWidth ? "astralis-w-full" : "";
    // Dedicated spinner sizing mapping
    const spinnerSizes = {
      xs: "astralis-h-3 astralis-w-3",
      sm: "astralis-h-3.5 astralis-w-3.5",
      md: "astralis-h-4 astralis-w-4",
      lg: "astralis-h-5 astralis-w-5",
      xl: "astralis-h-6 astralis-w-6",
    };

    // Built-in animated SVG spinner (used when no custom loader is provided)
    const defaultSpinner = (
      <svg
        className={`astralis-animate-spin ${spinnerSizes[size]} astralis-shrink-0`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="astralis-opacity-low"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="astralis-opacity-high"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
    // Resolve the spinner node: custom loader takes priority
    const spinnerNode = loading ? (
      <span className="astralis-inline-flex astralis-shrink-0">
        {loader ?? defaultSpinner}
      </span>
    ) : null;
    // Resolve left-slot: loader (start) or leftIcon
    const leftSlot =
      loading && loaderPlacement === "start" ? (
        spinnerNode
      ) : !loading && leftIcon ? (
        <span className="astralis-inline-flex astralis-shrink-0">
          {leftIcon}
        </span>
      ) : null;
    // Resolve right-slot: loader (end) or rightIcon
    const rightSlot =
      loading && loaderPlacement === "end" ? (
        spinnerNode
      ) : !loading && rightIcon ? (
        <span className="astralis-inline-flex astralis-shrink-0">
          {rightIcon}
        </span>
      ) : null;
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`.trim()}
        disabled={disabled || loading}
        {...props}
      >
        {leftSlot}
        {children && (
          <span className="astralis-inline-flex astralis-items-center">
            {children}
          </span>
        )}
        {rightSlot}
      </button>
    );
  },
);
Button.displayName = "Button";
