import { BadgeRoot } from "./components/badge-root";
import { NotificationBadge } from "./components/notification-badge";
import { Ribbon } from "./components/ribbon";
import { StatusBadge } from "./components/status-badge";

export const Badge = Object.assign(BadgeRoot, {
  Notification: NotificationBadge,
  Status: StatusBadge,
  Ribbon,
});

export { BadgeRoot, NotificationBadge, StatusBadge, Ribbon };

export type {
  BadgeVariant,
  BadgeSize,
  BadgeStatus,
  BadgeProps,
  NotificationBadgeProps,
  StatusBadgeProps,
  RibbonProps,
} from "./badge.types";
