import type { CSSProperties, ReactNode, HTMLAttributes } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type TagSize = "sm" | "md" | "lg";
export type TagVariant = "solid" | "subtle" | "surface" | "outline";
export type TagColorScheme = ColorScheme;

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  children?: ReactNode;
  size?: TagSize;
  variant?: TagVariant;
  /** Hue the tag paints with. @default "gray" */
  colorScheme?: TagColorScheme;
  /** Element before the label (icon, avatar…). */
  startElement?: ReactNode;
  /** Element after the label (icon…). */
  endElement?: ReactNode;
  /** Show a remove button that calls `onClose`. */
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

export interface CheckableTagProps
  extends Omit<TagProps, "variant" | "colorScheme" | "closable" | "onClose" | "onChange"> {
  /** Selected state. */
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Hue used when checked. @default "brand" */
  colorScheme?: ColorScheme;
}

export interface TagOption {
  label: ReactNode;
  value: string | number;
}

export interface CheckableTagGroupProps {
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  options: TagOption[] | (string | number)[];
  multiple?: boolean;
  size?: TagSize;
  colorScheme?: ColorScheme;
  className?: string;
  style?: CSSProperties;
}
