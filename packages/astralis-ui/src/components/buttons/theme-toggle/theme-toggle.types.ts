import type { ButtonProps } from "../button/button.types";
export interface ThemeToggleProps extends Omit<ButtonProps, "children" | "onClick"> {
  /**
   * If true, displays the text label next to the icon (e.g., "Light Mode" or "Dark Mode").
   * @default false
   */
  showLabel?: boolean;
}
