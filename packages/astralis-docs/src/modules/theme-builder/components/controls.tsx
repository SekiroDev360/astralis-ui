"use client";

import { Button, Popover, Slider, Text } from "astralis-ui";

/** Shared control primitives for the token rail. */

/** The ⓘ trigger beside a control's title. */
export function InfoPopover({ label, info }: { label: string; info: string }) {
  return (
    <Popover side="right">
      <Popover.Trigger>
        <button
          type="button"
          aria-label={`What does ${label} change?`}
          className="grid size-4 cursor-pointer place-items-center rounded-full border border-stroke-base text-[10px] font-semibold leading-none text-label-subtle transition-colors hover:border-stroke-emphasized hover:text-label-base"
        >
          i
        </button>
      </Popover.Trigger>
      <Popover.Content withArrow className="max-w-64">
        <Popover.Title>{label}</Popover.Title>
        <Popover.Description>{info}</Popover.Description>
      </Popover.Content>
    </Popover>
  );
}

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
  info,
  presets,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  info?: string;
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
        <div className="flex items-center gap-1.5">
          <Text size="sm" weight="medium">
            {label}
          </Text>
          {info && <InfoPopover label={label} info={info} />}
        </div>
        <Text size="xs" color="subtle" className="tabular-nums">
          {format ? format(value) : `×${value.toFixed(2)}`}
        </Text>
      </div>
      <PresetChips options={presets} value={value} onChange={onChange} />
      <Slider className="mt-3" value={value} onChange={onChange} min={min} max={max} step={step} aria-label={`${label} scale`} />
    </div>
  );
}
