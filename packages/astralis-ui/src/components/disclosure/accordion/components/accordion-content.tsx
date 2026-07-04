import { useRef } from "react";
import { useAccordion, useAccordionItem } from "../accordion.context";
import { accordionContentVariants } from "../accordion.styles";
import type { AccordionContentProps } from "../accordion.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

/**
 * Smoothly collapsing region. The outer grid animates `grid-template-rows`
 * from `0fr` → `1fr` (a JS-measurement-free height transition); the inner
 * wrapper clips the overflow. Content mounts lazily on first open (unless
 * `keepMounted`) and stays mounted afterwards so the collapse still animates.
 */
export function AccordionContent({ children, className = "" }: AccordionContentProps) {
  const { size, keepMounted } = useAccordion();
  const { open, triggerId, contentId } = useAccordionItem();

  const hasOpened = useRef(false);
  if (open) hasOpened.current = true;
  const mounted = open || hasOpened.current || keepMounted;

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={open ? "open" : "closed"}
      className="astralis:grid astralis:transition-all astralis:duration-moderate"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="astralis:overflow-hidden astralis:min-h-0" inert={!open}>
        <div className={astralisMerge(accordionContentVariants({ size }), className)}>
          {mounted ? children : null}
        </div>
      </div>
    </div>
  );
}
