import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { useFieldContext } from "../../field/field.context";
import type {
  MultiSelectOptionGroup,
  MultiSelectOptionItem,
  MultiSelectOptionOrGroup,
  MultiSelectProps,
  MultiSelectSize,
  MultiSelectVariant,
} from "../multi-select.types";

// ── Helpers ────────────────────────────────────────────────────────────────────

function isGroup(opt: MultiSelectOptionOrGroup): opt is MultiSelectOptionGroup {
  return "group" in opt;
}

function flattenOptions(
  options: MultiSelectOptionOrGroup[],
): MultiSelectOptionItem[] {
  return options.flatMap((o) => (isGroup(o) ? o.options : [o]));
}

function getSearchText(opt: MultiSelectOptionItem): string {
  return opt.searchLabel ?? String(opt.label);
}

// ── Size maps ──────────────────────────────────────────────────────────────────

const containerHeight: Record<MultiSelectSize, string> = {
  sm: "astralis-min-h-8",
  md: "astralis-min-h-10",
  lg: "astralis-min-h-12",
};

const containerPad: Record<MultiSelectSize, string> = {
  sm: "astralis-px-2 astralis-py-1",
  md: "astralis-px-3 astralis-py-1.5",
  lg: "astralis-px-3 astralis-py-2",
};

const tagSize: Record<MultiSelectSize, string> = {
  sm: "astralis-text-xs astralis-h-5 astralis-px-1.5",
  md: "astralis-text-xs astralis-h-6 astralis-px-2",
  lg: "astralis-text-sm astralis-h-7 astralis-px-2.5",
};

const inputText: Record<MultiSelectSize, string> = {
  sm: "astralis-text-xs",
  md: "astralis-text-sm",
  lg: "astralis-text-base",
};

const variantBase: Record<MultiSelectVariant, string> = {
  outline:
    "astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-rounded-lg " +
    "hover:astralis-border-border-strong",
  filled:
    "astralis-border astralis-border-transparent astralis-bg-surface-raised astralis-rounded-lg " +
    "hover:astralis-bg-surface-overlay",
};

const variantFocus: Record<MultiSelectVariant, string> = {
  outline:
    "astralis-border-primary-500 astralis-ring-2 astralis-ring-primary-200",
  filled:
    "astralis-bg-surface-base astralis-border-primary-500 astralis-ring-2 astralis-ring-primary-200",
};

const variantInvalid: Record<MultiSelectVariant, string> = {
  outline: "astralis-border-error-500 hover:astralis-border-error-500",
  filled: "astralis-border-error-500 hover:astralis-border-error-500",
};

// ── Icons ──────────────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`astralis-h-4 astralis-w-4 astralis-shrink-0 astralis-transition-transform astralis-duration-200 ${
        open ? "astralis-rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CloseIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      style={{ width: size, height: size }}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="1" y1="1" x2="11" y2="11" />
      <line x1="11" y1="1" x2="1" y2="11" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      aria-hidden="true"
      className="astralis-h-4 astralis-w-4 astralis-animate-spin astralis-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="astralis-opacity-25"
      />
      <path
        d="M4 12a8 8 0 018-8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="astralis-opacity-75"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="astralis-h-3.5 astralis-w-3.5 astralis-shrink-0 astralis-text-primary-600"
      viewBox="0 0 12 12"
      fill="none"
    >
      <polyline
        points="1.5,6 4.5,9.5 10.5,2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Tag component ──────────────────────────────────────────────────────────────

function Tag({
  label,
  onRemove,
  disabled,
  size,
}: {
  label: React.ReactNode;
  onRemove: () => void;
  disabled?: boolean;
  size: MultiSelectSize;
}) {
  return (
    <span
      className={[
        tagSize[size],
        "astralis-inline-flex astralis-items-center astralis-gap-1 astralis-rounded astralis-font-medium",
        "astralis-bg-primary-100 astralis-text-primary-700",
        "astralis-transition-colors",
      ].join(" ")}
    >
      <span className="astralis-truncate astralis-max-w-32">{label}</span>
      {!disabled && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Remove"
          onMouseDown={(e) => {
            e.preventDefault(); // don't blur the container
            onRemove();
          }}
          className="astralis-flex astralis-items-center astralis-shrink-0 hover:astralis-text-primary-900 astralis-transition-colors"
        >
          <CloseIcon size={9} />
        </button>
      )}
    </span>
  );
}

// ── OptionItem ─────────────────────────────────────────────────────────────────

function OptionItem({
  option,
  isActive,
  isSelected,
  onToggle,
}: {
  option: MultiSelectOptionItem;
  isActive: boolean;
  isSelected: boolean;
  onToggle: (value: string | number) => void;
}) {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={option.disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!option.disabled) onToggle(option.value);
      }}
      className={[
        "astralis-flex astralis-items-center astralis-justify-between astralis-gap-2",
        "astralis-px-3 astralis-py-2 astralis-rounded-lg astralis-text-sm astralis-cursor-pointer astralis-transition-colors",
        option.disabled
          ? "astralis-cursor-not-allowed astralis-opacity-40 astralis-text-content-secondary"
          : isActive
            ? "astralis-bg-primary-50 astralis-text-primary-700"
            : "astralis-text-content-primary hover:astralis-bg-surface-raised",
        isSelected ? "astralis-font-medium" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="astralis-truncate">{option.label}</span>
      {isSelected && <CheckIcon />}
    </div>
  );
}

// ── MultiSelect ────────────────────────────────────────────────────────────────

export const MultiSelectBase = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options = [],
      value,
      defaultValue = [],
      onChange,
      placeholder = "Select options…",
      size = "md",
      variant = "outline",
      disabled: disabledProp,
      invalid: invalidProp,
      readOnly: readOnlyProp,
      clearable = false,
      max,
      emptyText = "No options",
      loading = false,
      className = "",
      id: idProp,
    },
    ref,
  ) => {
    const field = useFieldContext();
    const isDisabled = disabledProp ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const isReadOnly = readOnlyProp ?? field?.readOnly;
    const id = idProp ?? field?.id;

    // ── State ──────────────────────────────────────────────────────────────
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [activeIdx, setActiveIdx] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);

    const isControlled = value !== undefined;
    const [internalValues, setInternalValues] =
      useState<Array<string | number>>(defaultValue);
    const selectedValues = isControlled ? (value ?? []) : internalValues;

    // ── Derived data ───────────────────────────────────────────────────────
    const flatAll = useMemo(() => flattenOptions(options), [options]);

    const selectedOptions = useMemo(
      () => flatAll.filter((o) => selectedValues.includes(o.value)),
      [flatAll, selectedValues],
    );

    const filteredOptions = useMemo<MultiSelectOptionOrGroup[]>(() => {
      const q = search.toLowerCase().trim();
      if (!q) return options;
      return options
        .map((o): MultiSelectOptionOrGroup | null => {
          if (isGroup(o)) {
            const filtered = o.options.filter((opt) =>
              getSearchText(opt).toLowerCase().includes(q),
            );
            return filtered.length ? { ...o, options: filtered } : null;
          }
          return getSearchText(o).toLowerCase().includes(q) ? o : null;
        })
        .filter((o): o is MultiSelectOptionOrGroup => o !== null);
    }, [options, search]);

    const flatFiltered = useMemo(
      () => flattenOptions(filteredOptions),
      [filteredOptions],
    );

    const navigable = useMemo(
      () => flatFiltered.filter((o) => !o.disabled),
      [flatFiltered],
    );

    const isMaxReached = max != null && selectedValues.length >= max;

    // ── Refs ───────────────────────────────────────────────────────────────
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => containerRef.current!, []);

    // ── Portal positioning ─────────────────────────────────────────────────
    const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

    const updatePos = useCallback(() => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }, []);

    useLayoutEffect(() => {
      if (!isOpen) return;
      updatePos();
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
      return () => {
        window.removeEventListener("scroll", updatePos, true);
        window.removeEventListener("resize", updatePos);
      };
    }, [isOpen, updatePos]);

    // Auto-focus search and reset state when dropdown opens/closes
    useEffect(() => {
      if (isOpen) {
        setActiveIdx(-1);
        requestAnimationFrame(() => searchRef.current?.focus());
      } else {
        setSearch("");
        setActiveIdx(-1);
      }
    }, [isOpen]);

    // ── Close on outside click ─────────────────────────────────────────────
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          !containerRef.current?.contains(target) &&
          !dropdownRef.current?.contains(target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    // ── Handlers ──────────────────────────────────────────────────────────
    const toggleValue = (val: string | number) => {
      if (isReadOnly) return;
      const next = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : isMaxReached
          ? selectedValues // ignore if max reached
          : [...selectedValues, val];

      if (!isControlled) setInternalValues(next);
      onChange?.(next);
    };

    const removeValue = (val: string | number) => {
      if (isReadOnly) return;
      const next = selectedValues.filter((v) => v !== val);
      if (!isControlled) setInternalValues(next);
      onChange?.(next);
    };

    const clearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isReadOnly) return;
      if (!isControlled) setInternalValues([]);
      onChange?.([]);
    };

    const handleContainerClick = () => {
      if (!isDisabled && !isReadOnly) {
        setIsOpen((o) => !o);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isReadOnly) {
        if (e.key === "Tab") {
          setIsOpen(false);
        } else {
          e.preventDefault();
        }
        return;
      }
      switch (e.key) {
        case "Backspace":
          if (!search && selectedValues.length > 0) {
            // Remove last tag when search is empty
            removeValue(selectedValues[selectedValues.length - 1]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
          else setActiveIdx((i) => Math.min(i + 1, navigable.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIdx((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (activeIdx >= 0 && navigable[activeIdx]) {
            toggleValue(navigable[activeIdx].value);
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    // ── Render ─────────────────────────────────────────────────────────────
    const showClear = clearable && selectedValues.length > 0 && !isDisabled && !isReadOnly;

    return (
      <div className={`astralis-relative astralis-w-full ${className}`}>
        {/* Trigger container */}
        <div
          ref={containerRef}
          id={id}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={isInvalid || undefined}
          aria-readonly={isReadOnly || undefined}
          onClick={handleContainerClick}
          className={[
            "astralis-w-full astralis-flex astralis-items-center astralis-flex-wrap astralis-gap-1.5 astralis-cursor-text",
            "astralis-transition-colors astralis-duration-150",
            containerHeight[size],
            containerPad[size],
            variantBase[variant],
            isFocused && !isReadOnly ? variantFocus[variant] : "",
            isInvalid ? variantInvalid[variant] : "",
            isDisabled
              ? "astralis-cursor-not-allowed astralis-opacity-50 astralis-pointer-events-none"
              : "",
            isReadOnly
              ? "astralis-cursor-default read-only:astralis-bg-surface-raised/40"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Selected tags */}
          {selectedOptions.map((opt) => (
            <Tag
              key={String(opt.value)}
              label={opt.label}
              size={size}
              disabled={!!isDisabled || !!isReadOnly}
              onRemove={() => removeValue(opt.value)}
            />
          ))}

          {/* Inline search input */}
          <input
            ref={searchRef}
            type="text"
            placeholder={selectedValues.length === 0 ? placeholder : ""}
            value={search}
            onChange={(e) => {
              if (isReadOnly) return;
              setSearch(e.target.value);
              setActiveIdx(-1);
              if (!isOpen) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              if (!isReadOnly) setIsOpen(true);
            }}
            onBlur={() => setIsFocused(false)}
            disabled={!!isDisabled}
            readOnly={isReadOnly}
            aria-readonly={isReadOnly || undefined}
            className={[
              "astralis-flex-1 astralis-min-w-16 astralis-bg-transparent astralis-outline-none",
              "astralis-text-content-primary placeholder:astralis-text-content-tertiary",
              inputText[size],
            ].join(" ")}
          />

          {/* Right-side icons */}
          <span className="astralis-flex astralis-items-center astralis-gap-1 astralis-text-content-tertiary astralis-shrink-0 astralis-ml-auto">
            {loading ? (
              <SpinnerIcon />
            ) : (
              <>
                {showClear && (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label="Clear all"
                    onMouseDown={clearAll}
                    className="astralis-flex astralis-items-center astralis-rounded astralis-p-0.5 hover:astralis-text-content-primary astralis-transition-colors"
                  >
                    <CloseIcon size={12} />
                  </button>
                )}
                <ChevronIcon open={isOpen} />
              </>
            )}
          </span>
        </div>

        {/* Portal dropdown */}
        {isOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              role="listbox"
              aria-multiselectable="true"
              style={{
                position: "fixed",
                top: pos.top,
                left: pos.left,
                width: pos.width,
                zIndex: 9999,
              }}
              className="astralis-bg-surface-base astralis-border astralis-border-border-subtle astralis-rounded-xl astralis-shadow-lg astralis-overflow-hidden"
            >
              {/* Max reached notice */}
              {isMaxReached && (
                <div className="astralis-px-3 astralis-py-1.5 astralis-text-xs astralis-text-content-tertiary astralis-border-b astralis-border-border-subtle astralis-bg-surface-raised">
                  Maximum {max} item{max !== 1 ? "s" : ""} selected
                </div>
              )}

              {/* Options list */}
              <div className="astralis-max-h-60 astralis-overflow-y-auto astralis-p-1.5">
                {filteredOptions.length === 0 ? (
                  <div className="astralis-px-3 astralis-py-4 astralis-text-sm astralis-text-content-tertiary astralis-text-center">
                    {emptyText}
                  </div>
                ) : (
                  filteredOptions.map((opt, i) => {
                    if (isGroup(opt)) {
                      return (
                        <div key={`g-${i}`}>
                          <div className="astralis-px-2 astralis-pt-2 astralis-pb-1 astralis-text-xs astralis-font-semibold astralis-uppercase astralis-tracking-wider astralis-text-content-tertiary">
                            {opt.group}
                          </div>
                          {opt.options.map((item) => (
                            <OptionItem
                              key={String(item.value)}
                              option={
                                isMaxReached &&
                                !selectedValues.includes(item.value)
                                  ? { ...item, disabled: true }
                                  : item
                              }
                              isActive={
                                navigable.findIndex(
                                  (n) => n.value === item.value,
                                ) === activeIdx
                              }
                              isSelected={selectedValues.includes(item.value)}
                              onToggle={toggleValue}
                            />
                          ))}
                        </div>
                      );
                    }
                    return (
                      <OptionItem
                        key={String(opt.value)}
                        option={
                          isMaxReached && !selectedValues.includes(opt.value)
                            ? { ...opt, disabled: true }
                            : opt
                        }
                        isActive={
                          navigable.findIndex((n) => n.value === opt.value) ===
                          activeIdx
                        }
                        isSelected={selectedValues.includes(opt.value)}
                        onToggle={toggleValue}
                      />
                    );
                  })
                )}
              </div>
            </div>,
            document.body,
          )}
      </div>
    );
  },
);

MultiSelectBase.displayName = "MultiSelect";
