import type { ReactNode } from "react";

export type DataListOrientation = "horizontal" | "vertical";
export type DataListSize = "sm" | "md" | "lg";

export interface DataListProps {
  children: ReactNode;
  /** `horizontal` lays label + value side by side; `vertical` stacks them. @default "horizontal" */
  orientation?: DataListOrientation;
  size?: DataListSize;
  className?: string;
}

export interface DataListItemProps {
  children: ReactNode;
  className?: string;
}

export interface DataListLabelProps {
  children: ReactNode;
  className?: string;
}

export interface DataListValueProps {
  children: ReactNode;
  className?: string;
}
