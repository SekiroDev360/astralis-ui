"use client";

import { Accordion, Button, Field, Heading, Input, Text } from "astralis-ui";
import {
  BRAND_SWATCHES,
  FONT_PRESETS,
  FONT_SCALE_PRESETS,
  MOTION_PRESETS,
  RADIUS_PRESETS,
  SPACING_PRESETS,
  type ThemeState,
} from "@/lib/theme-builder";
import { PresetChips, ScaleControl } from "./controls";

const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

interface ControlRailProps {
  state: ThemeState;
  hexDraft: string;
  setHexDraft: (value: string) => void;
  set: <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => void;
  setBrand: (hex: string | null) => void;
  reset: () => void;
}

/** The left rail: sectioned token controls (Color / Size / Typography / Motion). */
export function ControlRail({ state, hexDraft, setHexDraft, set, setBrand, reset }: ControlRailProps) {
  const activeFontPreset = FONT_PRESETS.find(
    (p) => p.heading?.export === state.headingFont?.export && p.body?.export === state.bodyFont?.export,
  );

  return (
    <aside className="docs-scroll flex min-h-0 flex-col gap-2 overflow-y-auto pr-1 max-lg:max-h-96">
      <div className="flex items-center justify-between">
        <Heading as="h2" size="sm">
          Theme Builder
        </Heading>
        <Button variant="text" colorScheme="gray" size="xs" onClick={reset}>
          Reset
        </Button>
      </div>

      {/* shrink-0: without it the flex column squeezes the accordion to fit
          and the rail never overflows, so its scrollbar never engages. */}
      <div className="shrink-0">
        <Accordion type="multiple" defaultValue={["color", "size"]}>
          <Accordion.Item value="color">
            <Accordion.Trigger>Color</Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-3 pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Default first: the library's own brand palette (no override). */}
                  <button
                    type="button"
                    aria-label="Brand color Default"
                    title="Library default"
                    onClick={() => setBrand(null)}
                    className={`size-7 cursor-pointer rounded-full border-2 transition-transform hover:scale-110 ${
                      state.brandColor === null ? "border-label" : "border-transparent"
                    }`}
                    style={{ backgroundColor: "var(--astralis-color-brand-500)" }}
                  />
                  {BRAND_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      aria-label={`Brand color ${swatch.name}`}
                      onClick={() => setBrand(swatch.hex)}
                      className={`size-7 cursor-pointer rounded-full border-2 transition-transform hover:scale-110 ${
                        state.brandColor === swatch.hex ? "border-label" : "border-transparent"
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    />
                  ))}
                  <label
                    className="relative size-7 cursor-pointer overflow-hidden rounded-full border border-stroke-subtle"
                    aria-label="Custom brand color"
                    style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
                  >
                    <input
                      type="color"
                      value={state.brandColor ?? "#8b5cf6"}
                      onChange={(e) => setBrand(e.target.value)}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </label>
                </div>
                <Field>
                  <Field.Label>Brand hex</Field.Label>
                  <Input
                    size="sm"
                    placeholder="library default"
                    value={hexDraft}
                    onChange={(e) => {
                      setHexDraft(e.target.value);
                      const trimmed = e.target.value.trim();
                      if (trimmed === "") set("brandColor", null);
                      else if (HEX_PATTERN.test(trimmed)) set("brandColor", trimmed.toLowerCase());
                    }}
                  />
                </Field>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="size">
            <Accordion.Trigger>Size</Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-6 pb-2">
                <ScaleControl
                  label="Radius"
                  presets={RADIUS_PRESETS}
                  value={state.radiusScale}
                  onChange={(v) => set("radiusScale", v)}
                  min={0}
                  max={3}
                  step={0.25}
                  format={(v) => `${+(6 * v).toFixed(1)}px md`}
                />
                <ScaleControl
                  label="Spacing"
                  presets={SPACING_PRESETS}
                  value={state.spacingScale}
                  onChange={(v) => set("spacingScale", v)}
                  min={0.75}
                  max={1.25}
                  step={0.025}
                />
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="typography">
            <Accordion.Trigger>Typography</Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-5 pb-2">
                <div className="flex flex-col gap-2">
                  <Text size="sm" weight="medium">
                    Font pairing
                  </Text>
                  <div className="flex flex-wrap gap-1.5">
                    {FONT_PRESETS.map((preset) => (
                      <Button
                        key={preset.label}
                        size="xs"
                        variant={preset === activeFontPreset ? "subtle" : "outline"}
                        colorScheme={preset === activeFontPreset ? "brand" : "gray"}
                        onClick={() => {
                          set("headingFont", preset.heading);
                          set("bodyFont", preset.body);
                        }}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <Field>
                  <Field.Label>Heading font-family</Field.Label>
                  <Input
                    size="sm"
                    placeholder="library default"
                    value={state.headingFont?.export ?? ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      set("headingFont", v ? { preview: v, export: v } : null);
                    }}
                  />
                </Field>
                <Field>
                  <Field.Label>Body font-family</Field.Label>
                  <Input
                    size="sm"
                    placeholder="library default"
                    value={state.bodyFont?.export ?? ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      set("bodyFont", v ? { preview: v, export: v } : null);
                    }}
                  />
                  <Field.HelpText>Fonts must be loaded by your app.</Field.HelpText>
                </Field>
                <ScaleControl
                  label="Type scale"
                  presets={FONT_SCALE_PRESETS}
                  value={state.fontScale}
                  onChange={(v) => set("fontScale", v)}
                  min={0.85}
                  max={1.15}
                  step={0.0125}
                />
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="motion">
            <Accordion.Trigger>Motion</Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-2 pb-2">
                <div className="flex items-center justify-between">
                  <Text size="sm" weight="medium">
                    Speed
                  </Text>
                  <Text size="xs" color="subtle" className="tabular-nums">
                    {Math.round(200 * state.motionScale)}ms moderate
                  </Text>
                </div>
                <PresetChips
                  options={MOTION_PRESETS}
                  value={state.motionScale}
                  onChange={(v) => set("motionScale", v)}
                />
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </aside>
  );
}
