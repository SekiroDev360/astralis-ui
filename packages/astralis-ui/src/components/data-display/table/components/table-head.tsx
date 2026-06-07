import type { TableHeadProps } from "../table.types";

export function TableHead({ children }: TableHeadProps) {
  return (
    <th
      scope="col"
      className="astralis-px-4 astralis-py-3 astralis-text-left astralis-font-medium astralis-text-gray-600"
    >
      {children}
    </th>
  );
}
