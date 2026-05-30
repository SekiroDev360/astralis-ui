import { CheckableTag } from "./checkable-tag";
import type { CheckableTagGroupProps } from "../tag.types";

export function CheckableTagGroup({
  value = [],
  onChange,
  options,
  multiple = false,
  size = "md",
  className = "",
  style,
}: CheckableTagGroupProps) {
  const handleToggle = (optionValue: string | number, isChecked: boolean) => {
    if (!onChange) return;

    if (multiple) {
      if (isChecked) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((item) => item !== optionValue));
      }
    } else if (isChecked) {
      onChange([optionValue]);
    } else {
      onChange([]);
    }
  };

  return (
    <div
      className={["astralis-flex astralis-flex-wrap astralis-gap-2", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {options.map((option) => {
        const isObject = typeof option === "object" && option !== null;
        const optionValue = isObject ? option.value : option;
        const optionLabel = isObject ? option.label : option;
        const checked = value.includes(optionValue);

        return (
          <CheckableTag
            key={String(optionValue)}
            size={size}
            checked={checked}
            onChange={(nextChecked) => handleToggle(optionValue, nextChecked)}
          >
            {optionLabel}
          </CheckableTag>
        );
      })}
    </div>
  );
}

CheckableTagGroup.displayName = "Tag.Group";
