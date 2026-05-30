import { createContext, useContext } from "react";
import type { FieldContextValue } from "./field.types";

const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * Returns Field context. Returns null instead of throwing
 * so inputs can be used standalone (outside a Field).
 */
export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

export default FieldContext;
