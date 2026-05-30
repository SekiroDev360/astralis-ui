import type { CSSProperties, ReactNode } from "react";

export type ImageObjectFit =
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down";
export type ImageRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";
export type ImageAspectRatio =
  | "square"
  | "video"
  | "portrait"
  | "wide"
  | (string & {});

export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;
  objectFit?: ImageObjectFit;
  loading?: "eager" | "lazy";
  srcset?: string;
  sizes?: string;
  /** A blurred low-res URL shown while loading, or "blur" for the default shimmer */
  placeholder?: "blur" | "empty" | string;
  rounded?: ImageRounded;
  /** Fixed aspect-ratio wrapper: "square"=1/1, "video"=16/9, "portrait"=3/4, "wide"=21/9, or any CSS ratio e.g. "4/3" */
  aspectRatio?: ImageAspectRatio;
  /** Fallback element shown when the image fails to load */
  fallback?: ReactNode;
  /** Short text shown below the image in a <figcaption> */
  caption?: ReactNode;
  /** Enables click-to-preview lightbox */
  preview?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  ariaLabel?: string;
}

export interface ImageGroupItem {
  src: string;
  alt: string;
  caption?: ReactNode;
}

export interface ImageGroupProps {
  items: ImageGroupItem[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  rounded?: ImageRounded;
  objectFit?: ImageObjectFit;
  className?: string;
  style?: CSSProperties;
}
