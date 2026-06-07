"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeTokens = Partial<{
  primaryColor: string;
}>;

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  className?: string;
  tokens?: ThemeTokens;
  resetCSS?: boolean;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  tokens?: ThemeTokens;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
  tokens: undefined,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getPrimaryShades(primaryColor: string | undefined): CSSProperties {
  if (!primaryColor) return {};
  const rgb = hexToRgb(primaryColor);
  if (!rgb) {
    return {
      "--astralis-primary-500": primaryColor,
    } as CSSProperties;
  }

  const blend = (
    r: number,
    g: number,
    b: number,
    br: number,
    bg: number,
    bb: number,
    ratio: number
  ) => ({
    r: Math.round(r * ratio + br * (1 - ratio)),
    g: Math.round(g * ratio + bg * (1 - ratio)),
    b: Math.round(b * ratio + bb * (1 - ratio)),
  });

  const toHex = (r: number, g: number, b: number) => {
    const cl = (x: number) => Math.min(255, Math.max(0, x));
    return (
      "#" +
      [cl(r), cl(g), cl(b)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
    );
  };

  const s50 = blend(rgb.r, rgb.g, rgb.b, 255, 255, 255, 0.05);
  const s100 = blend(rgb.r, rgb.g, rgb.b, 255, 255, 255, 0.1);
  const s200 = blend(rgb.r, rgb.g, rgb.b, 255, 255, 255, 0.3);
  const s300 = blend(rgb.r, rgb.g, rgb.b, 255, 255, 255, 0.5);
  const s400 = blend(rgb.r, rgb.g, rgb.b, 255, 255, 255, 0.7);
  const s600 = blend(rgb.r, rgb.g, rgb.b, 0, 0, 0, 0.85);
  const s700 = blend(rgb.r, rgb.g, rgb.b, 0, 0, 0, 0.7);
  const s800 = blend(rgb.r, rgb.g, rgb.b, 0, 0, 0, 0.55);
  const s900 = blend(rgb.r, rgb.g, rgb.b, 0, 0, 0, 0.4);

  return {
    "--astralis-primary-50": toHex(s50.r, s50.g, s50.b),
    "--astralis-primary-100": toHex(s100.r, s100.g, s100.b),
    "--astralis-primary-200": toHex(s200.r, s200.g, s200.b),
    "--astralis-primary-300": toHex(s300.r, s300.g, s300.b),
    "--astralis-primary-400": toHex(s400.r, s400.g, s400.b),
    "--astralis-primary-500": primaryColor,
    "--astralis-primary-600": toHex(s600.r, s600.g, s600.b),
    "--astralis-primary-700": toHex(s700.r, s700.g, s700.b),
    "--astralis-primary-800": toHex(s800.r, s800.g, s800.b),
    "--astralis-primary-900": toHex(s900.r, s900.g, s900.b),
  } as CSSProperties;
}

export function AstralisProvider({
  children,
  defaultTheme = "system",
  storageKey = "astralis-ui-theme",
  className = "",
  tokens,
  resetCSS = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Hydration Mount Effect - only loads from localStorage / media query post-hydration
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    const active = defaultTheme !== "system" ? defaultTheme : (stored || defaultTheme);
    
    setThemeState(active);
    setResolvedTheme(resolveTheme(active));
    setMounted(true);
  }, [defaultTheme, storageKey]);

  // Keep resolvedTheme in sync when theme changes (user action)
  useEffect(() => {
    if (!mounted) return;

    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);

    // Only persist to localStorage when theme is user-driven (not forced by prop)
    if (defaultTheme === "system") {
      if (theme !== "system") {
        localStorage.setItem(storageKey, theme);
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }, [theme, storageKey, defaultTheme, mounted]);

  // Listen for system preference changes when theme is "system"
  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setResolvedTheme(resolveTheme("system"));

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme, mounted]);

  const tokenStyles = tokens?.primaryColor
    ? getPrimaryShades(tokens.primaryColor)
    : undefined;

  const value = {
    theme,
    setTheme: (newTheme: Theme) => setThemeState(newTheme),
    resolvedTheme,
    tokens,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {resetCSS && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                margin: 0;
                padding: 0;
                background-color: var(--astralis-surface-base);
                color: var(--astralis-content-primary);
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              }
            `,
          }}
        />
      )}
      <div
        className={`astralis ${resolvedTheme === "dark" ? "astralis-dark" : ""} astralis-min-h-scree astralis-w-full ${className}`.trim()}
        style={{
          backgroundColor: "var(--astralis-surface-base)",
          color: "var(--astralis-content-primary)",
          ...tokenStyles,
        }}
        suppressHydrationWarning
      >
        {children}
      </div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a AstralisProvider");
  }
  return context;
};