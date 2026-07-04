import type { ElementType, ReactNode } from "react";
import { useAccordion, useAccordionItem } from "../accordion.context";
import { accordionTriggerVariants, accordionIndicatorVariants } from "../accordion.styles";
import type { AccordionTriggerProps } from "../accordion.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import Icon from "../../../icon/icon";
import { ChevronDownIcon } from "../../../icon/internal-icons";

const iconSizeFor = { sm: "xs", md: "sm", lg: "md" } as const;

export function AccordionTrigger({
  children,
  indicator: indicatorProp,
  hideIndicator: hideIndicatorProp,
  className = "",
}: AccordionTriggerProps) {
  const root = useAccordion();
  const { value, open, disabled, triggerId, contentId } = useAccordionItem();

  const Heading = `h${root.headingLevel}` as ElementType;
  const hideIndicator = hideIndicatorProp ?? root.hideIndicator;

  // Resolution order: per-trigger override → root override → default chevron.
  let indicator: ReactNode = null;
  if (!hideIndicator) {
    const custom = indicatorProp ?? root.indicator;
    indicator = (
      <span className={accordionIndicatorVariants({ open })} aria-hidden>
        {custom ?? (
          <Icon size={iconSizeFor[root.size]}>
            <ChevronDownIcon />
          </Icon>
        )}
      </span>
    );
  }

  const atStart = root.indicatorPosition === "start";

  return (
    <Heading className="astralis:m-0">
      <button
        type="button"
        id={triggerId}
        data-accordion-trigger="true"
        data-state={open ? "open" : "closed"}
        disabled={disabled}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => { if (!disabled) root.toggle(value); }}
        className={astralisMerge(
          accordionTriggerVariants({ size: root.size, variant: root.variant, open }),
          className,
        )}
      >
        {atStart && indicator}
        <span className="astralis:flex-1 astralis:text-left">{children}</span>
        {!atStart && indicator}
      </button>
    </Heading>
  );
}
