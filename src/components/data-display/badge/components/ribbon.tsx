import type { RibbonProps } from "../badge.types";

const RIBBON_COLOR: Record<string, string> = {
  primary: "astralis-bg-primary-600",
  success: "astralis-bg-green-500",
  warning: "astralis-bg-yellow-400",
  danger: "astralis-bg-red-500",
  neutral: "astralis-bg-gray-400",
};

export function Ribbon({
  children,
  text,
  color = "primary",
  placement = "end",
  className = "",
  style,
}: RibbonProps) {
  const isCustomColor = !RIBBON_COLOR[color];
  const bgClass = isCustomColor ? "" : RIBBON_COLOR[color];
  const posClass =
    placement === "end"
      ? "astralis-right-0 astralis-top-0 astralis-origin-top-right"
      : "astralis-left-0 astralis-top-0 astralis-origin-top-left";

  return (
    <div
      className={["astralis-relative astralis-overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
      {text && (
        <div
          className={[
            "astralis-absolute astralis-z-10 astralis-text-white astralis-text-xs astralis-font-bold",
            "astralis-py-0.5 astralis-px-6 astralis-shadow-sm",
            posClass,
            bgClass,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            transform:
              placement === "end"
                ? "translate(29%, 0) rotate(45deg) translate(0, 100%)"
                : "translate(-29%, 0) rotate(-45deg) translate(0, 100%)",
            ...(isCustomColor ? { backgroundColor: color } : {}),
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

Ribbon.displayName = "Badge.Ribbon";
