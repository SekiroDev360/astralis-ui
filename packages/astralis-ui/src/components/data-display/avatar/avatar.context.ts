import { createContext, useContext } from "react";
import type { AvatarSize, AvatarShape } from "./avatar.types";

export interface AvatarGroupContextValue {
  size?: AvatarSize;
  shape?: AvatarShape;
  ring?: boolean;
}

export const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

export function useAvatarGroupContext(): AvatarGroupContextValue | null {
  return useContext(AvatarGroupContext);
}
