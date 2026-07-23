import type { ButtonProps } from "../button/button.types";
import type { FloatingButtonOffset, FloatingButtonPlacement } from "./floating-button.styles";

/** A dragged position, in viewport pixels from the top-left. */
export interface FloatingButtonPosition {
  x: number;
  y: number;
}

export interface FloatingButtonProps extends Omit<ButtonProps, "fullWidth"> {
  /**
   * Corner the button rests in until it is dragged.
   * @default "bottom-right"
   */
  placement?: FloatingButtonPlacement;
  /**
   * Distance from the viewport edges at rest.
   * @default "md"
   */
  offset?: FloatingButtonOffset;
  /**
   * Allow repositioning by dragging. Disable for a button that must stay put.
   * @default true
   */
  draggable?: boolean;
  /**
   * Controlled position. Pass with `onPositionChange` to own the position
   * yourself; omit to let the button track it internally.
   */
  position?: FloatingButtonPosition | null;
  /** Fires on every drag frame, and on keyboard repositioning. */
  onPositionChange?: (position: FloatingButtonPosition) => void;
  /** Fires once when a drag ends — the right hook for persisting a position. */
  onPositionCommit?: (position: FloatingButtonPosition) => void;
  /**
   * Keeps the button fully inside the viewport, leaving this much clearance.
   * @default 8
   */
  edgePadding?: number;
  /**
   * Pointer travel (px) before a press becomes a drag. Below it the gesture is
   * still a click, so a shaky tap does not swallow the action.
   * @default 4
   */
  dragThreshold?: number;
  /** Class for the fixed wrapper; `className` still targets the button. */
  wrapperClassName?: string;
}

export type { FloatingButtonPlacement, FloatingButtonOffset };
