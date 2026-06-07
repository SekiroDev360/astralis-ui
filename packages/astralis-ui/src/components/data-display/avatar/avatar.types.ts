import type { ReactNode } from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
}
