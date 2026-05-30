import { forwardRef, useEffect, useRef, useState } from "react";
import { useCheckboxGroupContext } from "../checkbox.context";
import { useFieldContext } from "../../field/field.context";
import type { CheckboxProps, CheckboxSize } from "../checkbox.types";

const sizeClasses: Record<CheckboxSize, { box: string; label: string }> = {
  sm: { box: "astralis-h-3.5 astralis-w-3.5", label: "astralis-text-xs" },
  md: { box: "astralis-h-4 astralis-w-4", label: "astralis-text-sm" },
  lg: { box: "astralis-h-5 astralis-w-5", label: "astralis-text-base" },
};

export const CheckboxBase = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      size = "md",
      indeterminate = false,
      invalid: invalidProp,
      disabled: disabledProp,
      checked: checkedProp,
      defaultChecked = false,
      onChange: onChangeProp,
      readOnly: readOnlyProp,
      value,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const group = useCheckboxGroupContext();
    const field = useFieldContext();

    const [localChecked, setLocalChecked] = useState(defaultChecked);
    const isGroupMember = group != null && value != null;
    const isControlled = checkedProp !== undefined;

    const isChecked: boolean = isGroupMember
      ? group.groupValue.includes(String(value))
      : isControlled
        ? checkedProp!
        : localChecked;

    const isDisabled = disabledProp ?? group?.disabled ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const isReadOnly = readOnlyProp ?? field?.readOnly;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly) {
        e.preventDefault();
        return;
      }
      if (isGroupMember) {
        group.toggleValue(String(value));
      } else if (!isControlled) {
        setLocalChecked(e.target.checked);
      }
      onChangeProp?.(e);
    };

    useEffect(() => {
      if (isControlled) setLocalChecked(checkedProp!);
    }, [isControlled, checkedProp]);

    const innerRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ?? innerRef) as React.RefObject<HTMLInputElement>;
    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const sz = sizeClasses[size];

    return (
      <label
        className={[
          "astralis-inline-flex astralis-items-center astralis-gap-2",
          isDisabled
            ? "astralis-cursor-not-allowed astralis-opacity-50"
            : isReadOnly
              ? "astralis-cursor-default"
              : "astralis-cursor-pointer",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          ref={resolvedRef}
          type="checkbox"
          id={id}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-invalid={isInvalid || undefined}
          aria-readonly={isReadOnly || undefined}
          onChange={handleChange}
          className="astralis-sr-only astralis-peer"
          {...props}
        />

        <span
          aria-hidden="true"
          className={[
            sz.box,
            "astralis-shrink-0 astralis-rounded astralis-border astralis-transition-all astralis-duration-150",
            "astralis-flex astralis-items-center astralis-justify-center",
            "astralis-peer-focus-visible:astralis-ring-2 astralis-peer-focus-visible:astralis-ring-primary-200 astralis-peer-focus-visible:astralis-ring-offset-2 dark:astralis-peer-focus-visible:astralis-ring-offset-zinc-950",
            isChecked || indeterminate
              ? isInvalid
                ? "astralis-bg-error-600 astralis-border-error-600"
                : "astralis-bg-primary-600 astralis-border-primary-600"
              : isInvalid
                ? "astralis-bg-surface-base astralis-border-error-500"
                : "astralis-bg-surface-base astralis-border-border-strong",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {indeterminate ? (
            <svg
              aria-hidden="true"
              className="astralis-text-white"
              style={{ width: "65%", height: "65%" }}
              viewBox="0 0 12 12"
              fill="none"
            >
              <line
                x1="2"
                y1="6"
                x2="10"
                y2="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : isChecked ? (
            <svg
              aria-hidden="true"
              className="astralis-text-white"
              style={{ width: "65%", height: "65%" }}
              viewBox="0 0 12 12"
              fill="none"
            >
              <polyline
                points="1.5,6 4.5,9.5 10.5,2.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>

        {children && (
          <span
            className={`${sz.label} astralis-text-content-primary astralis-select-none`}
          >
            {children}
          </span>
        )}
      </label>
    );
  },
);

CheckboxBase.displayName = "Checkbox";
