import { AccordionRoot } from "./components/accordion-root";
import { AccordionItem } from "./components/accordion-item";
import { AccordionTrigger } from "./components/accordion-trigger";
import { AccordionContent } from "./components/accordion-content";

/** Compound API — `Accordion` is the root; parts hang off it. */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

/** Flat exports of the sub-parts only (the root IS the compound export). */
export { AccordionItem, AccordionTrigger, AccordionContent };

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionType,
  AccordionVariant,
  AccordionSize,
  AccordionIndicatorPosition,
  AccordionHeadingLevel,
} from "./accordion.types";
