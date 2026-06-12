import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../modal.context";
import { useTheme, generateBrandShades } from "../../../../theme";
import type {
  ModalContentProps,
  ModalSize,
  ModalPlacement,
} from "../modal.types";

export function ModalContent({ children }: ModalContentProps) {
  const { open, setOpen, size, placement, titleId, descriptionId } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, tokens } = useTheme();

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement;
    
    // Body scroll locking
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Dynamic initial focus placement
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const focusables = Array.from(
        container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        container.focus();
      }
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const container = containerRef.current;
        if (!container) return;

        const focusables = Array.from(
          container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ) as HTMLElement[];

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocus?.focus();
      clearTimeout(timer);
    };
  }, [open, setOpen]);

  if (!open) return null;

  const placementClasses: Record<ModalPlacement, string> = {
    center: "astralis-items-center astralis-justify-center",
    top: "astralis-items-start astralis-justify-center astralis-pt-20",
    bottom: "astralis-items-end astralis-justify-center astralis-pb-20",
  };

  const sizeClasses: Record<ModalSize, string> = {
    xs: "astralis-w-full astralis-max-w-xs",
    sm: "astralis-w-full astralis-max-w-sm",
    md: "astralis-w-full astralis-max-w-md",
    lg: "astralis-w-full astralis-max-w-lg",
    xl: "astralis-w-full astralis-max-w-xl",
    full: "astralis-w-full astralis-h-full astralis-max-w-none astralis-rounded-none",
  };

  const tokenStyles = tokens?.brandColor
    ? generateBrandShades(tokens.brandColor)
    : undefined;

  const themeClass = `astralis ${resolvedTheme === "dark" ? "astralis-dark" : ""}`;

  return createPortal(
    <>
      <style>{`
        @keyframes astralis-scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .astralis-animate-scale-in {
          animation: astralis-scale-in 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div
        className={`astralis-fixed astralis-inset-0 astralis-z-50 astralis-flex ${placementClasses[placement]} astralis-pointer-events-none ${themeClass}`}
        style={tokenStyles}
      >
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={[
            "astralis-animate-scale-in astralis-outline-none",
            "astralis-bg-surface-base astralis-text-content-primary astralis-shadow-lg astralis-pointer-events-auto astralis-flex astralis-flex-col astralis-max-h-[90vh]",
            size === "full" ? "astralis-h-full" : "astralis-rounded-xl",
            sizeClasses[size],
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}
