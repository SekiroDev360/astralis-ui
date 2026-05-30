import { AccordionRoot } from "./components/accordion-root";
import { AccordionItem } from "./components/accordion-item";
import { AccordionTrigger } from "./components/accordion-trigger";
import { AccordionContent } from "./components/accordion-content";
import { AccordionIndicator } from "./components/accordion-indicator";
import { AccordionTitle } from "./components/accordion-title";

// 1️⃣ Compound DX API
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
  Conten: AccordionContent, // Retain alias for legacy support
  Indicator: AccordionIndicator,
  Title: AccordionTitle,
});

// 2️⃣ Flat exports for tree-shaking
export {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionIndicator,
  AccordionTitle,
};

// 3️⃣ Type exports
export type { AccordionProps, AccordionItemProps } from "./accordion.types";
