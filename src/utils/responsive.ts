export type ResponsiveProp<Value> =
  | Value
  | Partial<Record<"base" | "sm" | "md" | "lg" | "xl", Value>>;

export function resolveResponsive<Value extends string | number>(
  prop: ResponsiveProp<Value> | undefined,
  map: Record<Value, string>,
): string {
  if (prop === undefined || prop === null) return "";
  if (typeof prop === "object") {
    return Object.entries(prop)
      .map(([bp, val]) => {
        const cls = map[val as Value];
        if (!cls) return "";
        return bp === "base" ? cls : `${bp}:${cls}`;
      })
      .filter(Boolean)
      .join(" ");
  }
  return map[prop as Value] ?? "";
}
