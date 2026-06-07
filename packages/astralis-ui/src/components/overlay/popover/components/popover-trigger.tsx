import { cloneElement, isValidElement } from "react";
import { usePopover } from "../popover.context";
import type { PopoverTriggerProps } from "../popover.types";

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const {
    setOpen,
    triggerRef,
    trigger,
    handleOpen,
    handleClose,
    open,
    triggerId,
    contentId,
  } = usePopover();

  if (!isValidElement(children)) return null;

  const props: any = {
    ref: triggerRef,
    id: triggerId,
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": contentId,
  };

  if (trigger === "click") {
    props.onClick = (e: React.MouseEvent) => {
      // If the trigger element has an onClick, we should call it
      (children.props as any).onClick?.(e);
      setOpen(!open);
    };
  } else {
    props.onMouseEnter = (e: React.MouseEvent) => {
      (children.props as any).onMouseEnter?.(e);
      handleOpen();
    };
    props.onMouseLeave = (e: React.MouseEvent) => {
      (children.props as any).onMouseLeave?.(e);
      handleClose();
    };
    props.onFocus = (e: React.FocusEvent) => {
      (children.props as any).onFocus?.(e);
      handleOpen();
    };
    props.onBlur = (e: React.FocusEvent) => {
      (children.props as any).onBlur?.(e);
      handleClose();
    };
  }

  return cloneElement(children, props);
}
