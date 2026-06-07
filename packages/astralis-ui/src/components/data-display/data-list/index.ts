import { DataListRoot } from "./components/data-list-root";
import { DataListItem } from "./components/data-list-item";
import { DataListLabel } from "./components/data-list-label";
import { DataListValue } from "./components/data-list-value";

/* 1️⃣ Compound API */
export const DataList = Object.assign(DataListRoot, {
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
});

/* 2️⃣ Flat exports */
export {
  DataListItem,
  DataListLabel,
  DataListValue,
};

/* 3️⃣ Types */
export type {
  DataListProps,
  DataListItemProps,
  DataListLabelProps,
  DataListValueProps,
} from "./data-list.types";
