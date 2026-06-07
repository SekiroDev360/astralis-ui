import { useMemo } from "react";
import type { AccordionItemProps } from "../accordion.types";
import {
  useAccordionContext,
  AccordionItemContext,
} from "../accordion.context";

export function AccordionItem({
  children,
  value,
  disabled = false,
}: React.PropsWithChildren<AccordionItemProps>) {
  const { rootId, variant } = useAccordionContext();

  const triggerId = `${rootId}-trigger-${value}`;
  const contentId = `${rootId}-content-${value}`;

  const contextValue = useMemo(
    () => ({
      value,
      disabled,
      triggerId,
      contentId,
    }),
    [value, disabled, triggerId, contentId],
  );

  const itemClass = {
    spaced:
      "astralis-w-full astralis-bg-surface-base astralis-border astralis-border-base astralis-rounded-lg astralis-overflow-hidden astralis-transition-all",
    outline:
      "astralis-w-full astralis-border-b astralis-border-base astralis-transition-all",
    enclosed:
      "astralis-w-full astralis-border-b astralis-border-base astralis-transition-all last:astralis-border-b-0",
    plain: "astralis-w-full astralis-transition-all",
  }[variant];

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div
        className={`${itemClass} ${
          disabled
            ? "astralis-opacity-moderate astralis-pointer-events-none"
            : ""
        }`}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
