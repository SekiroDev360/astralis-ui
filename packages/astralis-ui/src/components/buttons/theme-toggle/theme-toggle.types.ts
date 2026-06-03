import type { BaseButtonProps } from "../base.types";

export interface ThemeToggleProps extends Omit<BaseButtonProps, "children" | "onClick"> {
  /**
   * If true, displays the text label next to the icon (e.g., "Light Mode" or "Dark Mode").
   * @default false
   */
  showLabel?: boolean;
}
