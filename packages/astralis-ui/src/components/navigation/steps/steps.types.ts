import type { ReactNode, ComponentPropsWithoutRef } from "react";
import type {
  StepsOrientation,
  StepsVariant,
  StepsSize,
  StepsLabelPlacement,
} from "./steps.context";

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export interface StepsProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  /** Controlled active step index (0-based). */
  step?: number;
  /** Uncontrolled initial step index. */
  defaultStep?: number;
  /** Fires with the next step index whenever navigation occurs. */
  onStepChange?: (step: number) => void;
  /** Total steps. Optional — Steps.List counts its children automatically. */
  count?: number;
  orientation?: StepsOrientation;
  variant?: StepsVariant;
  size?: StepsSize;
  /** Restrict navigation to the next step only (no skipping ahead). */
  linear?: boolean;
  /** Horizontal only — `"bottom"` centers titles beneath the indicators (default `"inline"`). */
  labelPlacement?: StepsLabelPlacement;
  /** Make each indicator a button that jumps to its step. */
  clickable?: boolean;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

export interface StepsListProps extends ComponentPropsWithoutRef<"ol"> {
  children: ReactNode;
}

export interface StepsItemProps extends Omit<ComponentPropsWithoutRef<"li">, "title"> {
  /** Injected by Steps.List — its position in the list. */
  index?: number;
  /** Prevent navigation to this step. */
  disabled?: boolean;
  /** Force the error status on this step. */
  error?: boolean;
  children: ReactNode;
}

export interface StepsIndicatorProps extends ComponentPropsWithoutRef<"span"> {
  /** Override the default content (number / check / "!"). */
  children?: ReactNode;
}

export interface StepsTitleProps {
  children: ReactNode;
  className?: string;
}

export interface StepsDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface StepsContentProps extends ComponentPropsWithoutRef<"div"> {
  /** Show this content only when it is the active step. */
  index: number;
  children: ReactNode;
}

export interface StepsCompletedProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface StepsNavProps extends ComponentPropsWithoutRef<"button"> {
  children?: ReactNode;
}
