import { StepsRoot } from "./components/steps-root";
import { StepsList } from "./components/steps-list";
import { StepsItem } from "./components/steps-item";
import { StepsIndicator } from "./components/steps-indicator";
import { StepsContent } from "./components/steps-content";
import { StepsTitle } from "./components/steps-title";
import { StepsDescription } from "./components/steps-description";

/* 1️⃣ Compound DX API */
export const Steps = Object.assign(StepsRoot, {
  List: StepsList,
  Item: StepsItem,
  Indicator: StepsIndicator,
  Content: StepsContent,
  Title: StepsTitle,
  Description: StepsDescription,
});

/* 2️⃣ Flat exports */
export {
  StepsList,
  StepsItem,
  StepsIndicator,
  StepsContent,
  StepsTitle,
  StepsDescription,
};

export type {
  StepsProps,
  StepsListProps,
  StepsItemProps,
  StepsIndicatorProps,
  StepsContentProps,
} from "./steps.types";
