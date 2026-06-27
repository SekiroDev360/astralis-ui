import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { useTabsContext } from "../tabs.context";
import { tabsListVariants, tabsIndicatorVariants } from "../tabs.styles";
import type { TabsListProps } from "../tabs.types";

/**
 * Tabs.List — the tablist. For the `line` variant it renders a single indicator
 * that slides to the active trigger (measured from the DOM, recomputed on value
 * change and on resize), giving the animated ink-bar effect.
 */
export function TabsList({ children, className, ...rest }: TabsListProps) {
  const { orientation, variant, rounded, value } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<CSSProperties>({ opacity: 0 });

  const showIndicator = variant === "line";

  useLayoutEffect(() => {
    if (!showIndicator) return;
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
      if (!active) {
        setIndicator({ opacity: 0 });
        return;
      }
      setIndicator(
        orientation === "horizontal"
          ? { opacity: 1, left: active.offsetLeft, width: active.offsetWidth }
          : { opacity: 1, top: active.offsetTop, height: active.offsetHeight },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [showIndicator, orientation, value]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      data-orientation={orientation}
      className={astralisMerge(tabsListVariants({ orientation, variant, rounded }), className)}
      {...rest}
    >
      {children}
      {showIndicator && (
        <span aria-hidden="true" style={indicator} className={tabsIndicatorVariants({ orientation })} />
      )}
    </div>
  );
}

TabsList.displayName = "Tabs.List";
