"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Portal } from "../../overlay/portal";
import { astralisMerge } from "../../../utils/astralis-merge";
import { accentClass } from "../../../const/color-schemes";
import { XIcon } from "../../icon/internal-icons";
import { STATUS_ICON, STATUS_SCHEME, statusRole } from "../status";
import { getToasts, removeToast, subscribeToasts, toast } from "./toast-store";
import {
  toasterBaseClasses,
  toasterRegionClasses,
  toastPanelClasses,
  toastMotionClasses,
  toastIconClasses,
  toastTitleClasses,
  toastDescriptionClasses,
  toastActionClasses,
  toastCloseClasses,
} from "./toast.styles";
import type { ToastData, ToasterPlacement, ToasterProps } from "./toast.types";

const EXIT_DURATION = 200;

function ToastItem({ data, placement }: { data: ToastData; placement: ToasterPlacement }) {
  const { id, open, status = "info", colorScheme, title, description, duration = 5000, closable = true, action } = data;
  const StatusIcon = STATUS_ICON[status];

  // Auto-dismiss timer with pause-on-hover: on leave, the remaining time
  // re-arms rather than restarting from the full duration.
  const remainingRef = useRef(duration ?? 0);
  const startedAtRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pause = () => {
    if (timerRef.current == null) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
    remainingRef.current -= Date.now() - startedAtRef.current;
  };
  const resume = () => {
    if (duration == null || !open || timerRef.current != null) return;
    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(() => toast.dismiss(id), Math.max(0, remainingRef.current));
  };

  useEffect(() => {
    if (duration == null || !open) return;
    resume();
    return pause;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, duration, id]);

  // Enter transition: mount with the "closed" styles, flip on the next frame
  // (double-RAF guarantees the closed styles painted first — usePresence's trick).
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Remove from the store once the exit transition has played.
  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => removeToast(id), EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [open, id]);

  const visible = open && entered;

  return (
    <div
      role={statusRole(status)}
      onMouseEnter={pause}
      onMouseLeave={resume}
      className={astralisMerge(toastPanelClasses, toastMotionClasses(visible, placement), accentClass(colorScheme ?? STATUS_SCHEME[status]))}
    >
      <span aria-hidden="true" className={toastIconClasses}>
        <StatusIcon className="astralis:size-full" />
      </span>
      <div className="astralis:flex-1 astralis:min-w-0">
        <div className={toastTitleClasses}>{title}</div>
        {description && <div className={toastDescriptionClasses}>{description}</div>}
      </div>
      {action && (
        <button type="button" onClick={action.onClick} className={toastActionClasses}>
          {action.label}
        </button>
      )}
      {closable && (
        <button type="button" aria-label="Dismiss notification" onClick={() => toast.dismiss(id)} className={toastCloseClasses}>
          <XIcon className="astralis:h-4 astralis:w-4" />
        </button>
      )}
    </div>
  );
}

/**
 * The toast outlet — mount ONE near the app root (inside AstralisProvider),
 * then fire notifications from anywhere with `toast(...)`.
 */
export function Toaster({ placement = "bottom-end", max = 5 }: ToasterProps) {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts);

  // Newest toasts win the visible slots; overflow stays queued in the store.
  const visible = toasts.slice(-max);
  const ordered = placement.startsWith("top") ? [...visible].reverse() : visible;

  return (
    <Portal>
      <div
        role="region"
        aria-label="Notifications"
        className={astralisMerge("astralis", toasterBaseClasses, toasterRegionClasses[placement])}
      >
        {ordered.map((t) => (
          <ToastItem key={t.id} data={t} placement={placement} />
        ))}
      </div>
    </Portal>
  );
}
