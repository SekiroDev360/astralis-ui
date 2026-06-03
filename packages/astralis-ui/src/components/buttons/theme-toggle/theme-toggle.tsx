"use client";

import { forwardRef } from "react";
import { Button } from "../button/button";
import type { ThemeToggleProps } from "./theme-toggle.types";
import { useTheme } from "../../../theme/provider";
import Icon from "../../icon/icon";

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ variant = "outline", size = "md", showLabel = false, className = "", ...props }, ref) => {
    const { resolvedTheme, setTheme } = useTheme();

    const handleToggle = () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    const isDark = resolvedTheme === "dark";
    const iconName = isDark ? "Sun" : "Moon";
    const labelText = isDark ? "Light Mode" : "Dark Mode";

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={handleToggle}
        leftIcon={<Icon name={iconName} size={size === "xs" || size === "sm" ? "xs" : "sm"} />}
        className={className}
        aria-label="Toggle Theme"
        {...props}
      >
        {showLabel ? labelText : undefined}
      </Button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
