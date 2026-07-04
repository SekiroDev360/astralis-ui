import type { ReactNode } from "react";

export interface StatProps {
  children: ReactNode;
  className?: string;
}

export interface StatLabelProps {
  children: ReactNode;
  className?: string;
}

export interface StatValueProps {
  children: ReactNode;
  className?: string;
}

export interface StatHelpTextProps {
  children: ReactNode;
  className?: string;
}

export interface StatIndicatorProps {
  type?: "increase" | "decrease";
  children?: ReactNode;
  className?: string;
}
