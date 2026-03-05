import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type CardSize = "sm" | "md" | "lg";
export type CardVariant = "elevated" | "outline" | "filled" | "unstyled";

/* ------------------------------------------------------------------ */
/* CardRoot                                                             */
/* ------------------------------------------------------------------ */

export interface CardRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style of the card */
  variant?: CardVariant;
  /** Controls padding and border-radius */
  size?: CardSize;
  /** Lift card on hover */
  hoverable?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CardHeader                                                           */
/* ------------------------------------------------------------------ */

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Content rendered in the trailing slot (e.g. a button or link) */
  extra?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CardTitle                                                            */
/* ------------------------------------------------------------------ */

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CardDescription                                                      */
/* ------------------------------------------------------------------ */

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CardBody                                                             */
/* ------------------------------------------------------------------ */

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CardFooter                                                           */
/* ------------------------------------------------------------------ */

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
