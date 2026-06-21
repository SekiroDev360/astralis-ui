import { cva } from "class-variance-authority";
import { bgColors, textColors, borderColors } from "../../../const/color-mappings";
import {
  pSpacing,
  pySpacing,
  pxSpacing,
  ptSpacing,
  pbSpacing,
  plSpacing,
  prSpacing,
  mSpacing,
  mySpacing,
  mxSpacing,
  mtSpacing,
  mbSpacing,
  mlSpacing,
  mrSpacing
} from "../../../const/spacing-mappings";
import {
  hSizing,
  minHSizing,
  maxHSizing,
  wSizing,
  minWSizing,
  maxWSizing,
  inlineSizing,
  minInlineSizing,
  maxInlineSizing,
  blockSizing,
  minBlockSizing,
  maxBlockSizing,
  sizeSizing
} from "../../../const/sizing-mappings";
import {
  roundedCorners,
  roundedTCorners,
  roundedRCorners,
  roundedBCorners,
  roundedLCorners,
  roundedTlCorners,
  roundedTrCorners,
  roundedBrCorners,
  roundedBlCorners
} from "../../../const/rounded-mappings";
import {
  displayTypes,
  opacityTypes,
  zIndexTypes,
  positionTypes,
  borderWidthTypes,
  borderStyleTypes,
  shadowTypes,
  overflowTypes,
  overflowXTypes,
  overflowYTypes,
  cursorTypes,
  pointerEventsTypes,
  aspectRatioTypes
} from "../../../const/common-mappings";
import {
  insetTypes,
  topTypes,
  rightTypes,
  bottomTypes,
  leftTypes
} from "../../../const/positioning-mappings";

/**
 * Single source of truth for Box's token maps. Shared by CVA (scalar resolution
 * + typing) and the responsive engine (per-breakpoint resolution), so the two
 * never drift. Primitives are transparent by default — `bg` is opt-in.
 */
export const boxVariantMap = {
    p: pSpacing,
    py: pySpacing,
    px: pxSpacing,
    pt: ptSpacing,
    pb: pbSpacing,
    pl: plSpacing,
    pr: prSpacing,
    m: mSpacing,
    my: mySpacing,
    mx: mxSpacing,
    mt: mtSpacing,
    mb: mbSpacing,
    ml: mlSpacing,
    mr: mrSpacing,
    h: hSizing,
    minH: minHSizing,
    maxH: maxHSizing,
    w: wSizing,
    minW: minWSizing,
    maxW: maxWSizing,
    inline: inlineSizing,
    minInline: minInlineSizing,
    maxInline: maxInlineSizing,
    block: blockSizing,
    minBlock: minBlockSizing,
    maxBlock: maxBlockSizing,
    size: sizeSizing,
    display: displayTypes,
    opacity: opacityTypes,
    zIndex: zIndexTypes,
    position: positionTypes,
    inset: insetTypes,
    top: topTypes,
    right: rightTypes,
    bottom: bottomTypes,
    left: leftTypes,
    overflow: overflowTypes,
    overflowX: overflowXTypes,
    overflowY: overflowYTypes,
    cursor: cursorTypes,
    pointerEvents: pointerEventsTypes,
    aspectRatio: aspectRatioTypes,
    shadow: shadowTypes,
    border: borderWidthTypes,
    borderStyle: borderStyleTypes,
    rounded: roundedCorners,
    roundedT: roundedTCorners,
    roundedR: roundedRCorners,
    roundedB: roundedBCorners,
    roundedL: roundedLCorners,
    roundedTl: roundedTlCorners,
    roundedTr: roundedTrCorners,
    roundedBr: roundedBrCorners,
    roundedBl: roundedBlCorners,
    bg: bgColors,
    color: textColors,
    borderColor: borderColors,
} as const;

export const boxVariants = cva("", {
  variants: boxVariantMap,
  defaultVariants: {
    // Transparent by default — primitives must composite cleanly when nested.
  },
});
