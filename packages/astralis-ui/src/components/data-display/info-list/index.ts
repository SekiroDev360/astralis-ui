import { InfoListRoot } from "./components/info-list-root";
import { InfoListItem } from "./components/info-list-item";
import { InfoListLabel } from "./components/info-list-label";
import { InfoListValue } from "./components/info-list-value";

/* 1️⃣ Compound API */
export const InfoList = Object.assign(InfoListRoot, {
  Item: InfoListItem,
  Label: InfoListLabel,
  Value: InfoListValue,
});

/* 2️⃣ Flat exports */
export {
  InfoListItem,
  InfoListLabel,
  InfoListValue,
};

/* 3️⃣ Types */
export type {
  InfoListProps,
  InfoListItemProps,
  InfoListLabelProps,
  InfoListValueProps,
} from "./info-list.types";
