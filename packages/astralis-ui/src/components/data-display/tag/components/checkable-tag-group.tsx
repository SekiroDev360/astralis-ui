import { CheckableTag } from "./checkable-tag";
import type { CheckableTagGroupProps } from "../tag.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

/** Renders a set of CheckableTags with single- or multi-select behaviour. */
export function CheckableTagGroup({
  value = [],
  onChange,
  options,
  multiple = false,
  size = "md",
  colorScheme = "brand",
  className = "",
  style,
  ...rest
}: CheckableTagGroupProps) {
  const toggle = (optionValue: string | number, isChecked: boolean) => {
    if (!onChange) return;
    if (multiple) {
      onChange(isChecked ? [...value, optionValue] : value.filter((v) => v !== optionValue));
    } else {
      onChange(isChecked ? [optionValue] : []);
    }
  };

  return (
    <div className={astralisMerge("astralis:flex astralis:flex-wrap astralis:gap-2", className)} style={style} role="group" {...rest}>
      {options.map((option) => {
        const isObject = typeof option === "object" && option !== null;
        const optionValue = isObject ? option.value : option;
        const optionLabel = isObject ? option.label : option;
        const checked = value.includes(optionValue);
        return (
          <CheckableTag
            key={String(optionValue)}
            size={size}
            colorScheme={colorScheme}
            checked={checked}
            onChange={(next) => toggle(optionValue, next)}
          >
            {optionLabel}
          </CheckableTag>
        );
      })}
    </div>
  );
}

CheckableTagGroup.displayName = "Tag.Group";
