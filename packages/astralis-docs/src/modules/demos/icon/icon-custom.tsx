"use client";

import { Icon } from "astralis-ui";

export function IconCustom() {
  return (
    /* A raw <svg> as children — Icon sizes and colors the wrapper. */
    <Icon size="xl" color="info">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
      </svg>
    </Icon>
  );
}
