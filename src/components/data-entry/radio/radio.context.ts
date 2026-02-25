import { createContext, useContext } from "react";
import type { RadioGroupContextValue } from "./radio.types";

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}

export default RadioGroupContext;
