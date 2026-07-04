import { TooltipRoot, TooltipTrigger } from "./components/tooltip-root";
import { TooltipContent } from "./components/tooltip-content";

/** Compound API — `Tooltip` is the root; parts hang off it. */
export const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});

export { TooltipTrigger, TooltipContent };

export type { TooltipProps, TooltipTriggerProps, TooltipContentProps } from "./tooltip.types";
