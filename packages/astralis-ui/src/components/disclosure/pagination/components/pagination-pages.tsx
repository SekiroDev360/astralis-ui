import { usePagination } from "../pagination.context";
import { PaginationItem } from "./pagination-item";
import { PaginationEllipsis } from "./pagination-ellipsis";
import type { PaginationPagesProps } from "../pagination.types";

/**
 * Renders the page-number buttons with ellipses — `boundaryCount` pages pinned
 * at each end and `siblings` pages on each side of the current page (the MUI model).
 */
export function PaginationPages({ siblings = 1, boundaryCount = 1 }: PaginationPagesProps) {
  const { page, totalPages } = usePagination();

  const startBoundary = Array.from({ length: Math.min(boundaryCount, totalPages) }, (_, i) => i + 1);
  const endBoundary = Array.from(
    { length: Math.min(boundaryCount, totalPages) },
    (_, i) => totalPages - boundaryCount + i + 1,
  ).filter((p) => p > boundaryCount);

  const siblingStart = Math.max(page - siblings, boundaryCount + 1);
  const siblingEnd = Math.min(page + siblings, totalPages - boundaryCount);
  const middleRange = Array.from(
    { length: Math.max(0, siblingEnd - siblingStart + 1) },
    (_, i) => siblingStart + i,
  );

  const showLeftEllipsis = siblingStart > boundaryCount + 1;
  const showRightEllipsis = siblingEnd < totalPages - boundaryCount - 1;

  const renderItems = (pages: number[]) =>
    pages.map((num) => (
      <PaginationItem key={num} page={num}>
        {num}
      </PaginationItem>
    ));

  // When everything fits, skip ellipses and render every page.
  const needsEllipsis = totalPages > boundaryCount * 2 + siblings * 2 + 3;
  if (!needsEllipsis) {
    return <>{renderItems(Array.from({ length: totalPages }, (_, i) => i + 1))}</>;
  }

  return (
    <>
      {renderItems(startBoundary)}
      {showLeftEllipsis && <PaginationEllipsis />}
      {renderItems(middleRange)}
      {showRightEllipsis && <PaginationEllipsis />}
      {renderItems(endBoundary)}
    </>
  );
}
