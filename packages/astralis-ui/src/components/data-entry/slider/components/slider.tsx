import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, Ref } from "react";
import { useFieldContext } from "../../field/field.context";
import { sliderTrackH, sliderThumbSize, CENTER_XY } from "../slider.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";
import type { RangeSliderProps, SliderMark, SliderProps } from "../slider.types";

// ── Shared util ────────────────────────────────────────────────────────────────

function toPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

function calcValue(clientX: number, trackEl: HTMLElement, min: number, max: number, step: number): number {
  const { left, width } = trackEl.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientX - left) / width));
  const raw = min + pct * (max - min);
  const stepped = Math.round(raw / step) * step;
  const precision = String(step).includes(".") ? String(step).split(".")[1].length : 0;
  return parseFloat(Math.max(min, Math.min(max, stepped)).toFixed(precision));
}

function buildMarks(marks: boolean | SliderMark[] | undefined, min: number, max: number, step: number): SliderMark[] {
  if (!marks) return [];
  if (marks === true) {
    const count = Math.round((max - min) / step);
    if (count > 20) return [{ value: min }, { value: max }];
    return Array.from({ length: count + 1 }, (_, i) => ({ value: min + i * step }));
  }
  return marks;
}

// ── Tooltip ────────────────────────────────────────────────────────────────────

function Tooltip({ value, visible }: { value: number; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      aria-hidden="true"
      style={{ bottom: "100%", left: "50%", transform: "translateX(-50%)" }}
      className="astralis:absolute astralis:mb-2 astralis:pointer-events-none"
    >
      <div className="astralis:relative astralis:rounded-sm astralis:bg-surface-inverted astralis:px-1.5 astralis:py-0.5 astralis:text-xs astralis:font-medium astralis:text-label-inverted astralis:whitespace-nowrap astralis:shadow-sm">
        {value}
        {/* Arrow */}
        <div
          aria-hidden="true"
          style={{ top: "100%", left: "50%", transform: "translateX(-50%) rotate(45deg)", marginTop: "-3px" }}
          className="astralis:absolute astralis:h-2 astralis:w-2 astralis:bg-surface-inverted"
        />
      </div>
    </div>
  );
}

// ── Thumb ──────────────────────────────────────────────────────────────────────

function Thumb({
  percent,
  value,
  size,
  isInvalid,
  isDisabled,
  isReadOnly,
  showTooltip,
  onMouseDown,
  onKeyDown,
  ariaMin,
  ariaMax,
  label,
}: {
  percent: number;
  value: number;
  size: SliderProps["size"] & string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  showTooltip: boolean;
  onMouseDown: (e: ReactMouseEvent) => void;
  onKeyDown: (e: ReactKeyboardEvent) => void;
  ariaMin: number;
  ariaMax: number;
  label?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: ReactMouseEvent) => {
    if (isDisabled || isReadOnly) return;
    setIsDragging(true);
    onMouseDown(e);
    const handleUp = () => setIsDragging(false);
    document.addEventListener("mouseup", handleUp, { once: true });
  };

  const showTip = showTooltip && (isHovering || isDragging);

  return (
    <div
      role="slider"
      tabIndex={isDisabled ? -1 : 0}
      aria-valuemin={ariaMin}
      aria-valuemax={ariaMax}
      aria-valuenow={value}
      aria-label={label}
      aria-disabled={isDisabled}
      aria-readonly={isReadOnly}
      style={{ left: `${percent}%`, ...CENTER_XY }}
      className={astralisMerge(
        "astralis:absolute astralis:rounded-full astralis:border-moderate astralis:bg-surface-base astralis:shadow-md astralis:transition-shadow",
        "astralis:outline-none astralis:focus-visible:ring-2 astralis:focus-visible:ring-offset-1 astralis:focus-visible:ring-offset-surface-base",
        sliderThumbSize[size],
        isInvalid
          ? "astralis:border-red-solid astralis:focus-visible:ring-red-muted"
          : "astralis:border-accent-solid astralis:focus-visible:ring-accent-ring",
        isDisabled
          ? "astralis:cursor-not-allowed astralis:border-stroke-emphasized"
          : isReadOnly
            ? "astralis:cursor-default"
            : "astralis:cursor-grab astralis:active:cursor-grabbing astralis:hover:shadow-lg",
      )}
      onMouseDown={handleMouseDown}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip value={value} visible={showTip} />
    </div>
  );
}

// ── Marks ──────────────────────────────────────────────────────────────────────

function Marks({ marksArr, min, max, isActive }: { marksArr: SliderMark[]; min: number; max: number; isActive: (v: number) => boolean }) {
  return (
    <>
      {marksArr.map((mark) => {
        const mPct = toPercent(mark.value, min, max);
        return (
          <div key={mark.value} aria-hidden="true" style={{ left: `${mPct}%`, ...CENTER_XY }} className="astralis:absolute">
            <div
              className={astralisMerge(
                "astralis:h-1.5 astralis:w-1.5 astralis:rounded-full astralis:border-normal",
                isActive(mark.value)
                  ? "astralis:bg-accent-solid astralis:border-accent-solid"
                  : "astralis:bg-surface-base astralis:border-stroke-emphasized",
              )}
            />
            {mark.label && (
              <span
                style={{ left: "50%", transform: "translateX(-50%)" }}
                className="astralis:absolute astralis:top-3 astralis:text-xs astralis:text-label-muted astralis:whitespace-nowrap"
              >
                {mark.label}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}

// ── Slider (single thumb) ──────────────────────────────────────────────────────

export function SliderBase({
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue = 0,
  onChange,
  size = "md",
  colorScheme = "brand",
  showTooltip = true,
  marks,
  disabled: disabledProp,
  invalid: invalidProp,
  readOnly: readOnlyProp,
  className = "",
  id: idProp,
  ref,
}: SliderProps & { ref?: Ref<HTMLDivElement> }) {
    const field = useFieldContext();
    const isDisabled = disabledProp ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const isReadOnly = readOnlyProp ?? field?.readOnly;
    const id = idProp ?? field?.id;

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = isControlled ? valueProp! : internalValue;

    const trackRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const paramsRef = useRef({ min, max, step, isControlled, isDisabled, isReadOnly });
    useEffect(() => {
      paramsRef.current = { min, max, step, isControlled, isDisabled, isReadOnly };
    });
    const onChangeRef = useRef(onChange);
    useEffect(() => {
      onChangeRef.current = onChange;
    });
    const setValueRef = useRef(setInternalValue);

    const applyClientX = useCallback((clientX: number) => {
      if (!trackRef.current || paramsRef.current.isDisabled || paramsRef.current.isReadOnly) return;
      const { min, max, step, isControlled } = paramsRef.current;
      const v = calcValue(clientX, trackRef.current, min, max, step);
      if (!isControlled) setValueRef.current(v);
      onChangeRef.current?.(v);
    }, []);

    useEffect(() => {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        if (!isDraggingRef.current) return;
        const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        applyClientX(clientX);
      };
      const handleUp = () => {
        isDraggingRef.current = false;
      };
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchmove", handleMove, { passive: true });
      document.addEventListener("touchend", handleUp);
      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleUp);
      };
    }, [applyClientX]);

    const handleTrackMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
      if (isDisabled || isReadOnly) return;
      isDraggingRef.current = true;
      applyClientX(e.clientX);
    };

    const handleThumbMouseDown = (e: ReactMouseEvent) => {
      e.stopPropagation();
      if (isDisabled || isReadOnly) return;
      isDraggingRef.current = true;
    };

    const handleKeyDown = (e: ReactKeyboardEvent) => {
      if (isDisabled || isReadOnly) return;
      const { min, max, step } = paramsRef.current;
      let next = value;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          next = Math.max(min, value - step);
          break;
        case "ArrowRight":
        case "ArrowUp":
          next = Math.min(max, value + step);
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const pct = toPercent(value, min, max);
    const marksArr = useMemo(() => buildMarks(marks, min, max, step), [marks, min, max, step]);
    const hasLabels = marksArr.some((m) => m.label);

    return (
      <div
        ref={ref}
        id={id}
        className={astralisMerge(
          "astralis:relative astralis:w-full astralis:select-none",
          accentClass(colorScheme),
          hasLabels && "astralis:mb-6",
          isDisabled && "astralis:opacity-moderate",
          isReadOnly && "astralis:opacity-high",
          className,
        )}
      >
        <div
          ref={trackRef}
          onMouseDown={handleTrackMouseDown}
          className={astralisMerge(
            "astralis:relative astralis:w-full astralis:rounded-full astralis:bg-surface-muted",
            sliderTrackH[size],
            isDisabled ? "astralis:cursor-not-allowed" : isReadOnly ? "astralis:cursor-default" : "astralis:cursor-pointer",
          )}
        >
          <div
            aria-hidden="true"
            style={{ top: 0, bottom: 0, left: 0, width: `${pct}%` }}
            className={astralisMerge("astralis:absolute astralis:rounded-full", isInvalid ? "astralis:bg-red-solid" : "astralis:bg-accent-solid")}
          />

          <Thumb
            percent={pct}
            value={value}
            size={size}
            isInvalid={!!isInvalid}
            isDisabled={!!isDisabled}
            isReadOnly={!!isReadOnly}
            showTooltip={showTooltip}
            onMouseDown={handleThumbMouseDown}
            onKeyDown={handleKeyDown}
            ariaMin={min}
            ariaMax={max}
          />

          <Marks marksArr={marksArr} min={min} max={max} isActive={(v) => v <= value} />
        </div>
      </div>
    );
}

SliderBase.displayName = "Slider";

// ── RangeSlider (dual thumb) ───────────────────────────────────────────────────

export function RangeSliderBase({
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue = [20, 80],
  onChange,
  size = "md",
  colorScheme = "brand",
  showTooltip = true,
  marks,
  disabled: disabledProp,
  invalid: invalidProp,
  readOnly: readOnlyProp,
  className = "",
  ref,
}: RangeSliderProps & { ref?: Ref<HTMLDivElement> }) {
    const field = useFieldContext();
    const isDisabled = disabledProp ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const isReadOnly = readOnlyProp ?? field?.readOnly;

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
    const value = isControlled ? valueProp! : internalValue;

    const trackRef = useRef<HTMLDivElement>(null);
    const draggingThumbRef = useRef<0 | 1 | -1>(-1);

    const paramsRef = useRef({ min, max, step, isControlled, isDisabled, isReadOnly, value });
    useEffect(() => {
      paramsRef.current = { min, max, step, isControlled, isDisabled, isReadOnly, value };
    });
    const onChangeRef = useRef(onChange);
    useEffect(() => {
      onChangeRef.current = onChange;
    });

    const applyClientX = useCallback((clientX: number) => {
      if (!trackRef.current || paramsRef.current.isDisabled || paramsRef.current.isReadOnly) return;
      const thumbIdx = draggingThumbRef.current;
      if (thumbIdx === -1) return;

      const { min, max, step, isControlled, value } = paramsRef.current;
      const newV = calcValue(clientX, trackRef.current, min, max, step);

      let next: [number, number];
      if (thumbIdx === 0) {
        next = [Math.min(newV, value[1] - step), value[1]];
      } else {
        next = [value[0], Math.max(newV, value[0] + step)];
      }
      if (!isControlled) setInternalValue(next);
      onChangeRef.current?.(next);
    }, []);

    useEffect(() => {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        if (draggingThumbRef.current === -1) return;
        const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        applyClientX(clientX);
      };
      const handleUp = () => {
        draggingThumbRef.current = -1;
      };
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchmove", handleMove, { passive: true });
      document.addEventListener("touchend", handleUp);
      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleUp);
      };
    }, [applyClientX]);

    const handleTrackMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
      if (isDisabled || isReadOnly || !trackRef.current) return;
      const clickV = calcValue(e.clientX, trackRef.current, min, max, step);
      const distA = Math.abs(clickV - value[0]);
      const distB = Math.abs(clickV - value[1]);
      draggingThumbRef.current = distA <= distB ? 0 : 1;
      applyClientX(e.clientX);
    };

    const handleThumbMouseDown = (thumb: 0 | 1) => (e: ReactMouseEvent) => {
      e.stopPropagation();
      if (isDisabled || isReadOnly) return;
      draggingThumbRef.current = thumb;
    };

    const handleKeyDown = (thumb: 0 | 1) => (e: ReactKeyboardEvent) => {
      if (isDisabled || isReadOnly) return;
      const current = value[thumb];
      let next = current;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          next = Math.max(min, current - step);
          break;
        case "ArrowRight":
        case "ArrowUp":
          next = Math.min(max, current + step);
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      const newRange: [number, number] =
        thumb === 0 ? [Math.min(next, value[1] - step), value[1]] : [value[0], Math.max(next, value[0] + step)];
      if (!isControlled) setInternalValue(newRange);
      onChange?.(newRange);
    };

    const pctA = toPercent(value[0], min, max);
    const pctB = toPercent(value[1], min, max);
    const marksArr = useMemo(() => buildMarks(marks, min, max, step), [marks, min, max, step]);
    const hasLabels = marksArr.some((m) => m.label);

    return (
      <div
        ref={ref}
        className={astralisMerge(
          "astralis:relative astralis:w-full astralis:select-none",
          accentClass(colorScheme),
          hasLabels && "astralis:mb-6",
          isDisabled && "astralis:opacity-moderate",
          isReadOnly && "astralis:opacity-high",
          className,
        )}
      >
        <div
          ref={trackRef}
          onMouseDown={handleTrackMouseDown}
          className={astralisMerge(
            "astralis:relative astralis:w-full astralis:rounded-full astralis:bg-surface-muted",
            sliderTrackH[size],
            isDisabled ? "astralis:cursor-not-allowed" : isReadOnly ? "astralis:cursor-default" : "astralis:cursor-pointer",
          )}
        >
          <div
            aria-hidden="true"
            style={{ top: 0, bottom: 0, left: `${pctA}%`, width: `${pctB - pctA}%` }}
            className={astralisMerge("astralis:absolute astralis:rounded-full", isInvalid ? "astralis:bg-red-solid" : "astralis:bg-accent-solid")}
          />

          <Thumb
            percent={pctA}
            value={value[0]}
            size={size}
            isInvalid={!!isInvalid}
            isDisabled={!!isDisabled}
            isReadOnly={!!isReadOnly}
            showTooltip={showTooltip}
            onMouseDown={handleThumbMouseDown(0)}
            onKeyDown={handleKeyDown(0)}
            ariaMin={min}
            ariaMax={value[1]}
            label="Start value"
          />

          <Thumb
            percent={pctB}
            value={value[1]}
            size={size}
            isInvalid={!!isInvalid}
            isDisabled={!!isDisabled}
            isReadOnly={!!isReadOnly}
            showTooltip={showTooltip}
            onMouseDown={handleThumbMouseDown(1)}
            onKeyDown={handleKeyDown(1)}
            ariaMin={value[0]}
            ariaMax={max}
            label="End value"
          />

          <Marks marksArr={marksArr} min={min} max={max} isActive={(v) => v >= value[0] && v <= value[1]} />
        </div>
      </div>
    );
}

RangeSliderBase.displayName = "RangeSlider";
