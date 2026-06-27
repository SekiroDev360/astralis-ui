import type { ReactNode, ComponentPropsWithoutRef } from "react";
import type {
  TabsOrientation,
  TabsVariant,
  TabsSize,
  TabsActivationMode,
} from "./tabs.context";

export interface TabsProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  /** Controlled active value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  size?: TabsSize;
  /** Stretch triggers to fill the list width. */
  fitted?: boolean;
  /** Apply pill/rounded radii to applicable variants (subtle/segmented/outline). */
  rounded?: boolean;
  /** `"automatic"` (default) selects on focus; `"manual"` selects on Enter/Space. */
  activationMode?: TabsActivationMode;
  /** Keep inactive panels mounted (hidden) rather than unmounting them. */
  keepMounted?: boolean;
  /** Wrap focus around the ends during arrow-key navigation (default true). */
  loop?: boolean;
  children: ReactNode;
}

export interface TabsListProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface TabsTriggerProps extends Omit<ComponentPropsWithoutRef<"button">, "value"> {
  /** Unique value linking this trigger to its Content. */
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

export interface TabsContentProps extends ComponentPropsWithoutRef<"div"> {
  /** Matches the trigger's `value`. */
  value: string;
  children: ReactNode;
}
