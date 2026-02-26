import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFieldContext } from "../../field/field.context";
import type {
  RangeSliderProps,
  SliderMark,
  SliderProps,
  SliderSize,
} from "../slider.types";

// ── Shared util ────────────────────────────────────────────────────────────────

function toPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

function calcValue(
  clientX: number,
  trackEl: HTMLElement,
  min: number,
  max: number,
  step: number,
): number {
  const { left, width } = trackEl.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientX - left) / width));
  const raw = min + pct * (max - min);
  const stepped = Math.round(raw / step) * step;
  const precision = String(step).includes(".")
    ? String(step).split(".")[1].length
    : 0;
  return parseFloat(Math.max(min, Math.min(max, stepped)).toFixed(precision));
}

function buildMarks(
  marks: boolean | SliderMark[] | undefined,
  min: number,
  max: number,
  step: number,
): SliderMark[] {
  if (!marks) return [];
  if (marks === true) {
    const count = Math.round((max - min) / step);
    if (count > 20) return [{ value: min }, { value: max }];
    return Array.from({ length: count + 1 }, (_, i) => ({
      value: min + i * step,
    }));
  }
  return marks;
}

// ── Size maps ──────────────────────────────────────────────────────────────────

const trackH: Record<SliderSize, string> = {
  sm: "astralis-h-1",
  md: "astralis-h-1.5",
  lg: "astralis-h-2",
};

const thumbSize: Record<SliderSize, string> = {
  sm: "astralis-h-3.5 astralis-w-3.5",
  md: "astralis-h-5 astralis-w-5",
  lg: "astralis-h-6 astralis-w-6",
};

// ── Tooltip ────────────────────────────────────────────────────────────────────

function Tooltip({ value, visible }: { value: number; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      aria-hidden="true"
      className="astralis-absolute astralis-bottom-full astralis-left-1/2 -astralis-translate-x-1/2 astralis-mb-2 astralis-pointer-events-none"
    >
      <div className="astralis-rounded astralis-bg-content-primary astralis-px-1.5 astralis-py-0.5 astralis-text-xs astralis-font-medium astralis-text-surface-base astralis-whitespace-nowrap astralis-shadow-sm">
        {value}
        {/* Arrow */}
        <div className="astralis-absolute astralis-top-full astralis-left-1/2 -astralis-translate-x-1/2 astralis-border-4 astralis-border-transparent astralis-border-t-content-primary" />
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
  showTooltip,
  onMouseDown,
  onKeyDown,
  ariaMin,
  ariaMax,
  label,
}: {
  percent: number;
  value: number;
  size: SliderSize;
  isInvalid?: boolean;
  isDisabled?: boolean;
  showTooltip: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ariaMin: number;
  ariaMax: number;
  label?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
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
      style={{ left: `${percent}%` }}
      className={[
        "astralis-absolute astralis-top-1/2 -astralis-translate-x-1/2 -astralis-translate-y-1/2",
        "astralis-rounded-full astralis-border-2 astralis-bg-white astralis-shadow-md",
        "astralis-transition-shadow astralis-duration-100",
        "focus:astralis-outline-none focus:astralis-ring-2 focus:astralis-ring-offset-1",
        thumbSize[size],
        isInvalid
          ? "astralis-border-error-500 focus:astralis-ring-error-300"
          : "astralis-border-primary-500 focus:astralis-ring-primary-300",
        isDisabled
          ? "astralis-cursor-not-allowed astralis-border-border-strong"
          : "astralis-cursor-grab active:astralis-cursor-grabbing hover:astralis-shadow-lg",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseDown={handleMouseDown}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip value={value} visible={showTip} />
    </div>
  );
}

// ── Slider (single thumb) ──────────────────────────────────────────────────────

export const SliderBase = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value: valueProp,
      defaultValue = 0,
      onChange,
      size = "md",
      showTooltip = true,
      marks,
      disabled: disabledProp,
      invalid: invalidProp,
      className = "",
      id: idProp,
    },
    ref,
  ) => {
    const field = useFieldContext();
    const isDisabled = disabledProp ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const id = idProp ?? field?.id;

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = isControlled ? valueProp! : internalValue;

    const trackRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    // Keep latest callbacks / params in refs to avoid stale closures in listeners
    const paramsRef = useRef({ min, max, step, isControlled, isDisabled });
    useEffect(() => {
      paramsRef.current = { min, max, step, isControlled, isDisabled };
    });
    const onChangeRef = useRef(onChange);
    useEffect(() => {
      onChangeRef.current = onChange;
    });
    const setValueRef = useRef(setInternalValue);

    const applyClientX = useCallback((clientX: number) => {
      if (!trackRef.current || paramsRef.current.isDisabled) return;
      const { min, max, step, isControlled } = paramsRef.current;
      const v = calcValue(clientX, trackRef.current, min, max, step);
      if (!isControlled) setValueRef.current(v);
      onChangeRef.current?.(v);
    }, []);

    // Global mouse/touch move while dragging
    useEffect(() => {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        if (!isDraggingRef.current) return;
        const clientX =
          "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
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

    const handleTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      isDraggingRef.current = true;
      applyClientX(e.clientX);
    };

    const handleThumbMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDisabled) return;
      isDraggingRef.current = true;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled) return;
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
    const marksArr = useMemo(
      () => buildMarks(marks, min, max, step),
      [marks, min, max, step],
    );
    const hasLabels = marksArr.some((m) => m.label);

    return (
      <div
        ref={ref}
        id={id}
        className={[
          "astralis-relative astralis-w-full astralis-select-none",
          hasLabels ? "astralis-mb-6" : "",
          isDisabled ? "astralis-opacity-50" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Track */}
        <div
          ref={trackRef}
          onMouseDown={handleTrackMouseDown}
          className={[
            "astralis-relative astralis-w-full astralis-rounded-full astralis-cursor-pointer",
            "astralis-bg-surface-raised",
            trackH[size],
          ].join(" ")}
        >
          {/* Fill */}
          <div
            aria-hidden="true"
            style={{ width: `${pct}%` }}
            className={[
              "astralis-absolute astralis-inset-y-0 astralis-left-0 astralis-rounded-full",
              isInvalid ? "astralis-bg-error-400" : "astralis-bg-primary-500",
            ].join(" ")}
          />

          {/* Thumb */}
          <Thumb
            percent={pct}
            value={value}
            size={size}
            isInvalid={!!isInvalid}
            isDisabled={!!isDisabled}
            showTooltip={showTooltip}
            onMouseDown={handleThumbMouseDown}
            onKeyDown={handleKeyDown}
            ariaMin={min}
            ariaMax={max}
          />

          {/* Marks */}
          {marksArr.map((mark) => {
            const mPct = toPercent(mark.value, min, max);
            const isActive = mark.value <= value;
            return (
              <div
                key={mark.value}
                aria-hidden="true"
                style={{ left: `${mPct}%` }}
                className="astralis-absolute astralis-top-1/2 -astralis-translate-x-1/2 -astralis-translate-y-1/2"
              >
                <div
                  className={[
                    "astralis-h-1.5 astralis-w-1.5 astralis-rounded-full astralis-border",
                    isActive
                      ? "astralis-bg-primary-500 astralis-border-primary-500"
                      : "astralis-bg-surface-base astralis-border-border-strong",
                  ].join(" ")}
                />
                {mark.label && (
                  <span className="astralis-absolute astralis-top-3 astralis-left-1/2 -astralis-translate-x-1/2 astralis-text-xs astralis-text-content-secondary astralis-whitespace-nowrap">
                    {mark.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

SliderBase.displayName = "Slider";

// ── RangeSlider (dual thumb) ───────────────────────────────────────────────────

export const RangeSliderBase = forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value: valueProp,
      defaultValue = [20, 80],
      onChange,
      size = "md",
      showTooltip = true,
      marks,
      disabled: disabledProp,
      invalid: invalidProp,
      className = "",
    },
    ref,
  ) => {
    const field = useFieldContext();
    const isDisabled = disabledProp ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] =
      useState<[number, number]>(defaultValue);
    const value = isControlled ? valueProp! : internalValue;

    const trackRef = useRef<HTMLDivElement>(null);
    // Which thumb is being dragged: 0 = start, 1 = end, -1 = none
    const draggingThumbRef = useRef<0 | 1 | -1>(-1);

    const paramsRef = useRef({
      min,
      max,
      step,
      isControlled,
      isDisabled,
      value,
    });
    useEffect(() => {
      paramsRef.current = { min, max, step, isControlled, isDisabled, value };
    });
    const onChangeRef = useRef(onChange);
    useEffect(() => {
      onChangeRef.current = onChange;
    });

    const applyClientX = useCallback((clientX: number) => {
      if (!trackRef.current || paramsRef.current.isDisabled) return;
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
        const clientX =
          "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
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

    // Track click → move nearest thumb
    const handleTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || !trackRef.current) return;
      const clickV = calcValue(e.clientX, trackRef.current, min, max, step);
      const distA = Math.abs(clickV - value[0]);
      const distB = Math.abs(clickV - value[1]);
      draggingThumbRef.current = distA <= distB ? 0 : 1;
      applyClientX(e.clientX);
    };

    const handleThumbMouseDown = (thumb: 0 | 1) => (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDisabled) return;
      draggingThumbRef.current = thumb;
    };

    const handleKeyDown = (thumb: 0 | 1) => (e: React.KeyboardEvent) => {
      if (isDisabled) return;
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
        thumb === 0
          ? [Math.min(next, value[1] - step), value[1]]
          : [value[0], Math.max(next, value[0] + step)];
      if (!isControlled) setInternalValue(newRange);
      onChange?.(newRange);
    };

    const pctA = toPercent(value[0], min, max);
    const pctB = toPercent(value[1], min, max);
    const marksArr = useMemo(
      () => buildMarks(marks, min, max, step),
      [marks, min, max, step],
    );
    const hasLabels = marksArr.some((m) => m.label);

    return (
      <div
        ref={ref}
        className={[
          "astralis-relative astralis-w-full astralis-select-none",
          hasLabels ? "astralis-mb-6" : "",
          isDisabled ? "astralis-opacity-50" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          ref={trackRef}
          onMouseDown={handleTrackMouseDown}
          className={[
            "astralis-relative astralis-w-full astralis-rounded-full astralis-cursor-pointer astralis-bg-surface-raised",
            trackH[size],
          ].join(" ")}
        >
          {/* Fill between thumbs */}
          <div
            aria-hidden="true"
            style={{ left: `${pctA}%`, width: `${pctB - pctA}%` }}
            className={[
              "astralis-absolute astralis-inset-y-0 astralis-rounded-full",
              isInvalid ? "astralis-bg-error-400" : "astralis-bg-primary-500",
            ].join(" ")}
          />

          {/* Start thumb */}
          <Thumb
            percent={pctA}
            value={value[0]}
            size={size}
            isInvalid={!!isInvalid}
            isDisabled={!!isDisabled}
            showTooltip={showTooltip}
            onMouseDown={handleThumbMouseDown(0)}
            onKeyDown={handleKeyDown(0)}
            ariaMin={min}
            ariaMax={value[1]}
            label="Start value"
          />

          {/* End thumb */}
          <Thumb
            percent={pctB}
            value={value[1]}
            size={size}
            isInvalid={!!isInvalid}
            isDisabled={!!isDisabled}
            showTooltip={showTooltip}
            onMouseDown={handleThumbMouseDown(1)}
            onKeyDown={handleKeyDown(1)}
            ariaMin={value[0]}
            ariaMax={max}
            label="End value"
          />

          {/* Marks */}
          {marksArr.map((mark) => {
            const mPct = toPercent(mark.value, min, max);
            const isActive = mark.value >= value[0] && mark.value <= value[1];
            return (
              <div
                key={mark.value}
                aria-hidden="true"
                style={{ left: `${mPct}%` }}
                className="astralis-absolute astralis-top-1/2 -astralis-translate-x-1/2 -astralis-translate-y-1/2"
              >
                <div
                  className={[
                    "astralis-h-1.5 astralis-w-1.5 astralis-rounded-full astralis-border",
                    isActive
                      ? "astralis-bg-primary-500 astralis-border-primary-500"
                      : "astralis-bg-surface-base astralis-border-border-strong",
                  ].join(" ")}
                />
                {mark.label && (
                  <span className="astralis-absolute astralis-top-3 astralis-left-1/2 -astralis-translate-x-1/2 astralis-text-xs astralis-text-content-secondary astralis-whitespace-nowrap">
                    {mark.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

RangeSliderBase.displayName = "RangeSlider";
