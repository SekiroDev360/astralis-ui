import { forwardRef, useEffect } from "react";
import type { FieldErrorTextProps } from "../field.types";
import { useFieldContext } from "../field.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

export const FieldErrorText = forwardRef<
  HTMLParagraphElement,
  FieldErrorTextProps
>(({ children, className = "", ...props }, ref) => {
  const field = useFieldContext();

  // Announce presence so the field's input gains aria-describedby → this id.
  useEffect(() => {
    if (!field) return;
    field.setHasErrorText(true);
    return () => field.setHasErrorText(false);
  }, [field]);

  return (
    <p
      ref={ref}
      id={field?.errorTextId}
      role="alert"
      aria-live="polite"
      className={astralisMerge(
        "astralis:flex astralis:items-center astralis:gap-1 astralis:text-xs astralis:text-label-error",
        className,
      )}
      {...props}
    >
      {/* Error icon */}
      <svg
        aria-hidden="true"
        className="astralis:h-3.5 astralis:w-3.5 astralis:shrink-0"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Zm.75 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75Z" />
      </svg>
      {children}
    </p>
  );
});

FieldErrorText.displayName = "Field.ErrorText";
