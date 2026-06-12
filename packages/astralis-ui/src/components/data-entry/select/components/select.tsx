import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useFieldContext } from "../../field/field.context";
import type {
  SelectOptionGroup,
  SelectOptionItem,
  SelectOptionOrGroup,
  SelectProps,
  SelectSize,
  SelectVariant,
} from "../select.types";

// ── Type guard & utils ─────────────────────────────────────────────────────────

function isGroup(opt: SelectOptionOrGroup): opt is SelectOptionGroup {
  return "group" in opt;
}

function flattenOptions(options: SelectOptionOrGroup[]): SelectOptionItem[] {
  return options.flatMap((o) => (isGroup(o) ? o.options : [o]));
}

// ── Size / variant tables ──────────────────────────────────────────────────────

const sizeClasses: Record<SelectSize, { trigger: string; text: string }> = {
  sm: { trigger: "astralis-h-8 astralis-px-3", text: "astralis-text-xs" },
  md: { trigger: "astralis-h-10 astralis-px-3", text: "astralis-text-sm" },
  lg: { trigger: "astralis-h-12 astralis-px-4", text: "astralis-text-base" },
};

const variantBase: Record<SelectVariant, string> = {
  outline:
    "astralis-border astralis-border-stroke-subtle astralis-bg-surface-base astralis-rounded-lg " +
    "hover:astralis-border-stroke-strong " +
    "focus:astralis-outline-none focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200",
  filled:
    "astralis-border astralis-border-transparent astralis-bg-surface-raised astralis-rounded-lg " +
    "hover:astralis-bg-surface-overlay " +
    "focus:astralis-outline-none focus:astralis-bg-surface-base focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200",
};

const variantInvalid: Record<SelectVariant, string> = {
  outline:
    "astralis-border-error-500 hover:astralis-border-error-500 focus:astralis-border-error-500 focus:astralis-ring-error-200",
  filled:
    "astralis-border-error-500 hover:astralis-border-error-500 focus:astralis-border-error-500 focus:astralis-ring-error-200",
};

// ── Inline icons ───────────────────────────────────────────────────────────────

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

function ClearIcon() {
  return (
    <svg
      aria-hidden="true"
      className="astralis-h-3.5 astralis-w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="astralis-h-3.5 astralis-w-3.5 astralis-shrink-0 astralis-text-content-tertiary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

// ── Internal OptionItem ────────────────────────────────────────────────────────

function OptionItem({
  option,
  isActive,
  isSelected,
  onSelect,
}: {
  option: SelectOptionItem;
  isActive: boolean;
  isSelected: boolean;
  onSelect: (value: string | number) => void;
}) {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={option.disabled}
      onMouseDown={(e) => {
        // mousedown so we beat the trigger's blur event
        e.preventDefault();
        if (!option.disabled) onSelect(option.value);
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

// ── Select component ───────────────────────────────────────────────────────────

export const SelectBase = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options = [],
      value,
      defaultValue = null,
      onChange,
      onClear,
      placeholder = "Select an option",
      size = "md",
      variant = "outline",
      disabled: disabledProp,
      invalid: invalidProp,
      readOnly: readOnlyProp,
      clearable = false,
      searchable = false,
      loading = false,
      emptyText = "No options",
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

    // ── State ────────────────────────────────────────────────────────────────
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [activeIdx, setActiveIdx] = useState(-1);

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string | number | null>(
      defaultValue,
    );
    const selectedValue = isControlled ? (value ?? null) : internalValue;

    // ── Derived data ─────────────────────────────────────────────────────────
    const flatAll = useMemo(() => flattenOptions(options), [options]);

    const selectedOption = useMemo(
      () => flatAll.find((o) => o.value === selectedValue) ?? null,
      [flatAll, selectedValue],
    );

    const filteredOptions = useMemo<SelectOptionOrGroup[]>(() => {
      if (!searchable || !search.trim()) return options;
      const q = search.toLowerCase();
      return options
        .map((o): SelectOptionOrGroup | null => {
          if (isGroup(o)) {
            const filtered = o.options.filter((opt) =>
              String(opt.label).toLowerCase().includes(q),
            );
            return filtered.length > 0 ? { ...o, options: filtered } : null;
          }
          return String(o.label).toLowerCase().includes(q) ? o : null;
        })
        .filter((o): o is SelectOptionOrGroup => o !== null);
    }, [options, search, searchable]);

    const flatFiltered = useMemo(
      () => flattenOptions(filteredOptions),
      [filteredOptions],
    );
    const navigable = useMemo(
      () => flatFiltered.filter((o) => !o.disabled),
      [flatFiltered],
    );

    // ── Refs ─────────────────────────────────────────────────────────────────
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => triggerRef.current!, []);

    // ── Portal positioning (fixed coords = viewport-relative) ────────────────
    const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

    const updatePos = useCallback(() => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }, []);

    // useLayoutEffect so the position is calculated before the browser paints —
    // prevents the dropdown from flashing at (0,0) before jumping to the trigger.
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

    // ── Close on outside click ────────────────────────────────────────────────
    useEffect(() => {
      if (!isOpen) return;
      const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          !triggerRef.current?.contains(target) &&
          !dropdownRef.current?.contains(target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleMouseDown);
      return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [isOpen]);

    // ── Reset state when dropdown closes / focus search when it opens ─────────
    useEffect(() => {
      if (isOpen) {
        setActiveIdx(-1);
        if (searchable) {
          // defer focus so the dropdown is rendered first
          requestAnimationFrame(() => searchRef.current?.focus());
        }
      } else {
        setSearch("");
        setActiveIdx(-1);
      }
    }, [isOpen, searchable]);

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleSelect = (optValue: string | number) => {
      if (!isControlled) setInternalValue(optValue);
      onChange?.(optValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isReadOnly) return;
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
      onClear?.();
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
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (activeIdx >= 0 && navigable[activeIdx]) {
            handleSelect(navigable[activeIdx].value);
          }
          break;
        case "Escape":
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setActiveIdx((i) => Math.min(i + 1, navigable.length - 1));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIdx((i) => Math.max(i - 1, 0));
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    // ── Render ───────────────────────────────────────────────────────────────
    const sz = sizeClasses[size];
    const showClear = clearable && selectedValue != null && !isDisabled && !isReadOnly;

    return (
      <div className={`astralis-relative astralis-w-full ${className}`}>
        {/* Trigger */}
        <button
          ref={triggerRef}
          type="button"
          id={id}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={isInvalid || undefined}
          aria-readonly={isReadOnly || undefined}
          disabled={!!isDisabled || loading}
          onClick={() => {
            if (!isDisabled && !isReadOnly && !loading) {
              setIsOpen((o) => !o);
            }
          }}
          onKeyDown={handleKeyDown}
          className={[
            "astralis-w-full astralis-flex astralis-items-center astralis-gap-2 astralis-text-left",
            "astralis-transition-colors astralis-duration-150",
            "disabled:astralis-cursor-not-allowed disabled:astralis-opacity-50",
            isReadOnly ? "astralis-cursor-default read-only:astralis-bg-surface-raised/40" : "",
            sz.trigger,
            sz.text,
            variantBase[variant],
            isInvalid ? variantInvalid[variant] : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Selected label or placeholder */}
          <span
            className={[
              "astralis-flex-1 astralis-truncate",
              selectedOption
                ? "astralis-text-content-primary"
                : "astralis-text-content-tertiary",
            ].join(" ")}
          >
            {selectedOption?.label ?? placeholder}
          </span>

          {/* Icons */}
          <span className="astralis-flex astralis-items-center astralis-gap-1 astralis-text-content-tertiary astralis-shrink-0">
            {loading ? (
              <SpinnerIcon />
            ) : (
              <>
                {showClear && (
                  <span
                    role="button"
                    aria-label="Clear selection"
                    onMouseDown={handleClear}
                    className="astralis-flex astralis-items-center astralis-rounded astralis-p-0.5 hover:astralis-text-content-primary astralis-transition-colors"
                  >
                    <ClearIcon />
                  </span>
                )}
                <ChevronIcon open={isOpen} />
              </>
            )}
          </span>
        </button>

        {/* Portal dropdown */}
        {isOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              role="listbox"
              style={{
                position: "fixed",
                top: pos.top,
                left: pos.left,
                width: pos.width,
                zIndex: 9999,
              }}
              className="astralis-bg-surface-base astralis-border astralis-border-stroke-subtle astralis-rounded-xl astralis-shadow-lg astralis-overflow-hidden"
            >
              {/* Search input */}
              {searchable && (
                <div className="astralis-p-2 astralis-border-b astralis-border-stroke-subtle">
                  <div className="astralis-flex astralis-items-center astralis-gap-2 astralis-px-2.5 astralis-h-8 astralis-rounded-lg astralis-border astralis-border-stroke-subtle astralis-bg-surface-raised">
                    <SearchIcon />
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search…"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setActiveIdx(-1);
                      }}
                      onKeyDown={handleKeyDown}
                      className="astralis-flex-1 astralis-text-sm astralis-bg-transparent astralis-outline-none astralis-text-content-primary placeholder:astralis-text-content-tertiary"
                    />
                  </div>
                </div>
              )}

              {/* Options */}
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
                          {/* Group label */}
                          <div className="astralis-px-2 astralis-pt-2 astralis-pb-1 astralis-text-xs astralis-font-semibold astralis-uppercase astralis-tracking-wider astralis-text-content-tertiary">
                            {opt.group}
                          </div>
                          {opt.options.map((item) => (
                            <OptionItem
                              key={String(item.value)}
                              option={item}
                              isActive={
                                navigable.findIndex(
                                  (n) => n.value === item.value,
                                ) === activeIdx
                              }
                              isSelected={item.value === selectedValue}
                              onSelect={handleSelect}
                            />
                          ))}
                        </div>
                      );
                    }
                    return (
                      <OptionItem
                        key={String(opt.value)}
                        option={opt}
                        isActive={
                          navigable.findIndex((n) => n.value === opt.value) ===
                          activeIdx
                        }
                        isSelected={opt.value === selectedValue}
                        onSelect={handleSelect}
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

SelectBase.displayName = "Select";
