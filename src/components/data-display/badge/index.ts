import { Badge, NotificationBadge, StatusBadge, Ribbon } from "./badge";

/* Compound API */
export const BadgeCompound = Object.assign(Badge, {
  Notification: NotificationBadge,
  Status: StatusBadge,
  Ribbon: Ribbon,
});

export { Badge, NotificationBadge, StatusBadge, Ribbon };

/* Types */
export type {
  BadgeVariant,
  BadgeSize,
  BadgeStatus,
  BadgeProps,
  NotificationBadgeProps,
  StatusBadgeProps,
  RibbonProps,
} from "./badge.types";
