import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

import type { FeedbackStatus } from "../status";

export type AlertStatus = FeedbackStatus;
export type AlertVariant = "subtle" | "solid" | "outline" | "left-accent";

export interface AlertProps extends ComponentPropsWithoutRef<"div"> {
  /** Meaning of the alert — picks the icon, hue and ARIA role. @default "info" */
  status?: AlertStatus;
  /** Fill treatment. @default "subtle" */
  variant?: AlertVariant;
  /**
   * Hue override (via the accent channel). Defaults to the hue mapped from
   * `status` — info→blue, success→green, warning→orange, error→red.
   */
  colorScheme?: ColorScheme;
  /** Replace the status icon, or pass `false` to hide it. */
  icon?: ReactNode | false;
  /** Renders a dismiss button that calls this handler. */
  onClose?: () => void;
  children: ReactNode;
}

export interface AlertSectionProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}
