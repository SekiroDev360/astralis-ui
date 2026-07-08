import { forwardRef } from "react";
import type { AlertProps, AlertSectionProps, AlertStatus } from "./alert.types";
import { alertVariants, alertIconClasses, alertTitleClasses, alertDescriptionClasses, alertCloseClasses } from "./alert.styles";
import { astralisMerge } from "../../../utils/astralis-merge";
import { accentClass, type ColorScheme } from "../../../const/color-schemes";
import { InfoIcon, CircleCheckIcon, TriangleAlertIcon, CircleAlertIcon, XIcon } from "../../icon/internal-icons";

/** Default hue per status — overridable via `colorScheme`. */
const STATUS_SCHEME: Record<AlertStatus, ColorScheme> = {
  info: "blue",
  success: "green",
  warning: "orange",
  error: "red",
};

const STATUS_ICON: Record<AlertStatus, typeof InfoIcon> = {
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  error: CircleAlertIcon,
};

const AlertRoot = forwardRef<HTMLDivElement, AlertProps>(
  ({ status = "info", variant = "subtle", colorScheme, icon, onClose, className = "", children, ...rest }, ref) => {
    const StatusIcon = STATUS_ICON[status];

    return (
      <div
        ref={ref}
        // Interruptive statuses announce assertively; informational ones politely.
        role={status === "error" || status === "warning" ? "alert" : "status"}
        data-status={status}
        className={astralisMerge(
          alertVariants({ variant }),
          accentClass(colorScheme ?? STATUS_SCHEME[status]),
          className,
        )}
        {...rest}
      >
        {icon !== false && (
          <span aria-hidden="true" className={alertIconClasses}>
            {icon ?? <StatusIcon className="astralis:size-full" />}
          </span>
        )}
        <div className="astralis:flex-1 astralis:min-w-0">{children}</div>
        {onClose && (
          <button type="button" aria-label="Dismiss" onClick={onClose} className={alertCloseClasses}>
            <XIcon className="astralis:h-4 astralis:w-4" />
          </button>
        )}
      </div>
    );
  },
);

AlertRoot.displayName = "Alert";

function AlertTitle({ className = "", children, ...rest }: AlertSectionProps) {
  return (
    <div className={astralisMerge(alertTitleClasses, className)} {...rest}>
      {children}
    </div>
  );
}
AlertTitle.displayName = "Alert.Title";

function AlertDescription({ className = "", children, ...rest }: AlertSectionProps) {
  return (
    <div className={astralisMerge(alertDescriptionClasses, className)} {...rest}>
      {children}
    </div>
  );
}
AlertDescription.displayName = "Alert.Description";

export const Alert = Object.assign(AlertRoot, {
  Title: AlertTitle,
  Description: AlertDescription,
});
