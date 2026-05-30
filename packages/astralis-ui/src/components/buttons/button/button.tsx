import { forwardRef } from "react";
import type { ButtonProps } from "./button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    // Base layout & transition styles
    const baseStyles = [
      "astralis-inline-flex astralis-items-center astralis-justify-center astralis-font-medium",
      "astralis-rounded-lg astralis-transition-all astralis-duration-150",
      "focus:astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-offset-2 dark:focus-visible:astralis-ring-offset-zinc-950",
      "disabled:astralis-opacity-50 disabled:astralis-cursor-not-allowed disabled:active:astralis-scale-100",
      !disabled && !loading ? "active:astralis-scale-[0.98]" : "astralis-pointer-events-none",
    ].join(" ");

    // Focus rings and color variations
    const variants = {
      primary: [
        "astralis-bg-primary-600 astralis-text-white hover:astralis-bg-primary-700",
        "focus-visible:astralis-ring-primary-500",
      ].join(" "),
      secondary: [
        "astralis-bg-surface-raised astralis-text-content-primary hover:astralis-bg-surface-overlay",
        "astralis-border astralis-border-border-subtle",
        "focus-visible:astralis-ring-primary-500",
      ].join(" "),
      outline: [
        "astralis-border astralis-border-border-subtle astralis-bg-transparent astralis-text-content-primary hover:astralis-bg-surface-raised",
        "focus-visible:astralis-ring-primary-500",
      ].join(" "),
      ghost: [
        "astralis-bg-transparent hover:astralis-bg-surface-raised astralis-text-content-primary",
        "focus-visible:astralis-ring-primary-500",
      ].join(" "),
      danger: [
        "astralis-bg-error-600 astralis-text-white hover:astralis-bg-error-700",
        "focus-visible:astralis-ring-error-500",
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

    // Premium Animated SVG Loading Spinner
    const spinner = (
      <svg
        className={`astralis-animate-spin ${spinnerSizes[size]} astralis-shrink-0`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="astralis-opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="astralis-opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`.trim()}
        disabled={disabled || loading}
        {...props}
      >
        {/* Render loading spinner in place of leftIcon or as a prepend */}
        {loading ? (
          spinner
        ) : (
          leftIcon && <span className="astralis-inline-flex astralis-shrink-0">{leftIcon}</span>
        )}

        {children && <span className="astralis-inline-flex astralis-items-center">{children}</span>}

        {/* Render rightIcon (skipped if loading is active to preserve clean alignment) */}
        {!loading && rightIcon && (
          <span className="astralis-inline-flex astralis-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";