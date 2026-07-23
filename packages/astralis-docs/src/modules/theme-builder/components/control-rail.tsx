"use client";

import { Accordion, Button, Field, Heading, Input, Text } from "astralis-ui";
import type { ThemeSeed } from "astralis-ui/serialize";
import {
  COLOR_CONTROLS,
  FONT_PRESETS,
  FONT_SCALE_PRESETS,
  MOTION_PRESETS,
  RADIUS_PRESETS,
  SPACING_PRESETS,
  withFont,
  type BuilderState,
  type SeedFontField,
} from "@/lib/theme-builder";
import { ColorControlRow } from "./color-control";
import { PresetChips, ScaleControl } from "./controls";

interface ControlRailProps {
  state: BuilderState;
  setState: (updater: (prev: BuilderState) => BuilderState) => void;
  setSeed: <K extends keyof ThemeSeed>(key: K, value: ThemeSeed[K]) => void;
  /** Bumped by reset; keys the colour rows so their local hex drafts clear. */
  resetNonce: number;
  reset: () => void;
}

/** The left rail: sectioned token controls (Color / Size / Typography / Motion). */
export function ControlRail({ state, setState, setSeed, resetNonce, reset }: ControlRailProps) {
  const { seed } = state;

  const activeFontPreset = FONT_PRESETS.find(
    (p) => (p.heading?.export ?? undefined) === seed.fontHeading && (p.body?.export ?? undefined) === seed.fontBody,
  );

  /** A free-typed stack is its own preview — there is no webfont to swap in. */
  const setFontText = (field: SeedFontField, value: string) =>
    setState((prev) => withFont(prev, field, value ? { preview: value, export: value } : null));

  // A scale of exactly 1 is the library default, so store it as "unset" —
  // that keeps the export empty and the reset state honest.
  const scale = (key: "radiusScale" | "spacingScale" | "fontSizeScale" | "motionScale") => ({
    value: seed[key] ?? 1,
    onChange: (v: number) => setSeed(key, v === 1 ? undefined : v),
  });

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
              <div className="flex flex-col gap-5 pb-2">
                {COLOR_CONTROLS.map((control) => (
                  <ColorControlRow
                    // Remount on reset so the local hex draft clears with it.
                    key={`${control.field}-${resetNonce}`}
                    control={control}
                    value={seed[control.field]}
                    onChange={(hex) => setSeed(control.field, hex)}
                  />
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="size">
            <Accordion.Trigger>Size</Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-6 pb-2">
                <ScaleControl
                  label="Radius"
                  info="Corner rounding across every component — buttons, cards, inputs, menus. A multiplier on the whole radius ramp, so the relationship between sm and 2xl is preserved."
                  presets={RADIUS_PRESETS}
                  {...scale("radiusScale")}
                  min={0}
                  max={3}
                  step={0.25}
                  format={(v) => `${+(6 * v).toFixed(1)}px md`}
                />
                <ScaleControl
                  label="Spacing"
                  info="The density dial: padding and gaps everywhere. Scales the whole spacing ramp, so a compact setting tightens the UI uniformly rather than shrinking one component."
                  presets={SPACING_PRESETS}
                  {...scale("spacingScale")}
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
                        onClick={() =>
                          setState((prev) =>
                            withFont(withFont(prev, "fontHeading", preset.heading), "fontBody", preset.body),
                          )
                        }
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
                    value={seed.fontHeading ?? ""}
                    onChange={(e) => setFontText("fontHeading", e.target.value)}
                  />
                </Field>
                <Field>
                  <Field.Label>Body font-family</Field.Label>
                  <Input
                    size="sm"
                    placeholder="library default"
                    value={seed.fontBody ?? ""}
                    onChange={(e) => setFontText("fontBody", e.target.value)}
                  />
                </Field>
                <Field>
                  <Field.Label>Mono font-family</Field.Label>
                  <Input
                    size="sm"
                    placeholder="library default"
                    value={seed.fontMono ?? ""}
                    onChange={(e) => setFontText("fontMono", e.target.value)}
                  />
                  <Field.HelpText>Fonts must be loaded by your app.</Field.HelpText>
                </Field>
                <ScaleControl
                  label="Type scale"
                  info="A multiplier on every font size at once. Because the ramp scales together, headings and body text keep their relative proportions."
                  presets={FONT_SCALE_PRESETS}
                  {...scale("fontSizeScale")}
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
                    {Math.round(200 * (seed.motionScale ?? 1))}ms moderate
                  </Text>
                </div>
                <PresetChips options={MOTION_PRESETS} {...scale("motionScale")} />
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </aside>
  );
}
