import { forwardRef } from "react";
import type { AlertProps, AlertSectionProps } from "./alert.types";
import { alertVariants, alertIconClasses, alertTitleClasses, alertDescriptionClasses, alertCloseClasses } from "./alert.styles";
import { astralisMerge } from "../../../utils/astralis-merge";
import { accentClass } from "../../../const/color-schemes";
import { XIcon } from "../../icon/internal-icons";
import { STATUS_ICON, STATUS_SCHEME, statusRole } from "../status";

const AlertRoot = forwardRef<HTMLDivElement, AlertProps>(
  ({ status = "info", variant = "subtle", colorScheme, icon, onClose, className = "", children, ...rest }, ref) => {
    const StatusIcon = STATUS_ICON[status];

    return (
      <div
        ref={ref}
        role={statusRole(status)}
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
