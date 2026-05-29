import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDrawer } from "../drawer.context";
import { useTheme, getPrimaryShades } from "../../../../theme";
import type { DrawerContentProps, DrawerSize } from "../drawer.types";

export function DrawerContent({ children }: DrawerContentProps) {
  const { open, setOpen, side, size, titleId, descriptionId } = useDrawer();
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

  const themeClass = `astralis ${resolvedTheme === "dark" ? "astralis-dark" : ""}`;

  const base =
    `astralis-fixed astralis-z-50 astralis-bg-surface-base astralis-text-content-primary astralis-shadow-lg astralis-outline-none ${themeClass}`;

  // Map abstract sizes to specific Tailwind classes for width/height based on orientation
  const widthMap: Record<DrawerSize, string> = {
    xs: "astralis-w-[20rem]",
    sm: "astralis-w-[24rem]",
    md: "astralis-w-[28rem]",
    lg: "astralis-w-[32rem]",
    xl: "astralis-w-[36rem]",
    full: "astralis-w-full",
  };

  const heightMap: Record<DrawerSize, string> = {
    xs: "astralis-h-[20rem]",
    sm: "astralis-h-[24rem]",
    md: "astralis-h-[28rem]",
    lg: "astralis-h-[32rem]",
    xl: "astralis-h-[36rem]",
    full: "astralis-h-full",
  };

  const sideStyles = {
    right: `${base} astralis-right-0 astralis-top-0 astralis-h-full ${widthMap[size]} astralis-max-w-[100vw] astralis-animate-slide-in-right`,
    left: `${base} astralis-left-0 astralis-top-0 astralis-h-full ${widthMap[size]} astralis-max-w-[100vw] astralis-animate-slide-in-left`,
    bottom: `${base} astralis-bottom-0 astralis-left-0 astralis-w-full ${heightMap[size]} astralis-max-h-[100vh] astralis-animate-slide-in-bottom`,
    top: `${base} astralis-top-0 astralis-left-0 astralis-w-full ${heightMap[size]} astralis-max-h-[100vh] astralis-animate-slide-in-top`,
  };

  const tokenStyles = tokens?.primaryColor
    ? getPrimaryShades(tokens.primaryColor)
    : undefined;

  return createPortal(
    <>
      <style>{`
        @keyframes astralis-slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes astralis-slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes astralis-slide-in-bottom {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes astralis-slide-in-top {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .astralis-animate-slide-in-right {
          animation: astralis-slide-in-right 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .astralis-animate-slide-in-left {
          animation: astralis-slide-in-left 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .astralis-animate-slide-in-bottom {
          animation: astralis-slide-in-bottom 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .astralis-animate-slide-in-top {
          animation: astralis-slide-in-top 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={sideStyles[side]}
        style={tokenStyles}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}
