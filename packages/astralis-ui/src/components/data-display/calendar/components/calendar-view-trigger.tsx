import { forwardRef } from "react";
import type { CalendarTriggerProps } from "../calendar.types";
import { useCalendarContext } from "../calendar.context";

export const CalendarViewTrigger = forwardRef<
  HTMLButtonElement,
  CalendarTriggerProps
>(({ className, children, ...props }, ref) => {
  const { monthLabel } = useCalendarContext();

  return (
    <button
      ref={ref}
      type="button"
      className={[
        "astralis-flex-1 astralis-rounded-md astralis-px-2 astralis-py-1 astralis-text-center astralis-font-semibold astralis-text-content-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children ?? monthLabel}
    </button>
  );
});

CalendarViewTrigger.displayName = "Calendar.ViewTrigger";
