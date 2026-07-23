"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { generateThemeTokens } from "./css-vars";
import { ThemeProviderContext } from "./theme-context";
import type { Theme, ThemeTokens } from "./theme-context";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  className?: string;
  tokens?: ThemeTokens;
}

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

  // Compute the seed's overrides inline — primitives AND the semantic tokens
  // that point at them, theme-aware (semantics are baked at :root, so
  // overriding a primitive alone never recolors components).
  const tokenStyles = generateThemeTokens(tokens, resolvedTheme);

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