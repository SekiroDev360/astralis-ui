import type { ReactNode } from "react";

export type MultiSelectSize = "sm" | "md" | "lg";
export type MultiSelectVariant = "outline" | "filled";

export interface MultiSelectOptionItem {
  value: string | number;
  label: ReactNode;
  /** Label used for search filtering (plain string fallback when label is JSX) */
  searchLabel?: string;
  disabled?: boolean;
}

export interface MultiSelectOptionGroup {
  group: string;
  options: MultiSelectOptionItem[];
}

export type MultiSelectOptionOrGroup =
  | MultiSelectOptionItem
  | MultiSelectOptionGroup;

export interface MultiSelectProps {
  options?: MultiSelectOptionOrGroup[];
  /** Controlled array of selected values */
  value?: Array<string | number>;
  /** Default selected values for uncontrolled usage */
  defaultValue?: Array<string | number>;
  /** Fires whenever the selection changes */
  onChange?: (values: Array<string | number>) => void;
  placeholder?: string;
  size?: MultiSelectSize;
  variant?: MultiSelectVariant;
  disabled?: boolean;
  invalid?: boolean;
  /** Marks the multi-select as read-only */
  readOnly?: boolean;
  /** Show a button to clear all selections */
  clearable?: boolean;
  /** Maximum number of items that can be selected */
  max?: number;
  /** Text shown when no options match the search */
  emptyText?: string;
  /** Shows a loading state */
  loading?: boolean;
  className?: string;
  id?: string;
}
