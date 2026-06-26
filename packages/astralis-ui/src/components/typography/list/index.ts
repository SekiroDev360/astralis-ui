import ListRoot from "./list";
import ListItem from "./list-item";

// 1️⃣ Compound DX API
export const List = Object.assign(ListRoot, {
  Item: ListItem,
});

// 2️⃣ Flat exports for tree-shaking
export { ListItem };

export default List;
export type { ListProps, ListItemProps } from "./list.types";
