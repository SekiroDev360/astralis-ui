import type { CSSProperties, ReactNode } from "react";

export type CodeVariant = "subtle" | "solid" | "outline" | "surface";

export type CodeSize = "sm" | "md" | "lg";

export type CodeColorScheme =
  | "gray"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface CodeProps {
  children: ReactNode;
  variant?: CodeVariant;
  size?: CodeSize;
  colorScheme?: CodeColorScheme;
  className?: string;
  style?: CSSProperties;
}
