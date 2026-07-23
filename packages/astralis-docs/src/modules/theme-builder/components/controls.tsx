"use client";

import { Info } from "lucide-react";
import { Button, ButtonGroup, Icon, Popover, Slider, Text } from "astralis-ui";

/** Shared control primitives for the token rail. */

/** The ⓘ trigger beside a control's title. */
export function InfoPopover({ label, info }: { label: string; info: string }) {
  return (
    <Popover side="right">
      <Popover.Trigger>
        <Button
          variant="text"
          colorScheme="gray"
          size="xs"
          rounded="full"
          aria-label={`What does ${label} change?`}
          leftIcon={<Icon as={Info} size="xs" color="subtle" />}
          /* The 28px hit area is right; stretching a dense rail row by 8px is
             not, so the negative margin keeps the target without the height. */
          className="-mt-0.5"
        />
      </Popover.Trigger>
      <Popover.Content withArrow className="max-w-64">
        <Popover.Title>{label}</Popover.Title>
        <Popover.Description>{info}</Popover.Description>
      </Popover.Content>
    </Popover>
  );
}

/**
 * A row of mutually exclusive presets.
 *
 * Generic in the value so the same row serves a numeric scale and a font
 * pairing — the two used to be separate copies of this markup. Options are
 * matched by `===`, so object values must be the identical reference (they are:
 * both callers select from a module-level preset array).
 */
export function PresetChips<T>({
  options,
  value,
  onChange,
}: {
  options: ReadonlyArray<{ label: string; value: T }>;
  /** undefined = nothing selected, e.g. a hand-typed font stack matching no preset. */
  value: T | undefined;
  onChange: (value: T) => void;
}) {
  return (
    // ButtonGroup is inline-flex, but as a flex item it blockifies and fills
    // the rail — which is what lets flex-wrap actually break the row.
    <ButtonGroup spacing="sm" className="flex-wrap">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Button
            key={option.label}
            size="xs"
            variant={active ? "subtle" : "outline"}
            colorScheme={active ? "brand" : "gray"}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
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
        <div className="flex items-center gap-0.5">
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
