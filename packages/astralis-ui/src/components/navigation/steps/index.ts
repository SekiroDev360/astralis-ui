import { StepsRoot } from "./components/steps-root";
import { StepsList } from "./components/steps-list";
import { StepsItem } from "./components/steps-item";
import { StepsIndicator } from "./components/steps-indicator";
import { StepsContent } from "./components/steps-content";
import { StepsTitle } from "./components/steps-title";
import { StepsDescription } from "./components/steps-description";
import { StepsPanel } from "./components/steps-panel";
import { StepsSeparator } from "./components/steps-separator";
import { StepsTrigger } from "./components/steps-trigger";
import { StepsPrev } from "./components/steps-prev";
import { StepsNext } from "./components/steps-next";
import { StepsCompletedContent } from "./components/steps-completed-content";

/* 1️⃣ Compound DX API */
export const Steps = Object.assign(StepsRoot, {
  List: StepsList,
  Item: StepsItem,
  Indicator: StepsIndicator,
  Content: StepsContent,
  Title: StepsTitle,
  Description: StepsDescription,
  Panel: StepsPanel,
  Separator: StepsSeparator,
  Trigger: StepsTrigger,
  Prev: StepsPrev,
  Next: StepsNext,
  CompletedContent: StepsCompletedContent,
});

/* 2️⃣ Flat exports for tree-shaking */
export {
  StepsRoot,
  StepsList,
  StepsItem,
  StepsIndicator,
  StepsContent,
  StepsTitle,
  StepsDescription,
  StepsPanel,
  StepsSeparator,
  StepsTrigger,
  StepsPrev,
  StepsNext,
  StepsCompletedContent,
};

export type {
  StepsProps,
  StepsListProps,
  StepsItemProps,
  StepsIndicatorProps,
  StepsContentProps,
  StepsPanelProps,
  StepsSeparatorProps,
  StepsTriggerProps,
  StepsPrevProps,
  StepsNextProps,
  StepsCompletedContentProps,
} from "./steps.types";
export type { StepState } from "./steps.context";
