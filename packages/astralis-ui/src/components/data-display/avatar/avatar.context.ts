import { createContext, useContext } from "react";
import type { AvatarSize } from "./avatar.types";

export interface AvatarGroupContextValue {
  size?: AvatarSize;
  ring?: boolean;
}

export const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(
  null,
);

export function useAvatarGroupContext() {
  return useContext(AvatarGroupContext);
}
