import { describe, expect, it } from "vitest";
import { themeCss, parseThemeCss, parseThemeSeed, validateSeed, isEmptySeed } from "./serialize";
import { generateThemeTokens } from "./theme-math";
import { SCALE_GROUPS } from "./token-spec";
import type { ThemeSeed } from "./token-spec";

const FULL: ThemeSeed = {
  brandColor: "#8b5cf6",
  grayColor: "#7a7168",
  errorColor: "#b91c1c",
  warningColor: "#eab308",
  successColor: "#15803d",
  infoColor: "#1d4ed8",
  fontHeading: "Inter, sans-serif",
  fontBody: "Georgia, serif",
  fontMono: "Fira Code, monospace",
  radiusScale: 1.5,
  spacingScale: 0.8,
  fontSizeScale: 1.125,
  motionScale: 0.5,
};

describe("themeCss", () => {
  it("emits :root and .astralis-dark blocks", () => {
    const css = themeCss({ brandColor: "#8b5cf6" });
    expect(css).toContain(":root {");
    expect(css).toContain(".astralis-dark {");
  });

  it("returns an empty string when the seed implies no overrides", () => {
    expect(themeCss(undefined)).toBe("");
    expect(themeCss({})).toBe("");
    // Scale factors of exactly 1 are the library default, so they emit nothing.
    expect(themeCss({ radiusScale: 1, spacingScale: 1 })).toBe("");
  });

  it("escapes fractional step names, which a stylesheet requires", () => {
    const css = themeCss({ spacingScale: 2 });
    expect(css).toContain("--astralis-spacing-0\\.5:");
    expect(css).not.toContain("--astralis-spacing-0.5:");
  });

  it("omits the dark block when nothing is mode-dependent", () => {
    // Scales are identical in both modes; only colours differ.
    const css = themeCss({ radiusScale: 2 });
    expect(css).toContain(":root {");
    expect(css).not.toContain(".astralis-dark {");
  });

  it("puts only mode-dependent tokens in the dark block", () => {
    const css = themeCss({ brandColor: "#8b5cf6" });
    const dark = css.slice(css.indexOf(".astralis-dark {"));
    // brand-solid is the input colour in both modes, so it must not repeat.
    expect(dark).not.toContain("--astralis-color-brand-solid:");
    // brand-subtle flips from a tint to a deep shade, so it must.
    expect(dark).toContain("--astralis-color-brand-subtle:");
  });
});

describe("theme-namespace aliases", () => {
  /*
   * The utilities read the prefixed Tailwind namespace, not the source token,
   * and that alias is baked at :root. Emitting only the source name made
   * radius/font-size/motion silent no-ops — these lock in the fix.
   */
  it.each([
    ["radiusScale", SCALE_GROUPS.radius, "lg"],
    ["fontSizeScale", SCALE_GROUPS.fontSize, "xl"],
    ["motionScale", SCALE_GROUPS.duration, "fast"],
  ] as const)("%s writes both the source token and the alias", (field, group, step) => {
    const vars = generateThemeTokens({ [field]: 2 }, "light");
    expect(vars[`--astralis-${group.source}-${step}`]).toBeTruthy();
    expect(vars[`--astralis-${group.alias}-${step}`]).toBeTruthy();
    expect(vars[`--astralis-${group.alias}-${step}`]).toBe(vars[`--astralis-${group.source}-${step}`]);
  });

  it("scales the spacing base var, which fractional utilities compute from", () => {
    // Tailwind compiles p-0.5 to calc(var(--astralis-spacing) * .5).
    const vars = generateThemeTokens({ spacingScale: 2 }, "light");
    expect(vars["--astralis-spacing"]).toBe("0.5rem");
  });

  it("keeps motionScale: 0 meaningful rather than treating it as unset", () => {
    const vars = generateThemeTokens({ motionScale: 0 }, "light");
    expect(vars["--astralis-duration-fast"]).toBe("0ms");
    expect(vars["--astralis-transition-duration-fast"]).toBe("0ms");
  });
});

describe("validateSeed", () => {
  it("passes a well-formed seed", () => {
    expect(validateSeed(FULL)).toEqual([]);
  });

  it("rejects a non-hex colour", () => {
    const issues = validateSeed({ brandColor: "rebeccapurple" });
    expect(issues).toHaveLength(1);
    expect(issues[0].field).toBe("brandColor");
  });

  it("rejects negative scales but allows zero", () => {
    expect(validateSeed({ radiusScale: -1 })).toHaveLength(1);
    expect(validateSeed({ radiusScale: 0 })).toEqual([]);
    expect(validateSeed({ motionScale: 0 })).toEqual([]);
  });
});

describe("round trip", () => {
  it("recovers the exact seed from generated CSS", () => {
    expect(parseThemeCss(themeCss(FULL))).toEqual(FULL);
  });

  it.each([
    ["brand only", { brandColor: "#8b5cf6" }],
    ["gray only", { grayColor: "#7a7168" }],
    ["scales only", { radiusScale: 0, spacingScale: 1.25, motionScale: 0 }],
    ["fonts only", { fontHeading: "Inter, sans-serif" }],
    ["everything", FULL],
  ] as [string, ThemeSeed][])("survives seed → css → seed: %s", (_label, seed) => {
    expect(parseThemeCss(themeCss(seed))).toEqual(seed);
  });

  it("reads JSON as readily as CSS", () => {
    expect(parseThemeSeed(JSON.stringify(FULL))).toEqual(FULL);
    expect(parseThemeSeed(themeCss(FULL))).toEqual(FULL);
  });

  it("ignores unknown keys and wrongly-typed values", () => {
    const parsed = parseThemeSeed(
      JSON.stringify({ brandColor: "#8b5cf6", radiusScale: "big", nonsense: true }),
    );
    expect(parsed).toEqual({ brandColor: "#8b5cf6" });
  });

  it("returns an empty seed for junk rather than throwing", () => {
    expect(parseThemeSeed("{not json")).toEqual({});
    expect(parseThemeSeed("")).toEqual({});
    expect(parseThemeSeed("body { color: red }")).toEqual({});
  });

  it("infers a seed from CSS whose provenance comment was stripped", () => {
    const css = themeCss(FULL).replace(/\/\* astralis-seed:[\s\S]*?\*\//, "");
    const inferred = parseThemeCss(css);
    expect(inferred.brandColor).toBe(FULL.brandColor);
    expect(inferred.radiusScale).toBeCloseTo(FULL.radiusScale!, 3);
    expect(inferred.spacingScale).toBeCloseTo(FULL.spacingScale!, 3);
    expect(inferred.fontHeading).toBe(FULL.fontHeading);
  });
});

describe("status palettes", () => {
  /*
   * Status colours seed their own ROLE palette. Seeding warning with a yellow
   * must not turn --astralis-color-orange-* yellow, or `colorScheme="orange"`
   * becomes a lie.
   */
  it.each([
    ["errorColor", "error", "red"],
    ["warningColor", "warning", "orange"],
    ["successColor", "success", "green"],
    ["infoColor", "info", "blue"],
  ] as const)("%s seeds %s-* and leaves %s-* untouched", (field, palette, hue) => {
    const vars = generateThemeTokens({ [field]: "#8b5cf6" }, "light");
    expect(vars[`--astralis-color-${palette}-500`]).toBe("#8b5cf6");
    for (const step of [50, 100, 500, 900, 950]) {
      expect(vars[`--astralis-color-${hue}-${step}`], `${hue}-${step} must not be emitted`).toBeUndefined();
    }
  });

  it("re-declares the semantics that point at the seeded palette", () => {
    const vars = generateThemeTokens({ warningColor: "#eab308" }, "light");
    for (const name of ["surface-warning", "label-warning", "stroke-warning"]) {
      expect(vars[`--astralis-color-${name}`], name).toBeTruthy();
    }
    // …and not the ones belonging to other palettes.
    expect(vars["--astralis-color-surface-error"]).toBeUndefined();
  });

  it("computes contrast per mode rather than assuming light", () => {
    // warning's solid is step 600 in light but 500 in dark, so a fixed-mode
    // lookup can land on the wrong side of the readability threshold.
    const light = generateThemeTokens({ warningColor: "#eab308" }, "light");
    const dark = generateThemeTokens({ warningColor: "#eab308" }, "dark");
    for (const v of [light["--astralis-color-warning-contrast"], dark["--astralis-color-warning-contrast"]]) {
      expect(v).toMatch(/^#(000000|ffffff)$/);
    }
  });

  it("picks readable contrast for a pale seed, where a hardcoded white would fail", () => {
    const vars = generateThemeTokens({ successColor: "#a7f3d0" }, "light");
    expect(vars["--astralis-color-success-contrast"]).toBe("#000000");
  });

  it("keeps status colours independent of one another", () => {
    const vars = generateThemeTokens({ errorColor: "#b91c1c" }, "light");
    expect(vars["--astralis-color-error-500"]).toBe("#b91c1c");
    expect(vars["--astralis-color-warning-500"]).toBeUndefined();
    expect(vars["--astralis-color-success-500"]).toBeUndefined();
    expect(vars["--astralis-color-info-500"]).toBeUndefined();
  });
});

describe("neutral endpoints", () => {
  it("moves white and black with grayColor so surface-base follows the neutral", () => {
    const vars = generateThemeTokens({ grayColor: "#7a7168" }, "dark");
    expect(vars["--astralis-color-white"]).toMatch(/^#[0-9a-f]{6}$/i);
    expect(vars["--astralis-color-black"]).toMatch(/^#[0-9a-f]{6}$/i);
    // surface-base is `black` in dark mode — it must pick up the tinted value.
    expect(vars["--astralis-color-surface-base"]).toBe(vars["--astralis-color-black"]);
  });

  it("leaves the endpoints alone when no gray is seeded", () => {
    const vars = generateThemeTokens({ brandColor: "#8b5cf6" }, "light");
    expect(vars["--astralis-color-white"]).toBeUndefined();
    expect(vars["--astralis-color-black"]).toBeUndefined();
  });

  it("actually tints white, and only faintly", () => {
    const channels = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

    const warm = channels(generateThemeTokens({ grayColor: "#7a7168" }, "light")["--astralis-color-white"]);
    const cool = channels(generateThemeTokens({ grayColor: "#6b7280" }, "light")["--astralis-color-white"]);

    // Faint: still unmistakably white.
    expect(Math.min(...warm)).toBeGreaterThanOrEqual(248);
    // But present. At L 1.0 chroma clamps away and this silently returns pure
    // #ffffff — the bug this assertion exists to catch.
    expect(Math.max(...warm) - Math.min(...warm)).toBeGreaterThan(0);
    // And directional: a warm seed leans red, a cool one leans blue.
    expect(warm[0]).toBeGreaterThan(warm[2]);
    expect(cool[2]).toBeGreaterThan(cool[0]);
  });
});

describe("isEmptySeed", () => {
  it("is true for nothing and for defaults, false for a real override", () => {
    expect(isEmptySeed(undefined)).toBe(true);
    expect(isEmptySeed({})).toBe(true);
    expect(isEmptySeed({ spacingScale: 1 })).toBe(true);
    expect(isEmptySeed({ brandColor: "#8b5cf6" })).toBe(false);
    expect(isEmptySeed({ motionScale: 0 })).toBe(false);
  });
});
