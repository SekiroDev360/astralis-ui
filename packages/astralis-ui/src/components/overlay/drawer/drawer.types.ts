import type { ComponentPropsWithoutRef, ReactNode, ReactElement } from "react";
import type { DrawerPlacement, DrawerSize } from "./drawer.context";

export interface DrawerProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Edge the drawer slides in from. @default "right" */
  placement?: DrawerPlacement;
  size?: DrawerSize;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export interface DrawerSlotProps {
  children: ReactElement<any>;
}

export interface DrawerContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export interface DrawerSectionProps {
  children: ReactNode;
  className?: string;
}
