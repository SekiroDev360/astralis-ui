import type { CSSProperties, ReactNode } from "react";

export type TagSize = "sm" | "md" | "lg";
export type TagVariant = "solid" | "subtle" | "outline";
export type TagColorScheme =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "gray"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "teal"
  | "cyan"
  | "pink"
  | "orange";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  size?: TagSize;
  variant?: TagVariant;
  colorScheme?: TagColorScheme;
  /** Element to render before the label (e.g. icon or avatar) */
  startElement?: ReactNode;
  /** Element to render after the label (e.g. icon) */
  endElement?: ReactNode;
  /** Shows a close button and calls onClose when clicked */
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

export interface CheckableTagProps extends Omit<
  TagProps,
  "variant" | "colorScheme" | "closable" | "onClose" | "onChange"
> {
  /** If the tag is currently checked */
  checked?: boolean;
  /** Called with the new checked state when toggled */
  onChange?: (checked: boolean) => void;
}

export interface TagOption {
  label: ReactNode;
  value: string | number;
  [key: string]: any;
}

export interface CheckableTagGroupProps {
  /** The currently selected values (controlled array) */
  value?: (string | number)[];
  /** Called when a tag is toggled */
  onChange?: (value: (string | number)[]) => void;
  /** Options to map over */
  options: TagOption[] | (string | number)[];
  multiple?: boolean;
  size?: TagSize;
  className?: string;
  style?: CSSProperties;
}
