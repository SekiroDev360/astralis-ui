import { Children, isValidElement, useMemo, type ReactNode } from "react";
import { astralisMerge } from "../../../../utils/astralis-merge";
import {
  StepItemContext,
  useStepsContext,
  type StepStatus,
  type StepItemContextValue,
} from "../steps.context";
import { stepSizeClasses, stepConnectorVariants, stepTriggerVariants } from "../steps.styles";
import type { StepsItemProps } from "../steps.types";

/** Pull the single <Steps.Indicator> out of the children; everything else is label content. */
function splitChildren(children: ReactNode) {
  let indicator: ReactNode = null;
  const rest: ReactNode[] = [];
  Children.toArray(children).forEach((child) => {
    const name = isValidElement(child) ? (child.type as any)?.displayName : undefined;
    if (name === "Steps.Indicator" && indicator === null) indicator = child;
    else rest.push(child);
  });
  return { indicator, rest };
}

/**
 * Steps.Item — derives this step's status from the active step, exposes it via
 * the item context, and lays out the indicator + label + connector for all three
 * modes (horizontal inline, labelPlacement="bottom", vertical).
 */
export function StepsItem({
  children,
  index = 0,
  disabled: disabledProp = false,
  error = false,
  className,
  ...rest
}: StepsItemProps) {
  const { step, count, orientation, labelPlacement, size, linear, clickable, setStep } = useStepsContext();
  const bottom = labelPlacement === "bottom";

  const status: StepStatus = error
    ? "error"
    : index < step
      ? "completed"
      : index === step
        ? "active"
        : "upcoming";

  const disabled = disabledProp || (linear && index > step);
  const isLast = index === count - 1;

  const itemCtx = useMemo<StepItemContextValue>(
    () => ({ index, status, disabled, isLast }),
    [index, status, disabled, isLast],
  );

  const { indicator, rest: labelParts } = splitChildren(children);
  const sz = stepSizeClasses[size];

  // Make the indicator a button when the parent opted into click navigation.
  const renderIndicator = (node: ReactNode) =>
    clickable ? (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setStep(index)}
        aria-current={status === "active" ? "step" : undefined}
        aria-label={`Go to step ${index + 1}`}
        className={stepTriggerVariants()}
      >
        {node}
      </button>
    ) : (
      node
    );

  const label =
    labelParts.length > 0 ? (
      <div
        className={astralisMerge(
          "astralis:flex astralis:flex-col astralis:gap-0.5",
          bottom && "astralis:items-center astralis:text-center",
        )}
      >
        {labelParts}
      </div>
    ) : null;

  let inner: ReactNode;

  /* ---- Vertical: indicator + connector in a left gutter, label on the right ---- */
  if (orientation === "vertical") {
    inner = (
      <div className="astralis:flex astralis:gap-3 astralis:w-full">
        <div className="astralis:flex astralis:flex-col astralis:items-center">
          {renderIndicator(indicator)}
          {!isLast && (
            <span
              aria-hidden="true"
              className={stepConnectorVariants({ orientation: "vertical", done: status === "completed" })}
            />
          )}
        </div>
        <div className={astralisMerge("astralis:flex-1", !isLast && "astralis:pb-6")}>{label}</div>
      </div>
    );
  } else if (bottom) {
    /* ---- Horizontal, labelPlacement="bottom": half-lines flank a centered indicator, label below ---- */
    inner = (
      <>
        <div className="astralis:flex astralis:items-center astralis:w-full">
          {/* Gap only on the side touching the indicator; outer ends stay flush
              so adjacent items' half-lines join into one continuous line. */}
          <span
            aria-hidden="true"
            className={astralisMerge(
              stepConnectorVariants({ orientation: "horizontal", done: index <= step }),
              "astralis:mr-2",
              index === 0 && "astralis:invisible",
            )}
          />
          {renderIndicator(indicator)}
          <span
            aria-hidden="true"
            className={astralisMerge(
              stepConnectorVariants({ orientation: "horizontal", done: index < step }),
              "astralis:ml-2",
              isLast && "astralis:invisible",
            )}
          />
        </div>
        <div className="astralis:mt-2">{label}</div>
      </>
    );
  } else {
    /* ---- Horizontal inline: indicator + label, then a connector to the next step ---- */
    inner = (
      <>
        <div className={astralisMerge("astralis:flex astralis:items-center", sz.rowGap)}>
          {renderIndicator(indicator)}
          {label}
        </div>
        {!isLast && (
          <span
            aria-hidden="true"
            className={astralisMerge(
              stepConnectorVariants({ orientation: "horizontal", done: index < step }),
              "astralis:mx-3",
            )}
          />
        )}
      </>
    );
  }

  const itemClass = astralisMerge(
    "astralis:flex",
    orientation === "vertical"
      ? "astralis:w-full"
      : bottom
        ? "astralis:flex-col astralis:items-center astralis:flex-1"
        : isLast
          ? "astralis:items-center"
          : "astralis:items-center astralis:flex-1",
    className,
  );

  return (
    <StepItemContext.Provider value={itemCtx}>
      <li role="listitem" data-status={status} data-index={index} className={itemClass} {...rest}>
        {inner}
      </li>
    </StepItemContext.Provider>
  );
}

StepsItem.displayName = "Steps.Item";
