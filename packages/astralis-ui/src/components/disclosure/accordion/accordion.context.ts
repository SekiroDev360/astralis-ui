import { createContext, useContext, type ReactNode } from "react";
import type {
  AccordionVariant,
  AccordionSize,
  AccordionIndicatorPosition,
  AccordionHeadingLevel,
} from "./accordion.types";

export interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  rootId: string;
  variant: AccordionVariant;
  size: AccordionSize;
  disabled: boolean;
  keepMounted: boolean;
  indicator: ReactNode | undefined;
  indicatorPosition: AccordionIndicatorPosition;
  hideIndicator: boolean;
  headingLevel: AccordionHeadingLevel;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordion(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion sub-components must be used within <Accordion>");
  return ctx;
}

export interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordionItem(): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error("Accordion.Trigger / Accordion.Content must be used within <Accordion.Item>");
  return ctx;
}
