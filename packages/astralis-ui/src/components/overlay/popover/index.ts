import { PopoverRoot, PopoverTrigger, PopoverClose } from "./components/popover-root";
import { PopoverContent } from "./components/popover-content";
import { PopoverTitle, PopoverDescription } from "./components/popover-parts";

/** Compound API — `Popover` is the root; parts hang off it. */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
});

export { PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose };

export type { PopoverProps, PopoverContentProps, PopoverSectionProps, PopoverSlotProps } from "./popover.types";
