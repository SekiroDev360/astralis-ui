import { forwardRef, useEffect, useId, useRef, useState } from "react";
import type { MarqueeRootProps } from "../marquee.types";

let injected = false;

function injectKeyframes() {
  if (injected || typeof document === "undefined") return;

  injected = true;
  const style = document.createElement("style");
  style.textContent = `
@keyframes astralis-marquee-x {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes astralis-marquee-x-rev {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
@keyframes astralis-marquee-y {
  from { transform: translateY(0); }
  to   { transform: translateY(-50%); }
}
@keyframes astralis-marquee-y-rev {
  from { transform: translateY(-50%); }
  to   { transform: translateY(0); }
}
`;
  document.head.appendChild(style);
}

export const MarqueeRoot = forwardRef<HTMLDivElement, MarqueeRootProps>(
  (
    {
      direction = "left",
      speed = 50,
      gap = "1rem",
      pauseOnHover = false,
      pauseOnFocus = false,
      reverse = false,
      gradient = false,
      gradientColor,
      gradientWidth = "10%",
      loopCount = 0,
      autoFill: _autoFill = false,
      className = "",
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const uid = useId();
    const trackRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(8);
    const [paused, setPaused] = useState(false);
    const [loops, setLoops] = useState(0);

    const isVertical = direction === "up" || direction === "down";
    const isReversed = reverse || direction === "right" || direction === "down";
    const isDone = loopCount > 0 && loops >= loopCount;

    injectKeyframes();

    useEffect(() => {
      const element = trackRef.current;
      if (!element) return;

      const trackSize = isVertical
        ? element.scrollHeight / 2
        : element.scrollWidth / 2;
      setDuration(trackSize / speed);
    }, [speed, isVertical, children]);

    const animName = isVertical
      ? isReversed
        ? "astralis-marquee-y-rev"
        : "astralis-marquee-y"
      : isReversed
        ? "astralis-marquee-x-rev"
        : "astralis-marquee-x";

    const outerStyle: React.CSSProperties = {
      position: "relative",
      overflow: "hidden",
      ...(isVertical ? { display: "flex", flexDirection: "column" } : {}),
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: isVertical ? "column" : "row",
      gap,
      animation: isDone
        ? "none"
        : `${animName} ${duration}s linear ${loopCount > 0 ? loopCount : "infinite"}`,
      animationPlayState: paused ? "paused" : "running",
      willChange: "transform",
    };

    const gradColor = gradientColor ?? "var(--astralis-surface-base, #fff)";
    const gradientMaskStyle: React.CSSProperties = gradient
      ? {
          maskImage: isVertical
            ? `linear-gradient(to bottom, transparent, ${gradColor} ${gradientWidth}, ${gradColor} calc(100% - ${gradientWidth}), transparent)`
            : `linear-gradient(to right, transparent, ${gradColor} ${gradientWidth}, ${gradColor} calc(100% - ${gradientWidth}), transparent)`,
          WebkitMaskImage: isVertical
            ? `linear-gradient(to bottom, transparent, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent)`
            : `linear-gradient(to right, transparent, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent)`,
        }
      : {};

    const handleAnimationIteration = () => {
      if (loopCount > 0) {
        setLoops((value) => value + 1);
      }
    };

    return (
      <div
        ref={ref}
        id={`astralis-marquee-${uid}`}
        className={["astralis-overflow-hidden astralis-w-full", className]
          .filter(Boolean)
          .join(" ")}
        style={{ ...outerStyle, ...gradientMaskStyle }}
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
        onFocus={() => pauseOnFocus && setPaused(true)}
        onBlur={() => pauseOnFocus && setPaused(false)}
        {...rest}
      >
        <div
          ref={trackRef}
          style={trackStyle}
          onAnimationIteration={handleAnimationIteration}
          aria-hidden={isDone}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isVertical ? "column" : "row",
              gap,
              flexShrink: 0,
            }}
          >
            {children}
          </div>
          <div
            aria-hidden
            style={{
              display: "flex",
              flexDirection: isVertical ? "column" : "row",
              gap,
              flexShrink: 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

MarqueeRoot.displayName = "Marquee.Root";
