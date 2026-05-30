import { MarqueeItem } from "./components/marquee-item";
import { MarqueeRoot } from "./components/marquee-root";

export const Marquee = Object.assign(MarqueeRoot, {
  Item: MarqueeItem,
});

export { MarqueeRoot, MarqueeItem };

export type {
  MarqueeDirection,
  MarqueeRootProps,
  MarqueeItemProps,
} from "./marquee.types";
