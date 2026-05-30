import { PopoverContent } from "./components/popover-content";
import { PopoverRoot } from "./components/popover-root";
import { PopoverTrigger } from "./components/popover-trigger";

// 1️⃣ Compound DX API
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});

// 2️⃣ Flat exports for tree-shaking
export { PopoverTrigger, PopoverContent };

export type {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "./popover.types";
