"use client";

import type { Ref } from "react";
import { Button } from "../button/button";
import type { ThemeToggleProps } from "./theme-toggle.types";
import { useTheme } from "../../../theme/theme-context";
import Icon from "../../icon/icon";
import { SunIcon, MoonIcon } from "../../icon/internal-icons";

/**
 * ThemeToggle — a ready-made light/dark switch built on Button, so it inherits
 * every variant, size, and `colorScheme`. The sun and moon are stacked and
 * cross-fade with a quarter-turn rotation as the resolved theme changes.
 */
export function ThemeToggle({
  variant = "outline",
  size = "md",
  showLabel = false,
  className = "",
  ref,
  ...props
}: ThemeToggleProps & { ref?: Ref<HTMLButtonElement> }) {
    const { resolvedTheme, setTheme } = useTheme();

    const isDark = resolvedTheme === "dark";
    const iconSize = size === "xs" || size === "sm" ? "xs" : "sm";
    const boxSize = iconSize === "xs" ? "astralis:size-4" : "astralis:size-5";
    const labelText = isDark ? "Light Mode" : "Dark Mode";

    const handleToggle = () => {
      setTheme(isDark ? "light" : "dark");
    };

    // Both icons share the frame; opacity + rotation swap on theme change.
    const swap = "astralis:absolute astralis:inset-0 astralis:transition-all astralis:duration-moderate";
    const toggleIcon = (
      <span className={`astralis:relative astralis:inline-flex ${boxSize}`}>
        <Icon
          size={iconSize}
          className={`${swap} ${isDark ? "astralis:rotate-90 astralis:opacity-0" : "astralis:rotate-0 astralis:opacity-100"}`}
        >
          <MoonIcon />
        </Icon>
        <Icon
          size={iconSize}
          className={`${swap} ${isDark ? "astralis:rotate-0 astralis:opacity-100" : "astralis:-rotate-90 astralis:opacity-0"}`}
        >
          <SunIcon />
        </Icon>
      </span>
    );

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={handleToggle}
        leftIcon={toggleIcon}
        className={className}
        aria-label={showLabel ? undefined : "Toggle theme"}
        {...props}
      >
        {showLabel ? labelText : undefined}
      </Button>
    );
}

ThemeToggle.displayName = "ThemeToggle";
