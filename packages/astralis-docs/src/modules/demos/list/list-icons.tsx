"use client";

import { List, Icon } from "astralis-ui";
import { CircleCheck, CircleAlert, CircleX } from "lucide-react";

export function ListIcons() {
  return (
    /* styleType="none" + per-item icons — the changelog/feature-list recipe. */
    <List styleType="none" spacing="2.5">
      <List.Item icon={<Icon as={CircleCheck} size="sm" color="success" />}>
        Layout category fully documented
      </List.Item>
      <List.Item icon={<Icon as={CircleCheck} size="sm" color="success" />}>
        Typography in progress
      </List.Item>
      <List.Item icon={<Icon as={CircleAlert} size="sm" color="warning" />}>
        Overlay components waiting on rework
      </List.Item>
      <List.Item icon={<Icon as={CircleX} size="sm" color="error" />}>
        Time machine still not shipping
      </List.Item>
    </List>
  );
}
