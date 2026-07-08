import type { ReactNode } from "react";
import { astralisMerge } from "../../../utils/astralis-merge";
import { CheckIcon } from "../../icon/internal-icons";

/**
 * Shared option-list machinery for the dropdown data-entry components
 * (Select, MultiSelect, Combobox) — one definition of grouping, flattening
 * and the option row, so their dropdowns cannot drift apart.
 */

export interface BaseOptionItem {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface BaseOptionGroup<O extends BaseOptionItem = BaseOptionItem> {
  group: string;
  options: O[];
}

export function isGroup<O extends BaseOptionItem>(opt: O | BaseOptionGroup<O>): opt is BaseOptionGroup<O> {
  return "group" in opt;
}

export function flattenOptions<O extends BaseOptionItem>(options: Array<O | BaseOptionGroup<O>>): O[] {
  return options.flatMap((o) => (isGroup(o) ? o.options : [o]));
}

/** Active/disabled paint for an option row (accent channel aware). */
export function optionRowClasses(active: boolean, disabled: boolean): string {
  if (disabled) return "astralis:text-label-subtle astralis:cursor-not-allowed astralis:opacity-moderate";
  return active ? "astralis:bg-accent-subtle astralis:text-accent-label" : "astralis:text-label-base astralis:hover:bg-surface-subtle";
}

export function OptionRow({
  option,
  isActive,
  isSelected,
  onPick,
  id,
}: {
  option: BaseOptionItem;
  isActive: boolean;
  isSelected: boolean;
  onPick: (value: string | number) => void;
  id?: string;
}) {
  return (
    <div
      id={id}
      role="option"
      aria-selected={isSelected}
      aria-disabled={option.disabled}
      onMouseDown={(e) => {
        // mousedown so we beat the trigger's blur event
        e.preventDefault();
        if (!option.disabled) onPick(option.value);
      }}
      className={astralisMerge(
        "astralis:flex astralis:items-center astralis:justify-between astralis:gap-2",
        "astralis:px-3 astralis:py-2 astralis:rounded-lg astralis:text-sm astralis:cursor-pointer astralis:transition-colors",
        optionRowClasses(isActive, !!option.disabled),
        isSelected && "astralis:font-medium",
      )}
    >
      <span className="astralis:truncate">{option.label}</span>
      {isSelected && <CheckIcon className="astralis:h-3.5 astralis:w-3.5 astralis:shrink-0 astralis:text-accent-solid" />}
    </div>
  );
}
