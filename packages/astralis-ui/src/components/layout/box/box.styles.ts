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
  borderStyleTypes
} from "../../../const/common-mappings";

export const boxVariants = cva("astralis:bg-surface-base", {
  variants: {
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
  },
  defaultVariants: {
    // borderStyle: "solid"
  }
});
