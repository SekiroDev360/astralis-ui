import type { ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type SelectSize = "sm" | "md" | "lg";
export type SelectVariant = "outline" | "filled";

export interface SelectOptionItem {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  group: string;
  options: SelectOptionItem[];
}

export type SelectOptionOrGroup = SelectOptionItem | SelectOptionGroup;

export interface SelectProps {
  /** List of options or option groups */
  options?: SelectOptionOrGroup[];
  /** Controlled selected value */
  value?: string | number | null;
  /** Uncontrolled default value */
  defaultValue?: string | number | null;
  /** Called when selection changes; receives `null` when cleared */
  onChange?: (value: string | number | null) => void;
  /** Called when selection is explicitly cleared */
  onClear?: () => void;
  placeholder?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  /** Hue for focus ring and selected-option highlight (via the accent channel). @default "brand" */
  colorScheme?: ColorScheme;
  disabled?: boolean;
  invalid?: boolean;
  /** Marks the select as read-only */
  readOnly?: boolean;
  /** Show a clear button when a value is selected */
  clearable?: boolean;
  /** Show search input inside the dropdown */
  searchable?: boolean;
  /** Shows a loading spinner instead of the chevron */
  loading?: boolean;
  /** Text shown when no options match */
  emptyText?: string;
  /**
   * Form field name. When set, a hidden input carrying the selected value is
   * rendered so the Select participates in native <form> submission.
   */
  name?: string;
  className?: string;
  id?: string;
}
