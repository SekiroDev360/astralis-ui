import { useSteps, useStepsItem } from "../steps.context";
import type { StepsIndicatorProps } from "../steps.types";
import Icon from "../../../icon/icon";

export function StepsIndicator({ children }: StepsIndicatorProps) {
  const { index, state } = useStepsItem();
  const { size, clickable } = useSteps();

  const isSmall = size === "small";
  const sizeClasses = isSmall
    ? "astralis-h-6 astralis-w-6 astralis-text-xs"
    : "astralis-h-8 astralis-w-8 astralis-text-sm";

  const iconSize = isSmall ? "xs" : "sm";

  // Base classes
  const baseClasses =
    "astralis-flex astralis-items-center astralis-justify-center astralis-rounded-full astralis-font-medium astralis-transition-all astralis-duration-200";

  // State-specific classes
  let stateClasses = "";
  let content = children ?? index + 1;

  switch (state) {
    case "finish":
      stateClasses = "astralis-bg-primary-500/20 astralis-text-primary-500";
      if (clickable) {
        stateClasses += " group-hover:astralis-bg-primary-500/30";
      }
      if (!children) content = <Icon name="Check" size={iconSize} />;
      break;
    case "error":
      stateClasses = "astralis-bg-error-500 astralis-text-white";
      if (!children) content = <Icon name="X" size={iconSize} />;
      break;
    case "process":
      stateClasses = "astralis-bg-primary-500 astralis-text-white";
      if (clickable) {
        stateClasses += " group-hover:astralis-bg-primary-500/90";
      }
      break;
    case "wait":
    default:
      stateClasses =
        "astralis-bg-surface-raised astralis-border astralis-border-border-subtle astralis-text-content-primary";
      if (clickable) {
        stateClasses +=
          " group-hover:astralis-border-primary-500 group-hover:astralis-text-primary-500";
      }
      break;
  }

  return (
    <div
      data-state={state}
      aria-current={state === "process" ? "step" : undefined}
      className={`${baseClasses} ${sizeClasses} ${stateClasses}`}
    >
      {content}
    </div>
  );
}
