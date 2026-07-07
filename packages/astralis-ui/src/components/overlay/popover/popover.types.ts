import type { ComponentPropsWithoutRef, ReactNode, ReactElement } from "react";
import type { Side, Align } from "../../../hooks/use-anchor-position";

export interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Preferred side of the trigger. @default "bottom" */
  side?: Side;
  /** Alignment along that side. @default "center" */
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  /** Flip/shift to stay in view. @default true */
  avoidCollisions?: boolean;
  closeOnEsc?: boolean;
  closeOnOutsidePointer?: boolean;
}

export interface PopoverSlotProps {
  children: ReactElement<any>;
}

export interface PopoverContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
  /** Render the arrow pointing at the trigger. @default false */
  withArrow?: boolean;
}

export interface PopoverSectionProps {
  children: ReactNode;
  className?: string;
}
