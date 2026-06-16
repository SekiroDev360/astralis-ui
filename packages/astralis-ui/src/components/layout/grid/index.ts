import GridRoot from "./grid";
import GridItem from "./grid-item";

// 1️⃣ Compound DX API
export const Grid = Object.assign(GridRoot, {
  Item: GridItem,
});

// 2️⃣ Flat exports for tree-shaking
export { GridItem };

export default Grid;
export type { GridProps, GridItemProps } from "./grid.types";