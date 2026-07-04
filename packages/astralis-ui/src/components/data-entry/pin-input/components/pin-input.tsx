import { useEffect, useRef, useState } from "react";
import { useFieldContext } from "../../field/field.context";
import { pinCell } from "../pin-input.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import type { PinInputProps, PinInputType } from "../pin-input.types";

// ── Helpers ────────────────────────────────────────────────────────────────────

function splitToChars(value: string, length: number): string[] {
  return Array.from({ length }, (_, i) => value[i] ?? "");
}

function validate(char: string, type: PinInputType): boolean {
  if (!char) return true; // empty always allowed (backspace)
  if (type === "numeric") return /^\d$/.test(char);
  if (type === "alpha") return /^[a-zA-Z]$/.test(char);
  return true; // alphanumeric — accept any printable char
}

// ── Component ──────────────────────────────────────────────────────────────────

export function PinInputBase({
  length = 4,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  type = "numeric",
  mask = false,
  size = "md",
  variant = "outline",
  disabled: disabledProp,
  invalid: invalidProp,
  readOnly: readOnlyProp,
  placeholder = "○",
  autoFocus = false,
  className = "",
  id: idProp,
}: PinInputProps) {
  const field = useFieldContext();
  const isDisabled = disabledProp ?? field?.disabled;
  const isInvalid = invalidProp ?? field?.invalid;
  const isReadOnly = readOnlyProp ?? field?.readOnly;
  const id = idProp ?? field?.id;

  // ── Controlled / uncontrolled value ──────────────────────────────────────────
  const isControlled = value !== undefined;
  const [internalChars, setInternalChars] = useState<string[]>(() =>
    splitToChars(defaultValue, length),
  );

  const chars: string[] = isControlled
    ? splitToChars(value ?? "", length)
    : internalChars;

  // ── Refs ─────────────────────────────────────────────────────────────────────
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Auto-focus first box on mount
  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [autoFocus]);

  // ── Core update ──────────────────────────────────────────────────────────────
  const updateChars = (newChars: string[]) => {
    if (!isControlled) setInternalChars(newChars);
    const combined = newChars.join("");
    onChange?.(combined);
    if (newChars.every((c) => c !== "")) {
      onComplete?.(combined);
    }
  };

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    const incoming = e.target.value;
    // Take the most-recently-typed character (last char handles type-over)
    const char = incoming.slice(-1);

    if (!validate(char, type)) return;

    const newChars = [...chars];
    newChars[i] = char;
    updateChars(newChars);

    // Advance focus when a character is entered
    if (char && i < length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (isReadOnly) {
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
      }
      return;
    }
    switch (e.key) {
      case "Backspace":
        if (chars[i]) {
          // Clear the current box
          const newChars = [...chars];
          newChars[i] = "";
          updateChars(newChars);
        } else if (i > 0) {
          // Move to previous box and clear it
          const newChars = [...chars];
          newChars[i - 1] = "";
          updateChars(newChars);
          inputRefs.current[i - 1]?.focus();
        }
        e.preventDefault();
        break;

      case "Delete":
        if (chars[i]) {
          const newChars = [...chars];
          newChars[i] = "";
          updateChars(newChars);
          e.preventDefault();
        }
        break;

      case "ArrowLeft":
        if (i > 0) {
          inputRefs.current[i - 1]?.focus();
          e.preventDefault();
        }
        break;

      case "ArrowRight":
        if (i < length - 1) {
          inputRefs.current[i + 1]?.focus();
          e.preventDefault();
        }
        break;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isReadOnly) return;
    const raw = e.clipboardData.getData("text");
    // Filter pasted text to match the allowed type
    const filtered =
      type === "numeric"
        ? raw.replace(/\D/g, "")
        : type === "alpha"
          ? raw.replace(/[^a-zA-Z]/g, "")
          : raw;

    const newChars = splitToChars(filtered, length);
    updateChars(newChars);

    // Focus the last filled box (or last box if all filled)
    const focusIdx = Math.min(filtered.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text in the box so typing replaces the existing char
    e.target.select();
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  const inputType = mask ? "password" : type === "numeric" ? "tel" : "text";

  return (
    <div
      role="group"
      aria-label="PIN input"
      className={astralisMerge("astralis:flex astralis:items-center astralis:gap-2", className)}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          id={i === 0 ? id : undefined}
          type={inputType}
          inputMode={type === "numeric" ? "numeric" : "text"}
          // One-time-code autofill on first box only
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={2} // allow 2 so onChange can detect type-over; we slice to last char
          value={chars[i]}
          placeholder={placeholder}
          disabled={!!isDisabled}
          readOnly={isReadOnly}
          aria-invalid={isInvalid || undefined}
          aria-readonly={isReadOnly || undefined}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={handleFocus}
          className={astralisMerge(
            pinCell({ size, variant, invalid: !!isInvalid }),
            isReadOnly && "astralis:bg-surface-muted astralis:cursor-default",
          )}
        />
      ))}
    </div>
  );
}

PinInputBase.displayName = "PinInput";
