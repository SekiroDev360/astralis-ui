import { TableRoot } from "./components/table-root";
import { TableHeader } from "./components/table-header";
import { TableBody } from "./components/table-body";
import { TableFooter } from "./components/table-footer";
import { TableRow } from "./components/table-row";
import { TableHead } from "./components/table-head";
import { TableCell } from "./components/table-cell";
import { TableCaption } from "./components/table-caption";

/** Compound API — `Table` is the root; parts hang off it. */
export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});

export { TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };

export type {
  TableProps,
  TableVariant,
  TableSize,
  TableSectionProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from "./table.types";
