"use client";

import { useState } from "react";
import { Field, Input, Text } from "astralis-ui";
import type { ColorControl } from "@/lib/theme-builder";
import { InfoPopover } from "./controls";

const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

/**
 * One seedable colour: five preset circles (Default first), the custom picker
 * as the sixth, and a hex field below.
 *
 * The hex draft is local so a half-typed value ("#8b5") can sit in the input
 * without being committed. The parent remounts these on reset — see the
 * `resetNonce` key in ControlRail — which is why no effect syncs them back.
 */
export function ColorControlRow({
  control,
  value,
  onChange,
}: {
  control: ColorControl;
  /** undefined = no override, i.e. the library's own palette. */
  value: string | undefined;
  onChange: (hex: string | undefined) => void;
}) {
  const { field, label, info, defaultHex, presets } = control;
  const [draft, setDraft] = useState(value ?? "");

  const pick = (hex: string | undefined) => {
    onChange(hex);
    setDraft(hex ?? "");
  };

  const circle = "size-7 cursor-pointer rounded-full border-2 transition-transform hover:scale-110";
  const ring = (active: boolean) => (active ? "border-label" : "border-transparent");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Text size="sm" weight="medium">
          {label}
        </Text>
        <InfoPopover label={label} info={info} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-label={`${label} default`}
          aria-pressed={value === undefined}
          title={`Library default — ${defaultHex}`}
          onClick={() => pick(undefined)}
          className={`${circle} ${ring(value === undefined)}`}
          style={{ backgroundColor: defaultHex }}
        />
        {presets.map((preset) => (
          <button
            key={preset.hex}
            type="button"
            aria-label={`${label} ${preset.name}`}
            aria-pressed={value === preset.hex}
            title={`${preset.name} — ${preset.hex}`}
            onClick={() => pick(preset.hex)}
            className={`${circle} ${ring(value === preset.hex)}`}
            style={{ backgroundColor: preset.hex }}
          />
        ))}
        <label
          className="relative size-7 cursor-pointer overflow-hidden rounded-full border border-stroke-subtle"
          aria-label={`Custom ${label.toLowerCase()} color`}
          title="Custom"
          style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
        >
          <input
            type="color"
            value={value ?? defaultHex}
            onChange={(e) => pick(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
      </div>

      <Field>
        <Input
          size="sm"
          aria-label={`${label} hex`}
          /* The library's own value, shown but not applied — an untouched
             field must emit nothing so the export stays minimal. */
          placeholder={defaultHex}
          value={draft}
          onChange={(e) => {
            const next = e.target.value;
            setDraft(next);
            const trimmed = next.trim();
            if (trimmed === "") onChange(undefined);
            else if (HEX_PATTERN.test(trimmed)) onChange(trimmed.toLowerCase());
          }}
          data-field={field}
        />
      </Field>
    </div>
  );
}
