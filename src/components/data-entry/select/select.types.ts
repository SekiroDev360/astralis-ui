import type { ReactNode } from "react";

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
  disabled?: boolean;
  invalid?: boolean;
  /** Show a clear button when a value is selected */
  clearable?: boolean;
  /** Show search input inside the dropdown */
  searchable?: boolean;
  /** Shows a loading spinner instead of the chevron */
  loading?: boolean;
  /** Text shown when no options match */
  emptyText?: string;
  className?: string;
  id?: string;
}
