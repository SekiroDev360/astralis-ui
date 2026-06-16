import FlexRoot from "./flex";
import FlexItem from "./flex-item";

// 1️⃣ Compound DX API
export const Flex = Object.assign(FlexRoot, {
  Item: FlexItem,
});

// 2️⃣ Flat exports for tree-shaking
export { FlexItem };

export default Flex;
export type { FlexProps, FlexItemProps } from "./flex.types";