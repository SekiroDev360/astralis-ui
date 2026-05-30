export type SliderSize = "sm" | "md" | "lg";

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  /** Controlled value */
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: SliderSize;
  /** Show value tooltip on the thumb. Default true */
  showTooltip?: boolean;
  /** true = auto-marks at each step; array = custom marks */
  marks?: boolean | SliderMark[];
  disabled?: boolean;
  invalid?: boolean;
  /** Marks the slider as read-only */
  readOnly?: boolean;
  className?: string;
  id?: string;
}

export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  /** Controlled value as [start, end] */
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  size?: SliderSize;
  showTooltip?: boolean;
  marks?: boolean | SliderMark[];
  disabled?: boolean;
  invalid?: boolean;
  /** Marks the range slider as read-only */
  readOnly?: boolean;
  className?: string;
}
