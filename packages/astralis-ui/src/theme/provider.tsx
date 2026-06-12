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

/**
 * Generates runtime CSS variables for all 10 brand shades dynamically via JS math.
 * Tints (50–400) blend toward white; 500 is the raw input; shades (600–900) blend toward black.
 * These are injected as inline styles on the provider div, overriding the CSS defaults in semantic.css.
 */
export function generateBrandShades(brandColor: string | undefined): CSSProperties {
  if (!brandColor) return {};
  const rgb = hexToRgb(brandColor);
  if (!rgb) return { "--astralis-brand-500": brandColor } as CSSProperties;

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

  // Tints — blend toward white (255, 255, 255)
  const s50  = blend(0.08, 255, 255, 255);
  const s100 = blend(0.16, 255, 255, 255);
  const s200 = blend(0.32, 255, 255, 255);
  const s300 = blend(0.50, 255, 255, 255);
  const s400 = blend(0.72, 255, 255, 255);

  // Shades — blend toward black (0, 0, 0)
  const s600 = blend(0.82, 0, 0, 0);
  const s700 = blend(0.65, 0, 0, 0);
  const s800 = blend(0.50, 0, 0, 0);
  const s900 = blend(0.30, 0, 0, 0);

  return {
    "--astralis-brand-50":  toHex(s50),
    "--astralis-brand-100": toHex(s100),
    "--astralis-brand-200": toHex(s200),
    "--astralis-brand-300": toHex(s300),
    "--astralis-brand-400": toHex(s400),
    "--astralis-brand-500": brandColor,
    "--astralis-brand-600": toHex(s600),
    "--astralis-brand-700": toHex(s700),
    "--astralis-brand-800": toHex(s800),
    "--astralis-brand-900": toHex(s900),
  } as CSSProperties;
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

  // Compute our brand overrides inline
  const tokenStyles = generateBrandShades(tokens?.brandColor);

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