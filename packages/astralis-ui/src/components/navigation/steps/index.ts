import { StepsRoot } from "./components/steps-root";
import { StepsList } from "./components/steps-list";
import { StepsItem } from "./components/steps-item";
import { StepsIndicator } from "./components/steps-indicator";
import { StepsTitle } from "./components/steps-title";
import { StepsDescription } from "./components/steps-description";
import { StepsContent } from "./components/steps-content";
import { StepsCompleted } from "./components/steps-completed";
import { StepsPrev } from "./components/steps-prev";
import { StepsNext } from "./components/steps-next";

/* 1️⃣ Compound DX API */
export const Steps = Object.assign(StepsRoot, {
  List: StepsList,
  Item: StepsItem,
  Indicator: StepsIndicator,
  Title: StepsTitle,
  Description: StepsDescription,
  Content: StepsContent,
  Completed: StepsCompleted,
  Prev: StepsPrev,
  Next: StepsNext,
});

/* 2️⃣ Flat exports for tree-shaking (sub-parts only — the root is `Steps` itself) */
export {
  StepsList,
  StepsItem,
  StepsIndicator,
  StepsTitle,
  StepsDescription,
  StepsContent,
  StepsCompleted,
  StepsPrev,
  StepsNext,
};

export default Steps;

export type {
  StepsProps,
  StepsListProps,
  StepsItemProps,
  StepsIndicatorProps,
  StepsTitleProps,
  StepsDescriptionProps,
  StepsContentProps,
  StepsCompletedProps,
  StepsNavProps,
} from "./steps.types";

export type {
  StepsOrientation,
  StepsVariant,
  StepsSize,
  StepsLabelPlacement,
  StepStatus,
} from "./steps.context";
