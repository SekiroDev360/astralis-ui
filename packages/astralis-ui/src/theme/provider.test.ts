import { describe, expect, it } from "vitest";
import { generateBrandShades, generateBrandTokens } from "./provider";

const VIOLET = "#8b5cf6";
const HEX = /^#[0-9a-f]{6}$/;

/** Perceptual lightness (OKLab L) — enough fidelity to assert ramp ordering. */
function oklabL(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const lin = (u: number) => (u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4));
  const r = lin(((n >> 16) & 255) / 255), g = lin(((n >> 8) & 255) / 255), b = lin((n & 255) / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
}

describe("generateBrandShades", () => {
  it("returns all ten steps as valid hex, with the input as the 500 step", () => {
    const vars = generateBrandShades(VIOLET) as Record<string, string>;
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    for (const step of steps) {
      expect(vars[`--astralis-color-brand-${step}`]).toMatch(HEX);
    }
    expect(vars["--astralis-color-brand-500"]).toBe(VIOLET);
  });

  it("produces a strictly darkening ramp from 50 to 900", () => {
    const vars = generateBrandShades(VIOLET) as Record<string, string>;
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const ls = steps.map((s) => oklabL(vars[`--astralis-color-brand-${s}`]));
    for (let i = 1; i < ls.length; i++) {
      expect(ls[i]).toBeLessThan(ls[i - 1]);
    }
  });

  it("returns no vars for undefined and a lone 500 for an unparseable color", () => {
    expect(generateBrandShades(undefined)).toEqual({});
    expect(generateBrandShades("not-a-color")).toEqual({
      "--astralis-color-brand-500": "not-a-color",
    });
  });

  it("supports shorthand hex", () => {
    const vars = generateBrandShades("#f0f") as Record<string, string>;
    expect(vars["--astralis-color-brand-900"]).toMatch(HEX);
  });
});

describe("generateBrandTokens", () => {
  it("re-declares brand AND accent role tokens (the P0 subtree-baking fix)", () => {
    const vars = generateBrandTokens(VIOLET, "light") as Record<string, string>;
    for (const role of ["solid", "contrast", "label", "subtle", "muted", "emphasized", "stroke", "ring"]) {
      expect(vars[`--astralis-color-brand-${role}`], `brand-${role}`).toBeTruthy();
      expect(vars[`--astralis-color-accent-${role}`], `accent-${role}`).toBeTruthy();
    }
  });

  it("uses different role recipes for light and dark", () => {
    const light = generateBrandTokens(VIOLET, "light") as Record<string, string>;
    const dark = generateBrandTokens(VIOLET, "dark") as Record<string, string>;
    // Light subtle is a faint tint (100); dark subtle is a deep shade (900).
    expect(light["--astralis-color-brand-subtle"]).not.toBe(dark["--astralis-color-brand-subtle"]);
    expect(oklabL(light["--astralis-color-brand-subtle"])).toBeGreaterThan(
      oklabL(dark["--astralis-color-brand-subtle"]),
    );
    // solid (= the input) is theme-independent.
    expect(light["--astralis-color-brand-solid"]).toBe(dark["--astralis-color-brand-solid"]);
  });

  it("picks readable contrast text: white on dark brands, black on light brands", () => {
    const onViolet = generateBrandTokens(VIOLET, "light") as Record<string, string>;
    expect(onViolet["--astralis-color-brand-contrast"]).toBe("#ffffff");
    const onYellow = generateBrandTokens("#eab308", "light") as Record<string, string>;
    expect(onYellow["--astralis-color-brand-contrast"]).toBe("#000000");
  });
});
