import { PaginationRoot } from "./components/pagination-root";
import { PaginationList } from "./components/pagination-list";
import { PaginationItem } from "./components/pagination-item";
import { PaginationPages } from "./components/pagination-pages";
import { PaginationEllipsis } from "./components/pagination-ellipsis";
import { PaginationPageText } from "./components/pagination-page-text";
import { PaginationJumper } from "./components/pagination-jumper";
import {
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
} from "./components/pagination-controls";

/** Compound API — `Pagination` is the root; parts hang off it. */
export const Pagination = Object.assign(PaginationRoot, {
  List: PaginationList,
  Item: PaginationItem,
  Pages: PaginationPages,
  Ellipsis: PaginationEllipsis,
  Prev: PaginationPrev,
  Next: PaginationNext,
  First: PaginationFirst,
  Last: PaginationLast,
  PageText: PaginationPageText,
  Jumper: PaginationJumper,
});

/** Flat exports of the sub-parts only. */
export {
  PaginationList,
  PaginationItem,
  PaginationPages,
  PaginationEllipsis,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationPageText,
  PaginationJumper,
};

export type {
  PaginationProps,
  PaginationVariant,
  PaginationSize,
  PaginationRounded,
  PaginationListProps,
  PaginationItemProps,
  PaginationControlProps,
  PaginationPagesProps,
  PaginationPageTextProps,
  PaginationJumperProps,
} from "./pagination.types";
