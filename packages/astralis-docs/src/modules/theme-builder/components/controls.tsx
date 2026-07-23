"use client";

import { Button, Slider, Text } from "astralis-ui";

/** Shared control primitives for the token rail. */

export function PresetChips({
  options,
  value,
  onChange,
}: {
  options: ReadonlyArray<{ label: string; value: number }>;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <Button
          key={option.label}
          size="xs"
          variant={option.value === value ? "subtle" : "outline"}
          colorScheme={option.value === value ? "brand" : "gray"}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export function ScaleControl({
  label,
  presets,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  presets: ReadonlyArray<{ label: string; value: number }>;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (value: number) => string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Text size="sm" weight="medium">
          {label}
        </Text>
        <Text size="xs" color="subtle" className="tabular-nums">
          {format ? format(value) : `×${value.toFixed(2)}`}
        </Text>
      </div>
      <PresetChips options={presets} value={value} onChange={onChange} />
      <Slider className="mt-3" value={value} onChange={onChange} min={min} max={max} step={step} aria-label={`${label} scale`} />
    </div>
  );
}
