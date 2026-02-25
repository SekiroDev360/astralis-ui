import { forwardRef } from "react";
import type { FieldHelpTextProps } from "../field.types";

export const FieldHelpText = forwardRef<
  HTMLParagraphElement,
  FieldHelpTextProps
>(({ children, className = "", ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`astralis-text-xs astralis-text-content-secondary ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

FieldHelpText.displayName = "Field.HelpText";
