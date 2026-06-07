import type { StatHelpTextProps } from "../stat.types";

export function StatHelpText({
  children,
}: StatHelpTextProps) {
  return (
    <span className="astralis-text-sm astralis-text-gray-600">
      {children}
    </span>
  );
}
