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
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { useFieldContext } from "../../field/field.context";
import { selectTrigger, selectOptionClasses } from "../select.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";
import { ChevronDownIcon, XIcon, SearchIcon, CheckIcon, SpinnerIcon } from "../../../icon/internal-icons";
import type {
  SelectOptionGroup,
  SelectOptionItem,
  SelectOptionOrGroup,
  SelectProps,
} from "../select.types";

function isGroup(opt: SelectOptionOrGroup): opt is SelectOptionGroup {
  return "group" in opt;
}

function flattenOptions(options: SelectOptionOrGroup[]): SelectOptionItem[] {
  return options.flatMap((o) => (isGroup(o) ? o.options : [o]));
}

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
      className={astralisMerge(
        "astralis:flex astralis:items-center astralis:justify-between astralis:gap-2",
        "astralis:px-3 astralis:py-2 astralis:rounded-lg astralis:text-sm astralis:cursor-pointer astralis:transition-colors",
        selectOptionClasses(isActive, !!option.disabled),
        isSelected && "astralis:font-medium",
      )}
    >
      <span className="astralis:truncate">{option.label}</span>
      {isSelected && <CheckIcon className="astralis:h-3.5 astralis:w-3.5 astralis:shrink-0 astralis:text-accent-solid" />}
    </div>
  );
}

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
      colorScheme = "brand",
      disabled: disabledProp,
      invalid: invalidProp,
      readOnly: readOnlyProp,
      clearable = false,
      searchable = false,
      loading = false,
      emptyText = "No options",
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

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string | number | null>(defaultValue);
    const selectedValue = isControlled ? (value ?? null) : internalValue;

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
            const filtered = o.options.filter((opt) => String(opt.label).toLowerCase().includes(q));
            return filtered.length > 0 ? { ...o, options: filtered } : null;
          }
          return String(o.label).toLowerCase().includes(q) ? o : null;
        })
        .filter((o): o is SelectOptionOrGroup => o !== null);
    }, [options, search, searchable]);

    const flatFiltered = useMemo(() => flattenOptions(filteredOptions), [filteredOptions]);
    const navigable = useMemo(() => flatFiltered.filter((o) => !o.disabled), [flatFiltered]);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => triggerRef.current!, []);

    const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

    const updatePos = useCallback(() => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
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
      if (!isOpen) return;
      const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as Node;
        if (!triggerRef.current?.contains(target) && !dropdownRef.current?.contains(target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleMouseDown);
      return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [isOpen]);

    useEffect(() => {
      if (isOpen) {
        setActiveIdx(-1);
        if (searchable) requestAnimationFrame(() => searchRef.current?.focus());
      } else {
        setSearch("");
        setActiveIdx(-1);
      }
    }, [isOpen, searchable]);

    const handleSelect = (optValue: string | number) => {
      if (!isControlled) setInternalValue(optValue);
      onChange?.(optValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    const handleClear = (e: ReactMouseEvent) => {
      e.stopPropagation();
      if (isReadOnly) return;
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
      onClear?.();
    };

    const handleKeyDown = (e: ReactKeyboardEvent) => {
      if (isReadOnly) {
        if (e.key === "Tab") setIsOpen(false);
        else e.preventDefault();
        return;
      }
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
          else if (activeIdx >= 0 && navigable[activeIdx]) handleSelect(navigable[activeIdx].value);
          break;
        case "Escape":
          setIsOpen(false);
          triggerRef.current?.focus();
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
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    const showClear = clearable && selectedValue != null && !isDisabled && !isReadOnly;

    return (
      <div className={astralisMerge("astralis:relative astralis:w-full", accentClass(colorScheme), className)}>
        {/* Native form bridge — the trigger is a <button>, so without this
            the selected value would never reach <form> submission. */}
        {name != null && (
          <input type="hidden" name={name} value={selectedValue ?? ""} disabled={!!isDisabled} />
        )}
        <button
          ref={triggerRef}
          type="button"
          id={id}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={isInvalid || undefined}
          aria-describedby={field?.describedBy}
          aria-readonly={isReadOnly || undefined}
          disabled={!!isDisabled || loading}
          onClick={() => {
            if (!isDisabled && !isReadOnly && !loading) setIsOpen((o) => !o);
          }}
          onKeyDown={handleKeyDown}
          className={astralisMerge(
            selectTrigger({ size, variant, invalid: !!isInvalid }),
            isReadOnly && "astralis:cursor-default astralis:bg-surface-muted",
          )}
        >
          <span className={astralisMerge("astralis:flex-1 astralis:truncate", selectedOption ? "astralis:text-label-base" : "astralis:text-label-subtle")}>
            {selectedOption?.label ?? placeholder}
          </span>

          <span className="astralis:flex astralis:items-center astralis:gap-1 astralis:shrink-0 astralis:text-label-subtle">
            {loading ? (
              <SpinnerIcon />
            ) : (
              <>
                {showClear && (
                  <span
                    role="button"
                    aria-label="Clear selection"
                    onMouseDown={handleClear}
                    className="astralis:flex astralis:items-center astralis:rounded-sm astralis:p-0.5 astralis:transition-colors astralis:hover:text-label-base"
                  >
                    <XIcon className="astralis:h-3.5 astralis:w-3.5" />
                  </span>
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
        </button>

        {isOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              role="listbox"
              style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
              className={astralisMerge(
                "astralis:bg-surface-base astralis:border-normal astralis:border-stroke-subtle astralis:rounded-xl astralis:shadow-lg astralis:overflow-hidden",
                accentClass(colorScheme),
              )}
            >
              {searchable && (
                <div className="astralis:p-2 astralis:border-b astralis:border-stroke-subtle">
                  <div className="astralis:flex astralis:items-center astralis:gap-2 astralis:px-2.5 astralis:h-8 astralis:rounded-lg astralis:border-normal astralis:border-stroke-subtle astralis:bg-surface-muted">
                    <SearchIcon className="astralis:h-3.5 astralis:w-3.5 astralis:shrink-0 astralis:text-label-subtle" />
                    <input
                      ref={searchRef}
                      aria-label="Search options"
                      type="text"
                      placeholder="Search…"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setActiveIdx(-1);
                      }}
                      onKeyDown={handleKeyDown}
                      className="astralis:flex-1 astralis:text-sm astralis:bg-transparent astralis:outline-none astralis:text-label-base astralis:placeholder:text-label-subtle"
                    />
                  </div>
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
                              option={item}
                              isActive={navigable.findIndex((n) => n.value === item.value) === activeIdx}
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
                        isActive={navigable.findIndex((n) => n.value === opt.value) === activeIdx}
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
