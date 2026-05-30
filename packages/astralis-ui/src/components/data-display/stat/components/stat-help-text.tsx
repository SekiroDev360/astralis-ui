import type { StatHelpTextProps } from "../stat.types";

export function StatHelpText({
  children,
  className = "",
  style,
}: StatHelpTextProps) {
  return (
    <p
      className={["astralis-text-xs astralis-text-content-secondary", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </p>
  );
}
StatHelpText.displayName = "StatHelpText";
