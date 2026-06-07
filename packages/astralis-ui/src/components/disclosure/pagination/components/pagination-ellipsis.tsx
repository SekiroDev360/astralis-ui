import { usePagination } from "../pagination.context";
const sizeMap = {
  xs: "astralis-h-7 astralis-w-7 astralis-text-xs",
  sm: "astralis-h-8 astralis-w-8 astralis-text-sm",
  md: "astralis-h-9 astralis-w-9 astralis-text-sm",
  lg: "astralis-h-10 astralis-w-10 astralis-text-base",
};
export function PaginationEllipsis() {
  const { size } = usePagination();
  return (
    <li
      aria-hidden="true"
      className={[
        "astralis-inline-flex astralis-items-center astralis-justify-center",
        "astralis-text-label-muted astralis-select-none",
        sizeMap[size],
      ].join(" ")}
    >
      &hellip;
    </li>
  );
}
