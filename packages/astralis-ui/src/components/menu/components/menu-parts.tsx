import { cloneElement, type KeyboardEvent, type MouseEvent, type ReactElement } from "react";
import { useMenu } from "../menu.context";
import type { MenuItemProps, MenuSectionProps, MenuTriggerProps } from "../menu.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import {
  menuItemClasses,
  menuItemDangerClasses,
  menuLabelClasses,
  menuSeparatorClasses,
  menuIconSlotClasses,
  menuShortcutClasses,
} from "../menu.styles";

export function MenuTrigger({ children }: MenuTriggerProps) {
  const { toggle, open, triggerRef, contentId } = useMenu();
  const child = children as ReactElement<Record<string, unknown>>;
  return cloneElement(child, {
    ref: triggerRef,
    onClick: (e: MouseEvent) => {
      (child.props.onClick as ((e: MouseEvent) => void) | undefined)?.(e);
      toggle();
    },
    // ArrowDown on a closed trigger opens the menu (APG menu-button pattern).
    onKeyDown: (e: KeyboardEvent) => {
      (child.props.onKeyDown as ((e: KeyboardEvent) => void) | undefined)?.(e);
      if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        toggle();
      }
    },
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": open ? contentId : undefined,
  } as Record<string, unknown>);
}
MenuTrigger.displayName = "Menu.Trigger";

export function MenuItem({
  onSelect,
  disabled = false,
  danger = false,
  icon,
  shortcut,
  closeOnSelect,
  className = "",
  children,
  ...rest
}: MenuItemProps) {
  const menu = useMenu();
  const shouldClose = closeOnSelect ?? menu.closeOnSelect;

  const activate = () => {
    if (disabled) return;
    onSelect?.();
    if (shouldClose) menu.close();
  };

  return (
    <div
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      data-astralis-menu-item=""
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      // Menus focus on hover so pointer and keyboard share one highlight.
      onPointerMove={(e) => {
        if (!disabled) (e.currentTarget as HTMLElement).focus();
      }}
      className={astralisMerge(menuItemClasses, danger && menuItemDangerClasses, className)}
      {...rest}
    >
      {icon && (
        <span aria-hidden="true" className={menuIconSlotClasses}>
          {icon}
        </span>
      )}
      <span className="astralis:flex-1 astralis:truncate">{children}</span>
      {shortcut && <span className={menuShortcutClasses}>{shortcut}</span>}
    </div>
  );
}
MenuItem.displayName = "Menu.Item";

export function MenuLabel({ className = "", children, ...rest }: MenuSectionProps) {
  return (
    <div className={astralisMerge(menuLabelClasses, className)} {...rest}>
      {children}
    </div>
  );
}
MenuLabel.displayName = "Menu.Label";

export function MenuSeparator({ className = "", ...rest }: MenuSectionProps) {
  return <div role="separator" aria-orientation="horizontal" className={astralisMerge(menuSeparatorClasses, className)} {...rest} />;
}
MenuSeparator.displayName = "Menu.Separator";

export function MenuGroup({ className = "", children, ...rest }: MenuSectionProps) {
  return (
    <div role="group" className={className || undefined} {...rest}>
      {children}
    </div>
  );
}
MenuGroup.displayName = "Menu.Group";
