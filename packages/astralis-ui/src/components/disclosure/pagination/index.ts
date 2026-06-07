import { PaginationRoot } from "./components/pagination-root";
import { PaginationList } from "./components/pagination-list";
import { PaginationItem } from "./components/pagination-item";
import { PaginationPages } from "./components/pagination-pages";
import { PaginationEllipsis } from "./components/pagination-ellipsis";
import {
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
} from "./components/pagination-controls";

/* 1️⃣ Compound API */
export const Pagination = Object.assign(PaginationRoot, {
  List: PaginationList,
  Item: PaginationItem,
  Prev: PaginationPrev,
  Next: PaginationNext,
  First: PaginationFirst,
  Last: PaginationLast,
  Ellipsis: PaginationEllipsis,
  Pages: PaginationPages,
});
/* 2️⃣ Flat exports */
export {
  PaginationList,
  PaginationItem,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  PaginationPages,
};
/* 3️⃣ Types */
export type {
  PaginationProps,
  PaginationVariant,
  PaginationSize,
  PaginationRounded,
  PaginationListProps,
  PaginationItemProps,
  PaginationControlProps,
  PaginationPagesProps,
} from "./pagination.types";
