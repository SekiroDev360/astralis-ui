import { MenuRoot } from "./components/menu-root";
import { MenuContent } from "./components/menu-content";
import { MenuTrigger, MenuItem, MenuLabel, MenuSeparator, MenuGroup } from "./components/menu-parts";

/**
 * An action menu (dropdown) on the APG menu-button pattern: roving focus,
 * typeahead, hover-follows-focus, Escape/outside dismissal via the shared
 * overlay stack, and anchor positioning.
 */
export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Group: MenuGroup,
});

export type {
  MenuProps,
  MenuTriggerProps,
  MenuContentProps,
  MenuItemProps,
  MenuSectionProps,
} from "./menu.types";
