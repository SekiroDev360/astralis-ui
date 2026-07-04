import { usePagination } from "../pagination.context";
import { paginationEllipsisVariants } from "../pagination.styles";

export function PaginationEllipsis() {
  const { size } = usePagination();
  return (
    <li aria-hidden="true" className={paginationEllipsisVariants({ size })}>
      &hellip;
    </li>
  );
}
