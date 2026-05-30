import { useMemo } from "react";
import type { AccordionItemProps } from "../accordion.types";
import { useAccordionContext, AccordionItemContext } from "../accordion.context";

export function AccordionItem({
  children,
  value,
  disabled = false,
}: React.PropsWithChildren<AccordionItemProps>) {
  const { rootId } = useAccordionContext();

  const triggerId = `${rootId}-trigger-${value}`;
  const contentId = `${rootId}-content-${value}`;

  const contextValue = useMemo(
    () => ({
      value,
      disabled,
      triggerId,
      contentId,
    }),
    [value, disabled, triggerId, contentId]
  );

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div
        className={`astralis-w-full astralis-bg-surface-base astralis-border astralis-border-border-subtle astralis-rounded-lg astralis-overflow-hidden astralis-transition-all ${
          disabled ? "astralis-opacity-50 astralis-pointer-events-none" : ""
        }`}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
