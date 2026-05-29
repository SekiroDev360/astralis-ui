import type { ElementType } from "react";
import { resolveResponsive } from "../../../utils/responsive";
import type {
  HStackProps,
  StackProps,
  VStackProps,
  StackGap,
  StackAlign,
  StackJustify,
  StackDirection,
  StackWrap,
} from "./stack.types";

// ─── Mapping Tables ──────────────────────────────────────────────────────────

const GAP_MAP: Record<StackGap, string> = {
  0: "astralis-gap-0",
  1: "astralis-gap-1",
  2: "astralis-gap-2",
  3: "astralis-gap-3",
  4: "astralis-gap-4",
  5: "astralis-gap-5",
  6: "astralis-gap-6",
  8: "astralis-gap-8",
  10: "astralis-gap-10",
  12: "astralis-gap-12",
  16: "astralis-gap-16",
};

const ALIGN_MAP: Record<StackAlign, string> = {
  start: "astralis-items-start",
  end: "astralis-items-end",
  center: "astralis-items-center",
  stretch: "astralis-items-stretch",
  baseline: "astralis-items-baseline",
};

const JUSTIFY_MAP: Record<StackJustify, string> = {
  start: "astralis-justify-start",
  end: "astralis-justify-end",
  center: "astralis-justify-center",
  between: "astralis-justify-between",
  around: "astralis-justify-around",
  evenly: "astralis-justify-evenly",
};

const DIRECTION_MAP: Record<StackDirection, string> = {
  row: "astralis-flex-row",
  col: "astralis-flex-col",
  "row-reverse": "astralis-flex-row-reverse",
  "col-reverse": "astralis-flex-col-reverse",
};

const WRAP_MAP: Record<StackWrap, string> = {
  wrap: "astralis-flex-wrap",
  nowrap: "astralis-flex-nowrap",
  "wrap-reverse": "astralis-flex-wrap-reverse",
};

// ─── Stack ────────────────────────────────────────────────────────────────────

export function Stack<T extends ElementType = "div">({
  as,
  children,
  className = "",
  direction = "col",
  gap = 0,
  align,
  justify,
  wrap,
  ...props
}: StackProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  const classes = [
    "astralis-flex",
    resolveResponsive(direction, DIRECTION_MAP),
    resolveResponsive(gap, GAP_MAP),
    align ? resolveResponsive(align, ALIGN_MAP) : "",
    justify ? resolveResponsive(justify, JUSTIFY_MAP) : "",
    wrap ? resolveResponsive(wrap, WRAP_MAP) : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

// ─── HStack ───────────────────────────────────────────────────────────────────

export function HStack<T extends ElementType = "div">(props: HStackProps<T>) {
  return <Stack {...(props as StackProps<T>)} direction="row" />;
}

// ─── VStack ───────────────────────────────────────────────────────────────────

export function VStack<T extends ElementType = "div">(props: VStackProps<T>) {
  return <Stack {...(props as StackProps<T>)} direction="col" />;
}
