import type { ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type AccordionType = "single" | "multiple";
export type AccordionVariant = "enclosed" | "outline" | "separated" | "subtle" | "plain";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionIndicatorPosition = "start" | "end";
export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface AccordionProps {
  children?: ReactNode;
  /** `single` keeps one item open; `multiple` allows many. */
  type?: AccordionType;
  variant?: AccordionVariant;
  size?: AccordionSize;
  /** Hue for the focus ring and the `subtle` variant's open fill. Defaults to `gray`. */
  colorScheme?: ColorScheme;
  /** Controlled open value(s) — string for `single`, string[] for `multiple`. */
  value?: string | string[];
  defaultValue?: string | string[];
  /** `single` only: allow closing the open item (open nothing). */
  collapsible?: boolean;
  /** Disable the whole accordion. */
  disabled?: boolean;
  /** Render content even before its first open (otherwise it mounts lazily). */
  keepMounted?: boolean;
  /** Custom indicator node, replacing the default chevron for every trigger. */
  indicator?: ReactNode;
  indicatorPosition?: AccordionIndicatorPosition;
  hideIndicator?: boolean;
  /** Heading level the trigger is wrapped in, for document outline. Defaults to 3. */
  headingLevel?: AccordionHeadingLevel;
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

export interface AccordionItemProps {
  children?: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

export interface AccordionTriggerProps {
  children?: ReactNode;
  /** Per-trigger indicator override. */
  indicator?: ReactNode;
  hideIndicator?: boolean;
  className?: string;
}

export interface AccordionContentProps {
  children?: ReactNode;
  className?: string;
}
