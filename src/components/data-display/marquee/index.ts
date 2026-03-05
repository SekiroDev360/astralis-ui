import { MarqueeRoot, MarqueeItem } from "./marquee";

/* Compound API */
export const Marquee = Object.assign(MarqueeRoot, {
  Item: MarqueeItem,
});

export { MarqueeRoot, MarqueeItem };
export default Marquee;

/* Types */
export type {
  MarqueeDirection,
  MarqueeRootProps,
  MarqueeItemProps,
} from "./marquee.types";
