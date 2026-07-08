import type { ColorScheme } from "../../const/color-schemes";
import { InfoIcon, CircleCheckIcon, TriangleAlertIcon, CircleAlertIcon } from "../icon/internal-icons";

/** The shared status vocabulary for feedback components (Alert, Toast). */
export type FeedbackStatus = "info" | "success" | "warning" | "error";

/** Default hue per status — components allow a colorScheme override. */
export const STATUS_SCHEME: Record<FeedbackStatus, ColorScheme> = {
  info: "blue",
  success: "green",
  warning: "orange",
  error: "red",
};

export const STATUS_ICON: Record<FeedbackStatus, typeof InfoIcon> = {
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  error: CircleAlertIcon,
};

/** Interruptive statuses announce assertively; informational ones politely. */
export const statusRole = (status: FeedbackStatus): "alert" | "status" =>
  status === "error" || status === "warning" ? "alert" : "status";
