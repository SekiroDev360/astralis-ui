import { useMemo } from "react";
import { useAccordion, AccordionItemContext } from "../accordion.context";
import { accordionItemVariants } from "../accordion.styles";
import type { AccordionItemProps } from "../accordion.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function AccordionItem({ children, value, disabled = false, className = "" }: AccordionItemProps) {
  const { rootId, variant, isOpen, disabled: rootDisabled } = useAccordion();

  const itemDisabled = disabled || rootDisabled;
  const open = isOpen(value);

  const ctx = useMemo(
    () => ({
      value,
      open,
      disabled: itemDisabled,
      triggerId: `${rootId}-trigger-${value}`,
      contentId: `${rootId}-content-${value}`,
    }),
    [value, open, itemDisabled, rootId],
  );

  return (
    <AccordionItemContext.Provider value={ctx}>
      <div
        data-state={open ? "open" : "closed"}
        data-disabled={itemDisabled ? "" : undefined}
        className={astralisMerge(accordionItemVariants({ variant, disabled: itemDisabled }), className)}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
