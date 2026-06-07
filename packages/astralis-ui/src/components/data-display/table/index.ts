import { TableRoot } from "./components/table-root";
import { TableHeader } from "./components/table-header";
import { TableBody } from "./components/table-body";
import { TableFooter } from "./components/table-footer";
import { TableRow } from "./components/table-row";
import { TableHead } from "./components/table-head";
import { TableCell } from "./components/table-cell";

/* 1️⃣ Compound API */
export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
});

/* 2️⃣ Flat exports */
export {
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
};

/* 3️⃣ Types */
export type {
  TableProps,
  TableSectionProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from "./table.types";
