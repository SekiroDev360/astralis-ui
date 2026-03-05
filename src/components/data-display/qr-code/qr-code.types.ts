import type { CSSProperties, ReactNode } from "react";

export type QrCodeSize = "sm" | "md" | "lg" | "xl";
export type QrCodeErrorLevel = "L" | "M" | "Q" | "H";
export type QrCodeStatus = "active" | "loading" | "expired" | "scanned";

/* ------------------------------------------------------------------ */
/* QrCodeRoot                                                           */
/* ------------------------------------------------------------------ */

export interface QrCodeRootProps {
  /** The string value to encode in the QR code */
  value: string;
  /** Preset size */
  size?: QrCodeSize;
  /** Explicit pixel size (overrides `size`) */
  pixelSize?: number;
  /** Error correction level */
  errorLevel?: QrCodeErrorLevel;
  /** Foreground / dot colour */
  color?: string;
  /** Background colour */
  bgColor?: string;
  /** A node to render as an overlay in the centre (e.g. a logo) */
  overlay?: ReactNode;
  /** Size of the overlay as a percentage of the QR code total size (default 20) */
  overlaySize?: number;
  /** Status overlay to display over the QR code */
  status?: QrCodeStatus;
  /** Called when the user clicks "Refresh" on an expired code */
  onRefresh?: () => void;
  /** Render a download button below the QR code */
  downloadable?: boolean;
  /** File name for the downloaded SVG (without extension) */
  downloadFileName?: string;
  className?: string;
  style?: CSSProperties;
}
