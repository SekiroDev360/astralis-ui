import { ChevronDown } from "lucide-react";
import { Icon } from "../../../icon";
import { useAccordionContext, useAccordionItemContext } from "../accordion.context";

interface AccordionIndicatorProps {
  value?: string;
  className?: string;
}

export function AccordionIndicator({
  value,
  className = "",
}: AccordionIndicatorProps) {
  const { isOpen } = useAccordionContext();
  const itemContext = useAccordionItemContext();

  const resolvedValue = value ?? itemContext?.value;
  const open = resolvedValue ? isOpen(resolvedValue) : false;

  return (
    <Icon
      as={ChevronDown}
      size="sm"
      className={`astralis-transition-transform astralis-text-label-base astralis-duration-moderate ${
        open ? "astralis-rotate-180" : ""
      } ${className}`}
      aria-hidden
    />
  );
}
