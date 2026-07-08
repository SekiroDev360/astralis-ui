import {
  Children,
  Fragment,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { astralisMerge } from "../../../utils/astralis-merge";
import { ChevronRightIcon } from "../../icon/internal-icons";

/* ---------------------------------- Root --------------------------------- */

export interface BreadcrumbProps extends ComponentPropsWithoutRef<"nav"> {
  /** Glyph between items. @default chevron */
  separator?: ReactNode;
  children: ReactNode;
}

function BreadcrumbRoot({
  separator,
  className = "",
  children,
  ref,
  ...rest
}: BreadcrumbProps & { ref?: Ref<HTMLElement> }) {
    const items = Children.toArray(children).filter(isValidElement);
    const glyph = separator ?? <ChevronRightIcon className="astralis:h-3.5 astralis:w-3.5" />;

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={astralisMerge("astralis:text-sm", className)} {...rest}>
        <ol className="astralis:flex astralis:flex-wrap astralis:items-center astralis:gap-1.5">
          {items.map((child, index) => (
            <Fragment key={index}>
              {child}
              {index < items.length - 1 && (
                <li aria-hidden="true" className="astralis:flex astralis:items-center astralis:text-label-subtle">
                  {glyph}
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </nav>
    );
}

BreadcrumbRoot.displayName = "Breadcrumb";

/* ---------------------------------- Item --------------------------------- */

export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<"li"> {
  children: ReactNode;
}

function BreadcrumbItem({ className = "", children, ...rest }: BreadcrumbItemProps) {
  return (
    <li className={astralisMerge("astralis:inline-flex astralis:items-center astralis:gap-1.5", className)} {...rest}>
      {children}
    </li>
  );
}
BreadcrumbItem.displayName = "Breadcrumb.Item";

/* ---------------------------------- Link --------------------------------- */

export type BreadcrumbLinkProps<T extends ElementType = "a"> = {
  /** Render as a router link component (e.g. Next's `Link`). */
  as?: T;
  /** Marks the current page: renders non-interactive with `aria-current="page"`. */
  isCurrent?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

function BreadcrumbLink<T extends ElementType = "a">({
  as,
  isCurrent = false,
  className = "",
  children,
  ...rest
}: BreadcrumbLinkProps<T>) {
  if (isCurrent) {
    return (
      <span aria-current="page" className={astralisMerge("astralis:font-medium astralis:text-label-base", className)}>
        {children}
      </span>
    );
  }

  const Element = (as || "a") as ElementType;
  return (
    <Element
      className={astralisMerge(
        "astralis:text-label-muted astralis:transition-colors astralis:hover:text-label-base " +
          "astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-brand-ring astralis:rounded-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </Element>
  );
}
BreadcrumbLink.displayName = "Breadcrumb.Link";

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
});
