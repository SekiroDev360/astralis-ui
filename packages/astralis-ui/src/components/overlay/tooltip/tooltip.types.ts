import type { ReactNode, ReactElement } from "react";
import type { Side, Align } from "../../../hooks/use-anchor-position";

export interface TooltipProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Preferred side of the trigger. @default "top" */
  side?: Side;
  align?: Align;
  sideOffset?: number;
  /** Delay before showing on hover, ms. @default 300 */
  delay?: number;
  avoidCollisions?: boolean;
}

export interface TooltipTriggerProps {
  children: ReactElement<any>;
}

export interface TooltipContentProps {
  children: ReactNode;
  className?: string;
  /** Render an arrow pointing at the trigger. @default false */
  withArrow?: boolean;
}
