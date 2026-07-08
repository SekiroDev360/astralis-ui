import type { ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";
import type { FeedbackStatus } from "../status";

export type ToastStatus = FeedbackStatus;

export type ToasterPlacement =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  /** Picks the icon, hue and ARIA role. @default "info" */
  status?: ToastStatus;
  /** Hue override (via the accent channel); defaults from `status`. */
  colorScheme?: ColorScheme;
  /**
   * Auto-dismiss delay in ms; pass `null` to keep the toast until dismissed.
   * @default 5000
   */
  duration?: number | null;
  /** Hide the ✕ button. */
  closable?: boolean;
  /** Optional action button rendered after the text. */
  action?: { label: string; onClick: () => void };
}

export interface ToastData extends ToastOptions {
  id: string;
  /** false while the exit transition plays, then the toast is removed. */
  open: boolean;
}

export interface ToasterProps {
  /** Screen corner/edge the stack grows from. @default "bottom-end" */
  placement?: ToasterPlacement;
  /** Newest-first cap on simultaneously shown toasts. @default 5 */
  max?: number;
}
