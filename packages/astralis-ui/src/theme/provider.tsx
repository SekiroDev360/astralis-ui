"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeTokens = {
  brandColor?: string;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  className?: string;
  tokens?: ThemeTokens;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  tokens?: ThemeTokens;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

/**
 * Pure helper function to resolve "system" theme down to light or dark safely.
 * Safeguarded against Server-Side Rendering execution environments.
 */
function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    if (typeof window === "undefined") return "light"; // Server-side fallback default
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

/**
 * Converts shorthand or full hex color entries into raw RGB components.
 */
function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const shorthandRegex = /^([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = cleanHex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

type BrandStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

/**
 * Computes all 10 brand shade hexes from one input color via JS math.
 * Tints (50–400) blend toward white; 500 is the raw input; shades (600–900) blend toward black.
 */
function computeShades(brandColor: string): Record<BrandStep, string> | null {
  const rgb = hexToRgb(brandColor);
  if (!rgb) return null;

  const { r, g, b } = rgb;

  /** Blend brand color toward a target (white or black) at the given ratio (0 = all target, 1 = all brand) */
  const blend = (ratio: number, tr: number, tg: number, tb: number) => ({
    r: Math.round(r * ratio + tr * (1 - ratio)),
    g: Math.round(g * ratio + tg * (1 - ratio)),
    b: Math.round(b * ratio + tb * (1 - ratio)),
  });

  const toHex = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const clamp = (x: number) => Math.min(255, Math.max(0, x));
    return "#" + [clamp(r), clamp(g), clamp(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
  };

  return {
    50:  toHex(blend(0.08, 255, 255, 255)),
    100: toHex(blend(0.16, 255, 255, 255)),
    200: toHex(blend(0.32, 255, 255, 255)),
    300: toHex(blend(0.50, 255, 255, 255)),
    400: toHex(blend(0.72, 255, 255, 255)),
    500: brandColor,
    600: toHex(blend(0.82, 0, 0, 0)),
    700: toHex(blend(0.65, 0, 0, 0)),
    800: toHex(blend(0.50, 0, 0, 0)),
    900: toHex(blend(0.30, 0, 0, 0)),
  };
}

/** Readable text color on top of a solid fill: perceived-brightness (YIQ) threshold. */
function contrastOn(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#ffffff";
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 >= 150 ? "#000000" : "#ffffff";
}

/**
 * Runtime CSS variables for the 10 brand shades, injected as inline styles on
 * the provider div, overriding the CSS defaults in semantic.css.
 *
 * NOTE: keys must match the primitive layer the semantic tokens read from
 * (--astralis-color-brand-*), which @theme maps to --color-brand-*.
 */
export function generateBrandShades(brandColor: string | undefined): CSSProperties {
  if (!brandColor) return {};
  const shades = computeShades(brandColor);
  if (!shades) return { "--astralis-color-brand-500": brandColor } as CSSProperties;

  const vars: Record<string, string> = {};
  for (const [step, hex] of Object.entries(shades)) {
    vars[`--astralis-color-brand-${step}`] = hex;
  }
  return vars as CSSProperties;
}

/**
 * Shades PLUS the brand/accent ROLE tokens, per theme.
 *
 * Overriding only the primitive shades is not enough: role tokens like
 * --astralis-color-brand-solid are declared at :root, where their var()
 * references are substituted ONCE against the default palette — descendants
 * inherit that already-resolved value, so a subtree shade override never
 * reaches components that paint with roles (i.e. nearly all of them). The
 * roles must be re-declared alongside the shades, with the same per-theme
 * formulas as semantic.css. The accent channel defaults to brand at :root
 * and is baked the same way, so it gets re-declared too.
 */
export function generateBrandTokens(
  brandColor: string | undefined,
  mode: "light" | "dark",
): CSSProperties {
  if (!brandColor) return {};
  const shades = computeShades(brandColor);
  if (!shades) return { "--astralis-color-brand-500": brandColor } as CSSProperties;

  // Mirrors the brand role formulas in semantic.css (light / .astralis-dark).
  const roles =
    mode === "dark"
      ? { label: shades[300], subtle: shades[900], muted: shades[800], emphasized: shades[700], stroke: shades[400] }
      : { label: shades[700], subtle: shades[100], muted: shades[200], emphasized: shades[300], stroke: shades[500] };

  const role = {
    solid: shades[500],
    contrast: contrastOn(shades[500]),
    ...roles,
    ring: shades[500],
  };

  const vars: Record<string, string> = { ...(generateBrandShades(brandColor) as Record<string, string>) };
  for (const [name, hex] of Object.entries(role)) {
    vars[`--astralis-color-brand-${name}`] = hex;
    vars[`--astralis-color-accent-${name}`] = hex;
  }
  return vars as CSSProperties;
}

export function AstralisProvider({
  children,
  defaultTheme = "system",
  storageKey = "astralis-ui-theme",
  className = "",
  tokens,
}: ThemeProviderProps) {
  // 1. Initialize state with static server-safe values to eliminate hydration mismatch errors
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // 2. Client-only hook to read client state (localStorage / system preference) safely post-hydration
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    const activeTheme = stored || defaultTheme;
    
    setThemeState(activeTheme);
    setResolvedTheme(resolveTheme(activeTheme));
  }, [defaultTheme, storageKey]);

  // 3. Listen and respond to active runtime theme state changes
  useEffect(() => {
    const currentResolved = resolveTheme(theme);
    setResolvedTheme(currentResolved);

    if (theme !== "system") {
      localStorage.setItem(storageKey, theme);
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [theme, storageKey]);

  // 4. Listen for native system preference alterations when theme setting is set to "system"
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => setResolvedTheme(resolveTheme("system"));
    
    mediaQuery.addEventListener("change", updateTheme);
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, [theme]);

  // 5. Sync astralis-dark to <html> — same pattern as Chakra UI, MUI, shadcn/ui.
  //    The provider takes ownership of the document root dark class when mounted.
  //    In Storybook, the provider is NOT used in the decorator so there is no conflict
  //    with the withThemeByClassName addon.
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("astralis-dark");
    } else {
      root.classList.remove("astralis-dark");
    }
  }, [resolvedTheme]);

  // Compute our brand overrides inline — shades AND role tokens, theme-aware
  // (role tokens are baked at :root, so shades alone never recolor components).
  const tokenStyles = generateBrandTokens(tokens?.brandColor, resolvedTheme);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: setThemeState, resolvedTheme, tokens }}>
      <div
        className={`astralis ${className}`.trim()}
        style={{
          minHeight: "100vh",
          width: "100%",
          ...tokenStyles,
        }}
        suppressHydrationWarning /* Prevents React from screaming about localstorage modifications */
      >
        {children}
      </div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used inside an AstralisProvider container root.");
  }
  return context;
};