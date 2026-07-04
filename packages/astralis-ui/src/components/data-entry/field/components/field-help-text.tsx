import { forwardRef } from "react";
import type { FieldHelpTextProps } from "../field.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export const FieldHelpText = forwardRef<
  HTMLParagraphElement,
  FieldHelpTextProps
>(({ children, className = "", ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={astralisMerge("astralis:text-xs astralis:text-label-muted", className)}
      {...props}
    >
      {children}
    </p>
  );
});

FieldHelpText.displayName = "Field.HelpText";
