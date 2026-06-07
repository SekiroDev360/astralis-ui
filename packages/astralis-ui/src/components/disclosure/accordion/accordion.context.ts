import { createContext, useContext } from "react";
import type { AccordionVariant } from "./accordion.types";

export interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  rootId: string;
  variant: AccordionVariant;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("Accordion components must be used within <Accordion />");
  }
  return ctx;
}

export interface AccordionItemContextValue {
  value: string;
  disabled?: boolean;
  triggerId: string;
  contentId: string;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordionItemContext() {
  return useContext(AccordionItemContext);
}

export default AccordionContext;
