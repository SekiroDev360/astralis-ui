import type { ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

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
  /** Hue for focus ring, selected tags, and highlighted options (via the accent channel). @default "brand" */
  colorScheme?: ColorScheme;
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
  /**
   * Form field name. When set, one hidden input per selected value is
   * rendered (repeated name, the standard multi-value convention) so the
   * MultiSelect participates in native <form> submission.
   */
  name?: string;
  className?: string;
  id?: string;
}
