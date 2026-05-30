import { TableRoot } from "./components/table-root";
import { TableHeader } from "./components/table-header";
import { TableBody } from "./components/table-body";
import { TableFooter } from "./components/table-footer";
import { TableRow } from "./components/table-row";
import { TableHead } from "./components/table-head";
import { TableCell } from "./components/table-cell";
import { TableCaption } from "./components/table-caption";
import { TableExpandedRow } from "./components/table-expanded-row";

/* 1️⃣ Compound API */
export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
  ExpandedRow: TableExpandedRow,
});

/* 2️⃣ Flat exports */
export {
  TableRoot as TableBase,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableExpandedRow,
};

/* 3️⃣ Types */
export type {
  TableProps,
  TableSectionProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
  TableExpandedRowProps,
  TableSize,
  TableVariant,
} from "./table.types";
