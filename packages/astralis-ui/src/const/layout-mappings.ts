/* ==========================================================================
   ASTRALIS LAYOUT MAPPINGS (FLEXBOX, GRID, & SHARED PROPERTIES)
   ========================================================================== */

/* ==========================================================================
   1. FLEXBOX ONLY MAPPINGS
   ========================================================================== */

export const flexDirectionTypes = {
  row: "astralis:flex-row",
  column: "astralis:flex-col",
  "row-reverse": "astralis:flex-row-reverse",
  "column-reverse": "astralis:flex-col-reverse",
} as const;

export const flexWrapTypes = {
  wrap: "astralis:flex-wrap",
  nowrap: "astralis:flex-nowrap",
  "wrap-reverse": "astralis:flex-wrap-reverse",
} as const;

export const flexBasisTypes = {
  // Spacing Scale
  "0": "astralis:basis-0",
  "0.5": "astralis:basis-0.5",
  "1": "astralis:basis-1",
  "1.5": "astralis:basis-1.5",
  "2": "astralis:basis-2",
  "2.5": "astralis:basis-2.5",
  "3": "astralis:basis-3",
  "3.5": "astralis:basis-3.5",
  "4": "astralis:basis-4",
  "4.5": "astralis:basis-4.5",
  "5": "astralis:basis-5",
  "6": "astralis:basis-6",
  "7": "astralis:basis-7",
  "8": "astralis:basis-8",
  "9": "astralis:basis-9",
  "10": "astralis:basis-10",
  "11": "astralis:basis-11",
  "12": "astralis:basis-12",
  "14": "astralis:basis-14",
  "16": "astralis:basis-16",
  "20": "astralis:basis-20",
  "24": "astralis:basis-24",
  "28": "astralis:basis-28",
  "32": "astralis:basis-32",
  "36": "astralis:basis-36",
  "40": "astralis:basis-40",
  "44": "astralis:basis-44",
  "48": "astralis:basis-48",
  "52": "astralis:basis-52",
  "56": "astralis:basis-56",
  "60": "astralis:basis-60",
  "64": "astralis:basis-64",
  "72": "astralis:basis-72",
  "80": "astralis:basis-80",
  "96": "astralis:basis-96",

  // T-Shirt Scale
  "3xs": "astralis:basis-3xs",
  "2xs": "astralis:basis-2xs",
  xs: "astralis:basis-xs",
  sm: "astralis:basis-sm",
  md: "astralis:basis-md",
  lg: "astralis:basis-lg",
  xl: "astralis:basis-xl",
  "2xl": "astralis:basis-2xl",
  "3xl": "astralis:basis-3xl",
  "4xl": "astralis:basis-4xl",
  "5xl": "astralis:basis-5xl",
  "6xl": "astralis:basis-6xl",
  "7xl": "astralis:basis-7xl",
  "8xl": "astralis:basis-8xl",

  // Fractions
  "1/2": "astralis:basis-1/2",
  "1/3": "astralis:basis-1/3",
  "2/3": "astralis:basis-2/3",
  "1/4": "astralis:basis-1/4",
  "3/4": "astralis:basis-3/4",
  "1/5": "astralis:basis-1/5",
  "2/5": "astralis:basis-2/5",
  "3/5": "astralis:basis-3/5",
  "4/5": "astralis:basis-4/5",
  "1/6": "astralis:basis-1/6",
  "2/6": "astralis:basis-2/6",
  "3/6": "astralis:basis-3/6",
  "4/6": "astralis:basis-4/6",
  "5/6": "astralis:basis-5/6",
  "1/12": "astralis:basis-1/12",
  "2/12": "astralis:basis-2/12",
  "3/12": "astralis:basis-3/12",
  "4/12": "astralis:basis-4/12",
  "5/12": "astralis:basis-5/12",
  "6/12": "astralis:basis-6/12",
  "7/12": "astralis:basis-7/12",
  "8/12": "astralis:basis-8/12",
  "9/12": "astralis:basis-9/12",
  "10/12": "astralis:basis-10/12",
  "11/12": "astralis:basis-11/12",

  // Keywords
  auto: "astralis:basis-auto",
  full: "astralis:basis-full",
  min: "astralis:basis-min",
  max: "astralis:basis-max",
  fit: "astralis:basis-fit",
} as const;

export const flexTypes = {
  "1": "astralis:flex-1",
  auto: "astralis:flex-auto",
  initial: "astralis:flex-initial",
  none: "astralis:flex-none",
} as const;

export const flexGrowTypes = {
  true: "astralis:grow",
  false: "astralis:grow-0",
  "1": "astralis:grow",
  "0": "astralis:grow-0",
} as const;

export const flexShrinkTypes = {
  true: "astralis:shrink",
  false: "astralis:shrink-0",
  "1": "astralis:shrink",
  "0": "astralis:shrink-0",
} as const;

/* ==========================================================================
   2. CSS GRID ONLY MAPPINGS
   ========================================================================== */

export const gridTemplateColumns = {
  "1": "astralis:grid-cols-1",
  "2": "astralis:grid-cols-2",
  "3": "astralis:grid-cols-3",
  "4": "astralis:grid-cols-4",
  "5": "astralis:grid-cols-5",
  "6": "astralis:grid-cols-6",
  "7": "astralis:grid-cols-7",
  "8": "astralis:grid-cols-8",
  "9": "astralis:grid-cols-9",
  "10": "astralis:grid-cols-10",
  "11": "astralis:grid-cols-11",
  "12": "astralis:grid-cols-12",
  none: "astralis:grid-cols-none",
} as const;

export const gridTemplateRows = {
  "1": "astralis:grid-rows-1",
  "2": "astralis:grid-rows-2",
  "3": "astralis:grid-rows-3",
  "4": "astralis:grid-rows-4",
  "5": "astralis:grid-rows-5",
  "6": "astralis:grid-rows-6",
  none: "astralis:grid-rows-none",
} as const;

export const gridAutoFlow = {
  row: "astralis:grid-flow-row",
  col: "astralis:grid-flow-col",
  dense: "astralis:grid-flow-row-dense",
  "col-dense": "astralis:grid-flow-col-dense",
} as const;

export const gridAutoColumnsTypes = {
  auto: "astralis:auto-cols-auto",
  min: "astralis:auto-cols-min",
  max: "astralis:auto-cols-max",
  fr: "astralis:auto-cols-fr",
} as const;

export const gridAutoRowsTypes = {
  auto: "astralis:auto-rows-auto",
  min: "astralis:auto-rows-min",
  max: "astralis:auto-rows-max",
  fr: "astralis:auto-rows-fr",
} as const;

export const gridJustifyItemsTypes = {
  start: "astralis:justify-items-start",
  center: "astralis:justify-items-center",
  end: "astralis:justify-items-end",
  stretch: "astralis:justify-items-stretch",
} as const;

export const gridColSpanTypes = {
  "1": "astralis:col-span-1",
  "2": "astralis:col-span-2",
  "3": "astralis:col-span-3",
  "4": "astralis:col-span-4",
  "5": "astralis:col-span-5",
  "6": "astralis:col-span-6",
  "7": "astralis:col-span-7",
  "8": "astralis:col-span-8",
  "9": "astralis:col-span-9",
  "10": "astralis:col-span-10",
  "11": "astralis:col-span-11",
  "12": "astralis:col-span-12",
  full: "astralis:col-span-full",
} as const;

export const gridColStartTypes = {
  "1": "astralis:col-start-1",
  "2": "astralis:col-start-2",
  "3": "astralis:col-start-3",
  "4": "astralis:col-start-4",
  "5": "astralis:col-start-5",
  "6": "astralis:col-start-6",
  "7": "astralis:col-start-7",
  "8": "astralis:col-start-8",
  "9": "astralis:col-start-9",
  "10": "astralis:col-start-10",
  "11": "astralis:col-start-11",
  "12": "astralis:col-start-12",
  "13": "astralis:col-start-13",
  auto: "astralis:col-start-auto",
} as const;

export const gridColEndTypes = {
  "1": "astralis:col-end-1",
  "2": "astralis:col-end-2",
  "3": "astralis:col-end-3",
  "4": "astralis:col-end-4",
  "5": "astralis:col-end-5",
  "6": "astralis:col-end-6",
  "7": "astralis:col-end-7",
  "8": "astralis:col-end-8",
  "9": "astralis:col-end-9",
  "10": "astralis:col-end-10",
  "11": "astralis:col-end-11",
  "12": "astralis:col-end-12",
  "13": "astralis:col-end-13",
  auto: "astralis:col-end-auto",
} as const;

export const gridRowSpanTypes = {
  "1": "astralis:row-span-1",
  "2": "astralis:row-span-2",
  "3": "astralis:row-span-3",
  "4": "astralis:row-span-4",
  "5": "astralis:row-span-5",
  "6": "astralis:row-span-6",
  "7": "astralis:row-span-7",
  "8": "astralis:row-span-8",
  "9": "astralis:row-span-9",
  "10": "astralis:row-span-10",
  "11": "astralis:row-span-11",
  "12": "astralis:row-span-12",
  full: "astralis:row-span-full",
} as const;

export const gridRowStartTypes = {
  "1": "astralis:row-start-1",
  "2": "astralis:row-start-2",
  "3": "astralis:row-start-3",
  "4": "astralis:row-start-4",
  "5": "astralis:row-start-5",
  "6": "astralis:row-start-6",
  "7": "astralis:row-start-7",
  "8": "astralis:row-start-8",
  "9": "astralis:row-start-9",
  "10": "astralis:row-start-10",
  "11": "astralis:row-start-11",
  "12": "astralis:row-start-12",
  "13": "astralis:row-start-13",
  auto: "astralis:row-start-auto",
} as const;

export const gridRowEndTypes = {
  "1": "astralis:row-end-1",
  "2": "astralis:row-end-2",
  "3": "astralis:row-end-3",
  "4": "astralis:row-end-4",
  "5": "astralis:row-end-5",
  "6": "astralis:row-end-6",
  "7": "astralis:row-end-7",
  "8": "astralis:row-end-8",
  "9": "astralis:row-end-9",
  "10": "astralis:row-end-10",
  "11": "astralis:row-end-11",
  "12": "astralis:row-end-12",
  "13": "astralis:row-end-13",
  auto: "astralis:row-end-auto",
} as const;

/* ==========================================================================
   3. SHARED LAYOUT MAPPINGS (USED BY BOTH FLEX & GRID)
   ========================================================================== */

export const justifyContentTypes = {
  start: "astralis:justify-start",
  center: "astralis:justify-center",
  end: "astralis:justify-end",
  between: "astralis:justify-between",
  around: "astralis:justify-around",
  evenly: "astralis:justify-evenly",
} as const;

export const alignItemsTypes = {
  start: "astralis:items-start",
  center: "astralis:items-center",
  end: "astralis:items-end",
  baseline: "astralis:items-baseline",
  stretch: "astralis:items-stretch",
} as const;

export const alignContentTypes = {
  start: "astralis:content-start",
  center: "astralis:content-center",
  end: "astralis:content-end",
  between: "astralis:content-between",
  around: "astralis:content-around",
  evenly: "astralis:content-evenly",
  stretch: "astralis:content-stretch",
} as const;

export const placeContentTypes = {
  start: "astralis:place-content-start",
  center: "astralis:place-content-center",
  end: "astralis:place-content-end",
  between: "astralis:place-content-between",
  around: "astralis:place-content-around",
  evenly: "astralis:place-content-evenly",
  stretch: "astralis:place-content-stretch",
} as const;

export const placeItemsTypes = {
  start: "astralis:place-items-start",
  center: "astralis:place-items-center",
  end: "astralis:place-items-end",
  stretch: "astralis:place-items-stretch",
} as const;

export const alignSelfTypes = {
  auto: "astralis:self-auto",
  start: "astralis:self-start",
  end: "astralis:self-end",
  center: "astralis:self-center",
  stretch: "astralis:self-stretch",
  baseline: "astralis:self-baseline",
} as const;

export const justifySelfTypes = {
  auto: "astralis:justify-self-auto",
  start: "astralis:justify-self-start",
  end: "astralis:justify-self-end",
  center: "astralis:justify-self-center",
  stretch: "astralis:justify-self-stretch",
} as const;

export const placeSelfTypes = {
  auto: "astralis:place-self-auto",
  start: "astralis:place-self-start",
  end: "astralis:place-self-end",
  center: "astralis:place-self-center",
  stretch: "astralis:place-self-stretch",
} as const;

export const orderTypes = {
  "1": "astralis:order-1",
  "2": "astralis:order-2",
  "3": "astralis:order-3",
  "4": "astralis:order-4",
  "5": "astralis:order-5",
  "6": "astralis:order-6",
  "7": "astralis:order-7",
  "8": "astralis:order-8",
  "9": "astralis:order-9",
  "10": "astralis:order-10",
  "11": "astralis:order-11",
  "12": "astralis:order-12",
  first: "astralis:order-first",
  last: "astralis:order-last",
  none: "astralis:order-none",
} as const;

export const gapTypes = {
  "0.5": "astralis:gap-0.5",
  "1": "astralis:gap-1",
  "1.5": "astralis:gap-1.5",
  "2": "astralis:gap-2",
  "2.5": "astralis:gap-2.5",
  "3": "astralis:gap-3",
  "3.5": "astralis:gap-3.5",
  "4": "astralis:gap-4",
  "4.5": "astralis:gap-4.5",
  "5": "astralis:gap-5",
  "6": "astralis:gap-6",
  "7": "astralis:gap-7",
  "8": "astralis:gap-8",
  "9": "astralis:gap-9",
  "10": "astralis:gap-10",
  "11": "astralis:gap-11",
  "12": "astralis:gap-12",
  "14": "astralis:gap-14",
  "16": "astralis:gap-16",
  "20": "astralis:gap-20",
  "24": "astralis:gap-24",
  "28": "astralis:gap-28",
  "32": "astralis:gap-32",
  "36": "astralis:gap-36",
  "40": "astralis:gap-40",
  "44": "astralis:gap-44",
  "48": "astralis:gap-48",
  "52": "astralis:gap-52",
  "56": "astralis:gap-56",
  "60": "astralis:gap-60",
  "64": "astralis:gap-64",
  "72": "astralis:gap-72",
  "80": "astralis:gap-80",
  "96": "astralis:gap-96",
} as const;

export const rowGapTypes = {
  "0.5": "astralis:gap-y-0.5",
  "1": "astralis:gap-y-1",
  "1.5": "astralis:gap-y-1.5",
  "2": "astralis:gap-y-2",
  "2.5": "astralis:gap-y-2.5",
  "3": "astralis:gap-y-3",
  "3.5": "astralis:gap-y-3.5",
  "4": "astralis:gap-y-4",
  "4.5": "astralis:gap-y-4.5",
  "5": "astralis:gap-y-5",
  "6": "astralis:gap-y-6",
  "7": "astralis:gap-y-7",
  "8": "astralis:gap-y-8",
  "9": "astralis:gap-y-9",
  "10": "astralis:gap-y-10",
  "11": "astralis:gap-y-11",
  "12": "astralis:gap-y-12",
  "14": "astralis:gap-y-14",
  "16": "astralis:gap-y-16",
  "20": "astralis:gap-y-20",
  "24": "astralis:gap-y-24",
  "28": "astralis:gap-y-28",
  "32": "astralis:gap-y-32",
  "36": "astralis:gap-y-36",
  "40": "astralis:gap-y-40",
  "44": "astralis:gap-y-44",
  "48": "astralis:gap-y-48",
  "52": "astralis:gap-y-52",
  "56": "astralis:gap-y-56",
  "60": "astralis:gap-y-60",
  "64": "astralis:gap-y-64",
  "72": "astralis:gap-y-72",
  "80": "astralis:gap-y-80",
  "96": "astralis:gap-y-96",
} as const;

export const columnGapTypes = {
  "0.5": "astralis:gap-x-0.5",
  "1": "astralis:gap-x-1",
  "1.5": "astralis:gap-x-1.5",
  "2": "astralis:gap-x-2",
  "2.5": "astralis:gap-x-2.5",
  "3": "astralis:gap-x-3",
  "3.5": "astralis:gap-x-3.5",
  "4": "astralis:gap-x-4",
  "4.5": "astralis:gap-x-4.5",
  "5": "astralis:gap-x-5",
  "6": "astralis:gap-x-6",
  "7": "astralis:gap-x-7",
  "8": "astralis:gap-x-8",
  "9": "astralis:gap-x-9",
  "10": "astralis:gap-x-10",
  "11": "astralis:gap-x-11",
  "12": "astralis:gap-x-12",
  "14": "astralis:gap-x-14",
  "16": "astralis:gap-x-16",
  "20": "astralis:gap-x-20",
  "24": "astralis:gap-x-24",
  "28": "astralis:gap-x-28",
  "32": "astralis:gap-x-32",
  "36": "astralis:gap-x-36",
  "40": "astralis:gap-x-40",
  "44": "astralis:gap-x-44",
  "48": "astralis:gap-x-48",
  "52": "astralis:gap-x-52",
  "56": "astralis:gap-x-56",
  "60": "astralis:gap-x-60",
  "64": "astralis:gap-x-64",
  "72": "astralis:gap-x-72",
  "80": "astralis:gap-x-80",
  "96": "astralis:gap-x-96",
} as const;