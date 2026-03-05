import { DataListRoot } from "./components/data-list-root";
import { DataListItem } from "./components/data-list-item";
import { DataListLabel } from "./components/data-list-label";
import { DataListValue } from "./components/data-list-value";

/* Compound API */
export const DataList = Object.assign(DataListRoot, {
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
});

/* Flat exports */
export { DataListItem, DataListLabel, DataListValue };

/* Types */
export type {
  DataListSize,
  DataListVariant,
  DataListOrientation,
  DataListProps,
  DataListItemProps,
  DataListLabelProps,
  DataListValueProps,
} from "./data-list.types";
