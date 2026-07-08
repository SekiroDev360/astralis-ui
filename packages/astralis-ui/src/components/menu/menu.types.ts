import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import type { Side, Align } from "../../hooks/use-anchor-position";

export interface MenuProps {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Preferred side of the trigger. @default "bottom" */
  side?: Side;
  /** Alignment along the trigger. @default "start" */
  align?: Align;
  /** Gap between trigger and menu, px. @default 6 */
  sideOffset?: number;
  /** Close the menu after an item is selected. @default true */
  closeOnSelect?: boolean;
}

export interface MenuTriggerProps {
  /** A single focusable element (e.g. a Button); the menu wires it up via props. */
  children: ReactElement<Record<string, unknown>>;
}

export interface MenuContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface MenuItemProps extends Omit<ComponentPropsWithoutRef<"div">, "onSelect"> {
  /** Runs on activation (click / Enter / Space). */
  onSelect?: () => void;
  disabled?: boolean;
  /** Destructive styling (delete, remove, …). */
  danger?: boolean;
  /** Leading glyph slot. */
  icon?: ReactNode;
  /** Trailing hint slot (e.g. a Kbd shortcut). */
  shortcut?: ReactNode;
  /** Override the menu-level closeOnSelect for this item. */
  closeOnSelect?: boolean;
  children: ReactNode;
}

export interface MenuSectionProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}
