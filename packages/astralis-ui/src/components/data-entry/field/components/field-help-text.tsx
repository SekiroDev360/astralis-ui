import { forwardRef, useEffect } from "react";
import type { FieldHelpTextProps } from "../field.types";
import { useFieldContext } from "../field.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

export const FieldHelpText = forwardRef<
  HTMLParagraphElement,
  FieldHelpTextProps
>(({ children, className = "", ...props }, ref) => {
  const field = useFieldContext();

  // Announce presence so the field's input gains aria-describedby → this id.
  useEffect(() => {
    if (!field) return;
    field.setHasHelpText(true);
    return () => field.setHasHelpText(false);
  }, [field]);

  return (
    <p
      ref={ref}
      id={field?.helpTextId}
      className={astralisMerge("astralis:text-xs astralis:text-label-muted", className)}
      {...props}
    >
      {children}
    </p>
  );
});

FieldHelpText.displayName = "Field.HelpText";
