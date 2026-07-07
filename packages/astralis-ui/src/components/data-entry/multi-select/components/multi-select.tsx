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
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFieldContext } from "../../field/field.context";
import {
  msContainer,
  msFocusRing,
  msTagSizes,
  msInputText,
  msOptionClasses,
} from "../multi-select.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";
import { ChevronDownIcon, XIcon, CheckIcon } from "../../../icon/internal-icons";
import type {
  MultiSelectOptionGroup,
  MultiSelectOptionItem,
  MultiSelectOptionOrGroup,
  MultiSelectProps,
  MultiSelectSize,
} from "../multi-select.types";

function isGroup(opt: MultiSelectOptionOrGroup): opt is MultiSelectOptionGroup {
  return "group" in opt;
}

function flattenOptions(options: MultiSelectOptionOrGroup[]): MultiSelectOptionItem[] {
  return options.flatMap((o) => (isGroup(o) ? o.options : [o]));
}

function getSearchText(opt: MultiSelectOptionItem): string {
  return opt.searchLabel ?? String(opt.label);
}

/** Indeterminate loading spinner (no shared glyph — kept local). */
function SpinnerIcon() {
  return (
    <svg aria-hidden="true" className="astralis:h-4 astralis:w-4 astralis:shrink-0 astralis:animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="astralis:opacity-lower" />
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="astralis:opacity-high" />
    </svg>
  );
}

function Tag({
  label,
  onRemove,
  disabled,
  size,
}: {
  label: ReactNode;
  onRemove: () => void;
  disabled?: boolean;
  size: MultiSelectSize;
}) {
  return (
    <span
      className={astralisMerge(
        msTagSizes[size],
        "astralis:inline-flex astralis:items-center astralis:gap-1 astralis:rounded-sm astralis:font-medium astralis:bg-accent-subtle astralis:text-accent-label astralis:transition-colors",
      )}
    >
      <span className="astralis:truncate astralis:max-w-32">{label}</span>
      {!disabled && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Remove"
          onMouseDown={(e) => {
            e.preventDefault(); // don't blur the container
            onRemove();
          }}
          className="astralis:flex astralis:items-center astralis:shrink-0 astralis:transition-colors astralis:hover:text-accent-emphasized"
        >
          <XIcon className="astralis:h-2.5 astralis:w-2.5" />
        </button>
      )}
    </span>
  );
}

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
      className={astralisMerge(
        "astralis:flex astralis:items-center astralis:justify-between astralis:gap-2",
        "astralis:px-3 astralis:py-2 astralis:rounded-lg astralis:text-sm astralis:cursor-pointer astralis:transition-colors",
        msOptionClasses(isActive, !!option.disabled),
        isSelected && "astralis:font-medium",
      )}
    >
      <span className="astralis:truncate">{option.label}</span>
      {isSelected && <CheckIcon className="astralis:h-3.5 astralis:w-3.5 astralis:shrink-0 astralis:text-accent-solid" />}
    </div>
  );
}

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
      colorScheme = "brand",
      disabled: disabledProp,
      invalid: invalidProp,
      readOnly: readOnlyProp,
      clearable = false,
      max,
      emptyText = "No options",
      loading = false,
      name,
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

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [activeIdx, setActiveIdx] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);

    const isControlled = value !== undefined;
    const [internalValues, setInternalValues] = useState<Array<string | number>>(defaultValue);
    const selectedValues = isControlled ? (value ?? []) : internalValues;

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
            const filtered = o.options.filter((opt) => getSearchText(opt).toLowerCase().includes(q));
            return filtered.length ? { ...o, options: filtered } : null;
          }
          return getSearchText(o).toLowerCase().includes(q) ? o : null;
        })
        .filter((o): o is MultiSelectOptionOrGroup => o !== null);
    }, [options, search]);

    const flatFiltered = useMemo(() => flattenOptions(filteredOptions), [filteredOptions]);
    const navigable = useMemo(() => flatFiltered.filter((o) => !o.disabled), [flatFiltered]);

    const isMaxReached = max != null && selectedValues.length >= max;

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => containerRef.current!, []);

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

    useEffect(() => {
      if (isOpen) {
        setActiveIdx(-1);
        requestAnimationFrame(() => searchRef.current?.focus());
      } else {
        setSearch("");
        setActiveIdx(-1);
      }
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (!containerRef.current?.contains(target) && !dropdownRef.current?.contains(target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    const toggleValue = (val: string | number) => {
      if (isReadOnly) return;
      const next = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : isMaxReached
          ? selectedValues
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

    const clearAll = (e: ReactMouseEvent) => {
      e.stopPropagation();
      if (isReadOnly) return;
      if (!isControlled) setInternalValues([]);
      onChange?.([]);
    };

    const handleContainerClick = () => {
      if (!isDisabled && !isReadOnly) setIsOpen((o) => !o);
    };

    const handleKeyDown = (e: ReactKeyboardEvent) => {
      if (isReadOnly) {
        if (e.key === "Tab") setIsOpen(false);
        else e.preventDefault();
        return;
      }
      switch (e.key) {
        case "Backspace":
          if (!search && selectedValues.length > 0) {
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
          if (!isOpen) setIsOpen(true);
          else if (activeIdx >= 0 && navigable[activeIdx]) toggleValue(navigable[activeIdx].value);
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    const showClear = clearable && selectedValues.length > 0 && !isDisabled && !isReadOnly;

    return (
      <div className={astralisMerge("astralis:relative astralis:w-full", accentClass(colorScheme), className)}>
        {/* Native form bridge — one hidden input per selected value (repeated
            name), so the selection reaches <form> submission. */}
        {name != null &&
          selectedValues.map((v) => (
            <input key={String(v)} type="hidden" name={name} value={v} disabled={!!isDisabled} />
          ))}
        <div
          ref={containerRef}
          id={id}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={isInvalid || undefined}
          aria-readonly={isReadOnly || undefined}
          onClick={handleContainerClick}
          className={astralisMerge(
            msContainer({ size, variant, invalid: !!isInvalid }),
            isFocused && !isReadOnly && msFocusRing(variant, !!isInvalid),
            isDisabled && "astralis:cursor-not-allowed astralis:opacity-moderate astralis:pointer-events-none",
            isReadOnly && "astralis:cursor-default astralis:bg-surface-muted",
          )}
        >
          {selectedOptions.map((opt) => (
            <Tag
              key={String(opt.value)}
              label={opt.label}
              size={size}
              disabled={!!isDisabled || !!isReadOnly}
              onRemove={() => removeValue(opt.value)}
            />
          ))}

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
            className={astralisMerge(
              "astralis:flex-1 astralis:min-w-16 astralis:bg-transparent astralis:outline-none astralis:text-label-base astralis:placeholder:text-label-subtle",
              msInputText[size],
            )}
          />

          <span className="astralis:flex astralis:items-center astralis:gap-1 astralis:shrink-0 astralis:ml-auto astralis:text-label-subtle">
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
                    className="astralis:flex astralis:items-center astralis:rounded-sm astralis:p-0.5 astralis:transition-colors astralis:hover:text-label-base"
                  >
                    <XIcon className="astralis:h-3.5 astralis:w-3.5" />
                  </button>
                )}
                <ChevronDownIcon
                  className={astralisMerge(
                    "astralis:h-4 astralis:w-4 astralis:shrink-0 astralis:transition-transform",
                    isOpen && "astralis:rotate-180",
                  )}
                />
              </>
            )}
          </span>
        </div>

        {isOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              role="listbox"
              aria-multiselectable="true"
              style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
              className={astralisMerge(
                "astralis:bg-surface-base astralis:border-normal astralis:border-stroke-subtle astralis:rounded-xl astralis:shadow-lg astralis:overflow-hidden",
                accentClass(colorScheme),
              )}
            >
              {isMaxReached && (
                <div className="astralis:px-3 astralis:py-1.5 astralis:text-xs astralis:text-label-subtle astralis:border-b astralis:border-stroke-subtle astralis:bg-surface-muted">
                  Maximum {max} item{max !== 1 ? "s" : ""} selected
                </div>
              )}

              <div className="astralis:max-h-60 astralis:overflow-y-auto astralis:p-1.5">
                {filteredOptions.length === 0 ? (
                  <div className="astralis:px-3 astralis:py-4 astralis:text-sm astralis:text-label-subtle astralis:text-center">
                    {emptyText}
                  </div>
                ) : (
                  filteredOptions.map((opt, i) => {
                    if (isGroup(opt)) {
                      return (
                        <div key={`g-${i}`}>
                          <div className="astralis:px-2 astralis:pt-2 astralis:pb-1 astralis:text-xs astralis:font-semibold astralis:uppercase astralis:tracking-wider astralis:text-label-subtle">
                            {opt.group}
                          </div>
                          {opt.options.map((item) => (
                            <OptionItem
                              key={String(item.value)}
                              option={isMaxReached && !selectedValues.includes(item.value) ? { ...item, disabled: true } : item}
                              isActive={navigable.findIndex((n) => n.value === item.value) === activeIdx}
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
                        option={isMaxReached && !selectedValues.includes(opt.value) ? { ...opt, disabled: true } : opt}
                        isActive={navigable.findIndex((n) => n.value === opt.value) === activeIdx}
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
