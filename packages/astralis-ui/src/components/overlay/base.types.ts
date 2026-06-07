import type { ReactNode } from "react";

/**
 * Base props shared by all overlay components (Modal, Drawer, etc.).
 * Individual overlay types extend this interface.
 */
export interface OverlayBaseProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Callback fired after the open/close animation fully completes.
   * Useful for resetting form state, stopping video, analytics events, etc.
   */
  afterOpenChange?: (open: boolean) => void;
  /** Close the overlay when Escape is pressed. @default true */
  closeOnEsc?: boolean;
  /**
   * Close the overlay when the backdrop/overlay is clicked.
   * Provides root-level control without needing to configure the Overlay sub-component.
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * When `false` (default), children stay mounted between open/close cycles,
   * preserving form state, scroll position, video playback, etc.
   * When `true`, children are unmounted every time the overlay closes.
   * @default false
   */
  destroyOnClose?: boolean;
  children: ReactNode;
}
