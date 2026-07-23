import { describe, expect, it } from "vitest";
import { generateBrandShades, generateBrandTokens, generateThemeTokens } from "./css-vars";
import { generateThemeTokens as themeVars } from "./theme-math";

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
  it("returns all eleven steps as valid hex, with the input as the 500 step", () => {
    const vars = generateBrandShades(VIOLET) as Record<string, string>;
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    for (const step of steps) {
      expect(vars[`--astralis-color-brand-${step}`]).toMatch(HEX);
    }
    expect(vars["--astralis-color-brand-500"]).toBe(VIOLET);
  });

  it("produces a strictly darkening ramp from 50 to 950", () => {
    const vars = generateBrandShades(VIOLET) as Record<string, string>;
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
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

describe("generateThemeTokens", () => {
  const vars = (seed: Parameters<typeof themeVars>[0], mode: "light" | "dark" = "light") =>
    generateThemeTokens(seed, mode) as Record<string, string>;

  it("returns nothing for an absent or empty seed", () => {
    expect(generateThemeTokens(undefined, "light")).toEqual({});
    expect(generateThemeTokens({}, "light")).toEqual({});
  });

  it("stays a superset of generateBrandTokens for a brand-only seed", () => {
    const brandOnly = generateBrandTokens(VIOLET, "dark") as Record<string, string>;
    const seeded = vars({ brandColor: VIOLET }, "dark");
    for (const [name, value] of Object.entries(brandOnly)) {
      expect(seeded[name], name).toBe(value);
    }
  });

  it("emits an 11-step gray ramp including the 950 that backs surface-panel", () => {
    const v = vars({ grayColor: "#71717a" });
    for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
      expect(v[`--astralis-color-gray-${step}`], `gray-${step}`).toMatch(HEX);
    }
  });

  it("re-declares the semantics that point at an overridden hue", () => {
    // The whole point: overriding gray-100 alone would not move surface-subtle,
    // because :root already resolved it against the default palette.
    const v = vars({ grayColor: "#71717a" });
    expect(v["--astralis-color-surface-subtle"]).toBe(v["--astralis-color-gray-100"]);
    expect(v["--astralis-color-label-base"]).toBe(v["--astralis-color-gray-900"]);
    expect(v["--astralis-color-stroke-base"]).toBe(v["--astralis-color-gray-300"]);
  });

  it("follows the mode when re-declaring semantics", () => {
    const light = vars({ grayColor: "#71717a" }, "light");
    const dark = vars({ grayColor: "#71717a" }, "dark");
    expect(light["--astralis-color-surface-subtle"]).toBe(light["--astralis-color-gray-100"]);
    expect(dark["--astralis-color-surface-subtle"]).toBe(dark["--astralis-color-gray-900"]);
    // surface-panel is the reason the ramp needs a 950 step at all.
    expect(dark["--astralis-color-surface-panel"]).toBe(dark["--astralis-color-gray-950"]);
  });

  it("leaves hues the seed does not touch alone", () => {
    const v = vars({ brandColor: VIOLET });
    expect(v["--astralis-color-surface-warning"]).toBeUndefined();
    expect(v["--astralis-color-blue-solid"]).toBeUndefined();
  });

  it("resolves brand contrast from the seed rather than a baked constant", () => {
    expect(vars({ brandColor: "#1e3a8a" })["--astralis-color-brand-contrast"]).toBe("#ffffff");
    expect(vars({ brandColor: "#eab308" })["--astralis-color-brand-contrast"]).toBe("#000000");
  });

  it("passes typefaces through to the theme hooks", () => {
    const v = vars({ fontHeading: "Inter, sans-serif", fontMono: "Fira Code, monospace" });
    expect(v["--astralis-font-heading"]).toBe("Inter, sans-serif");
    expect(v["--astralis-font-mono"]).toBe("Fira Code, monospace");
    expect(v["--astralis-font-body"]).toBeUndefined();
  });

  it("scales the numeric ramps, and emits nothing for a factor of 1", () => {
    const v = vars({ spacingScale: 1.5, radiusScale: 2 });
    expect(v["--astralis-spacing-4"]).toBe("1.5rem"); // 1rem * 1.5
    expect(v["--astralis-border-radius-lg"]).toBe("1rem"); // 0.5rem * 2
    expect(vars({ spacingScale: 1 })["--astralis-spacing-4"]).toBeUndefined();
  });

  it("escapes fractional scale names for CSS but not for the DOM", () => {
    // The property's real name has no backslash; the escape exists only so a
    // stylesheet parses. Handing the escaped form to setProperty silently
    // no-ops, so the two callers must get different spellings.
    const forCss = themeVars({ spacingScale: 2 }, "light", { forCss: true });
    const forDom = themeVars({ spacingScale: 2 }, "light");
    expect(forCss["--astralis-spacing-0\\.5"]).toBe("0.25rem");
    expect(forDom["--astralis-spacing-0.5"]).toBe("0.25rem");
    expect(forDom["--astralis-spacing-0\\.5"]).toBeUndefined();

    // Prove the claim rather than trusting it. The CSSOM stores custom
    // property names verbatim — it does no CSS unescaping — so the escaped
    // spelling becomes a SEPARATE property that no var() lookup will ever
    // find. Setting only the escaped form leaves the real token untouched.
    const escaped = document.createElement("div");
    escaped.style.setProperty("--astralis-spacing-0\\.5", "9rem");
    expect(escaped.style.getPropertyValue("--astralis-spacing-0.5")).toBe("");

    const plain = document.createElement("div");
    plain.style.setProperty("--astralis-spacing-0.5", "9rem");
    expect(plain.style.getPropertyValue("--astralis-spacing-0.5")).toBe("9rem");
  });
});
