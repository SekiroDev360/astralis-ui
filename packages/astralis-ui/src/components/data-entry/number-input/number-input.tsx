import { forwardRef, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { NumberInputProps } from "./number-input.types";
import { inputVariants } from "../input/input.styles";
import { useFieldContext } from "../field/field.context";
import { astralisMerge } from "../../../utils/astralis-merge";
import { ChevronDownIcon, ChevronUpIcon } from "../../icon/internal-icons";

const stepperClasses =
  "astralis:flex astralis:flex-1 astralis:items-center astralis:justify-center astralis:cursor-pointer " +
  "astralis:text-label-subtle astralis:transition-colors astralis:hover:text-label-base astralis:hover:bg-surface-subtle " +
  "astralis:disabled:opacity-moderate astralis:disabled:pointer-events-none astralis:outline-none " +
  "astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-[-2px] astralis:focus-visible:outline-accent-ring";

/**
 * A numeric field with steppers and full spinbutton keyboard support.
 * Typing is free-form; the value parses, clamps and rounds on commit
 * (blur / Enter / steppers).
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value: valueProp,
      defaultValue = null,
      onChange,
      min,
      max,
      step = 1,
      precision,
      size = "md",
      variant = "outline",
      invalid: invalidProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      hideSteppers = false,
      className = "",
      id: idProp,
      onKeyDown,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const field = useFieldContext();
    const isInvalid = invalidProp ?? field?.invalid;
    const isDisabled = disabledProp ?? field?.disabled;
    const isReadOnly = readOnlyProp ?? field?.readOnly;
    const id = idProp ?? field?.id;

    const isControlled = valueProp !== undefined;
    const [internal, setInternal] = useState<number | null>(defaultValue);
    const committed = isControlled ? (valueProp ?? null) : internal;

    // Rapid stepper clicks land in one React batch — reading `committed` from
    // the closure would apply the same base twice. The ref always holds the
    // latest committed value, so every nudge stacks.
    const committedRef = useRef(committed);
    committedRef.current = committed;

    // Text state lets users type freely ("-", "1.", "") before committing.
    const [text, setText] = useState(committed == null ? "" : String(committed));
    useEffect(() => {
      setText(committed == null ? "" : String(committed));
    }, [committed]);

    const clamp = (n: number): number => {
      let result = n;
      if (min != null) result = Math.max(min, result);
      if (max != null) result = Math.min(max, result);
      if (precision != null) result = Number(result.toFixed(precision));
      return result;
    };

    const commit = (next: number | null) => {
      const finalValue = next == null || Number.isNaN(next) ? null : clamp(next);
      if (!isControlled) setInternal(finalValue);
      committedRef.current = finalValue;
      setText(finalValue == null ? "" : String(finalValue));
      onChange?.(finalValue);
    };

    const nudge = (direction: 1 | -1) => {
      if (isDisabled || isReadOnly) return;
      const current = committedRef.current;
      const base = current ?? (direction === 1 ? (min ?? 0) - step : (max ?? 0) + step);
      commit(base + direction * step);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.key === "ArrowUp") { e.preventDefault(); nudge(1); }
      else if (e.key === "ArrowDown") { e.preventDefault(); nudge(-1); }
      else if (e.key === "Home" && min != null) { e.preventDefault(); commit(min); }
      else if (e.key === "End" && max != null) { e.preventDefault(); commit(max); }
      else if (e.key === "Enter") { commit(text.trim() === "" ? null : Number(text)); }
    };

    return (
      <div className="astralis:relative astralis:w-full">
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={committed ?? undefined}
          aria-invalid={isInvalid || undefined}
          aria-describedby={field?.describedBy}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={field?.required}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            onBlur?.(e);
            commit(text.trim() === "" ? null : Number(text));
          }}
          className={astralisMerge(
            inputVariants({ size, variant, invalid: !!isInvalid }),
            !hideSteppers && "astralis:pr-8",
            className,
          )}
          {...rest}
        />
        {!hideSteppers && (
          <div
            aria-hidden="true"
            className="astralis:absolute astralis:inset-y-1 astralis:right-1 astralis:flex astralis:w-6 astralis:flex-col astralis:overflow-hidden astralis:rounded-md astralis:border-normal astralis:border-stroke-subtle"
          >
            <button type="button" tabIndex={-1} disabled={isDisabled || isReadOnly} onClick={() => nudge(1)} className={stepperClasses}>
              <ChevronUpIcon className="astralis:h-3 astralis:w-3" />
            </button>
            <button type="button" tabIndex={-1} disabled={isDisabled || isReadOnly} onClick={() => nudge(-1)} className={astralisMerge(stepperClasses, "astralis:border-t astralis:border-stroke-subtle")}>
              <ChevronDownIcon className="astralis:h-3 astralis:w-3" />
            </button>
          </div>
        )}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
