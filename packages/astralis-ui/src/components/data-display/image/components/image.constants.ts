import type { ImageAspectRatio, ImageObjectFit, ImageRounded } from "../image.types";

export const ASPECT_RATIO_MAP: Record<ImageAspectRatio, string> = {
  square: "1 / 1",
  video: "16 / 9",
  portrait: "3 / 4",
  wide: "21 / 9",
} as const;

export const ROUNDED_MAP: Record<ImageRounded, string> = {
  none: "astralis-rounded-none",
  sm: "astralis-rounded-sm",
  md: "astralis-rounded-md",
  lg: "astralis-rounded-lg",
  xl: "astralis-rounded-xl",
  "2xl": "astralis-rounded-2xl",
  "3xl": "astralis-rounded-3xl",
  full: "astralis-rounded-full",
};

export const FIT_MAP: Record<ImageObjectFit, string> = {
  contain: "astralis-object-contain",
  cover: "astralis-object-cover",
  fill: "astralis-object-fill",
  none: "astralis-object-none",
  "scale-down": "astralis-object-scale-down",
};

export const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNkI3MjgwIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDE2LDY0SDk2YTY0LjA3LDY0LjA3LDAsMCwwLTY0LDY0VjM4NGE2NC4wNyw2NC4wNywwLDAsMCw2NCw2NEg0MTZhNjQuMDcsNjQuMDcsMCwwLDAsNjQtNjRWMTI4QTY0LjA3LDY0LjA3LDAsMCwwLDQxNiw2NFpNMzM2LDEyOGE0OCw0OCwwLDEsMSw0OCw0OEE0OC4wNSw0OC4wNSwwLDAsMSwzMzYsMTI4Wk05Niw0MTZhMzIsMzIsMCwwLDEtMzItMzJWMzE2LjM3bDk0Ljg0LTg0LjNhNDguMDYsNDguMDYsMCwwLDEsNjUuOCwxLjlsNjQuOTUsNjQuODFMMTcyLjM3LDQxNlpNNDQ4LDM4NGEzMiwzMiwwLDAsMSczMiwzMkgyMTcuNjNMMzM5LjA1LDI5NC41OGE0Ny43Miw0Ny43MiwwLDAsMSw2MS42NC0uMTZMNDQ4LDMzMy44NFoiLz48L3N2Zz4=";
