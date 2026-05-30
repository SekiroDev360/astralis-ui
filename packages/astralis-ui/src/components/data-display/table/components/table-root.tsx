import { forwardRef } from "react";
import type { TableProps } from "../table.types";
import { TableContext } from "../table.context";

export const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      children,
      size = "md",
      variant = "simple",
      bordered = false,
      columnBorder = false,
      hoverable = true,
      stickyHeader = false,
      maxHeight,
      ...props
    },
    ref,
  ) => {
    const scrollStyle: React.CSSProperties =
      stickyHeader && maxHeight
        ? {
            maxHeight:
              typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
            overflowY: "auto",
          }
        : {};

    return (
      <TableContext.Provider
        value={{
          size,
          variant,
          bordered,
          columnBorder,
          hoverable,
          stickyHeader,
        }}
      >
        <div
          className={[
            "astralis-w-full astralis-overflow-x-auto",
            bordered &&
              "astralis-rounded-lg astralis-border astralis-border-border-subtle",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div style={scrollStyle} className="astralis-relative">
            <table
              ref={ref}
              className={[
                "astralis-w-full astralis-caption-bottom astralis-text-sm astralis-text-content-primary",
                className,
              ]
                .filter(Boolean)
                .join(" ")}
              {...props}
            >
              {children}
            </table>
          </div>
        </div>
      </TableContext.Provider>
    );
  },
);

TableRoot.displayName = "Table";
