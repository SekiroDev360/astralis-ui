import type { TableSectionProps } from "../table.types";

export function TableFooter({ children }: TableSectionProps) {
  return (
    <tfoot className="astralis-bg-gray-50 astralis-border-t">
      {children}
    </tfoot>
  );
}
