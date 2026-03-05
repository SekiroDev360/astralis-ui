import { StatRoot } from "./components/stat-root";
import { StatLabel } from "./components/stat-label";
import { StatValue } from "./components/stat-value";
import { StatHelpText } from "./components/stat-help-text";
import { StatIndicator } from "./components/stat-indicator";
import { StatTrend } from "./components/stat-trend";
import { StatProgress } from "./components/stat-progress";
import { StatIcon } from "./components/stat-icon";
import { StatCountdown } from "./components/stat-countdown";

/* Compound API */
export const Stat = Object.assign(StatRoot, {
  Label: StatLabel,
  Value: StatValue,
  HelpText: StatHelpText,
  Indicator: StatIndicator,
  Trend: StatTrend,
  Progress: StatProgress,
  Icon: StatIcon,
  Countdown: StatCountdown,
});

/* Flat exports */
export {
  StatRoot,
  StatLabel,
  StatValue,
  StatHelpText,
  StatIndicator,
  StatTrend,
  StatProgress,
  StatIcon,
  StatCountdown,
};

/* Types */
export type {
  StatSize,
  StatTrendType,
  StatProps,
  StatLabelProps,
  StatValueProps,
  StatHelpTextProps,
  StatTrendProps,
  StatProgressProps,
  StatIconProps,
  StatCountdownProps,
  StatIndicatorProps,
} from "./stat.types";
