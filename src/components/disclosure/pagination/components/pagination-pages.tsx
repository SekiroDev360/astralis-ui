import { usePagination } from "../pagination.context";
import { PaginationItem } from "./pagination-item";
import { PaginationEllipsis } from "./pagination-ellipsis";
import type { PaginationPagesProps } from "../pagination.types";

export function PaginationPages({ siblings = 1 }: PaginationPagesProps) {
  const { page, totalPages } = usePagination();

  // Always show first, last, active page, and surrounding siblings
  const totalNumbers = siblings * 2 + 5; // siblings + active page + first + last + 2 ellipses

  // If pages are few, display all of them directly
  if (totalPages <= totalNumbers - 2) {
    return (
      <>
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber} page={pageNumber}>
              {pageNumber}
            </PaginationItem>
          );
        })}
      </>
    );
  }

  const leftSiblingIndex = Math.max(page - siblings, 1);
  const rightSiblingIndex = Math.min(page + siblings, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 1: No left ellipsis, only right ellipsis (e.g. 1 2 3 4 ... 10)
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);

    return (
      <>
        {leftRange.map((num) => (
          <PaginationItem key={num} page={num}>
            {num}
          </PaginationItem>
        ))}
        <PaginationEllipsis />
        <PaginationItem page={lastPageIndex}>{lastPageIndex}</PaginationItem>
      </>
    );
  }

  // Case 2: Left ellipsis, no right ellipsis (e.g. 1 ... 7 8 9 10)
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);

    return (
      <>
        <PaginationItem page={firstPageIndex}>{firstPageIndex}</PaginationItem>
        <PaginationEllipsis />
        {rightRange.map((num) => (
          <PaginationItem key={num} page={num}>
            {num}
          </PaginationItem>
        ))}
      </>
    );
  }

  // Case 3: Both left and right ellipses (e.g. 1 ... 4 [5] 6 ... 10)
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );

  return (
    <>
      <PaginationItem page={firstPageIndex}>{firstPageIndex}</PaginationItem>
      <PaginationEllipsis />
      {middleRange.map((num) => (
        <PaginationItem key={num} page={num}>
          {num}
        </PaginationItem>
      ))}
      <PaginationEllipsis />
      <PaginationItem page={lastPageIndex}>{lastPageIndex}</PaginationItem>
    </>
  );
}
