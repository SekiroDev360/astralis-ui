import type { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "neutral" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md";
}
