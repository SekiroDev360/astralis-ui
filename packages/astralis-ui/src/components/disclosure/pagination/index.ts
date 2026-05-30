import { PaginationRoot } from "./components/pagination-root";
import { PaginationList } from "./components/pagination-list";
import { PaginationItem } from "./components/pagination-item";
import { PaginationPrev } from "./components/pagination-prev";
import { PaginationNext } from "./components/pagination-next";
import { PaginationEllipsis } from "./components/pagination-ellipsis";
import { PaginationPages } from "./components/pagination-pages";

/* 1️⃣ Compound API */
export const Pagination = Object.assign(PaginationRoot, {
  List: PaginationList,
  Item: PaginationItem,
  Prev: PaginationPrev,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
  Pages: PaginationPages,
});

/* 2️⃣ Flat exports */
export {
  PaginationList,
  PaginationItem,
  PaginationPrev,
  PaginationNext,
  PaginationEllipsis,
  PaginationPages,
};

/* 3️⃣ Types */
export type {
  PaginationProps,
  PaginationListProps,
  PaginationItemProps,
  PaginationControlProps,
  PaginationPagesProps,
} from "./pagination.types";
