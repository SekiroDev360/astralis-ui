import { createContext, useContext } from "react";
import type { CardSize } from "./card.types";

interface CardContextValue {
  size: CardSize;
}

export const CardContext = createContext<CardContextValue>({ size: "md" });

export function useCardContext() {
  return useContext(CardContext);
}
