import type { AspectRatioProps } from "./aspect-ratio.types";

export function AspectRatio({
  ratio = 1,
  children,
  className = "",
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      className={[
        "astralis-relative astralis-w-full astralis-overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ aspectRatio: String(ratio), ...style }}
      {...props}
    >
      <div className="astralis-absolute astralis-inset-0">{children}</div>
    </div>
  );
}
