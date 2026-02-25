import { createContext, useContext } from "react";
import type { CheckboxGroupContextValue } from "./checkbox.types";

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null,
);

export function useCheckboxGroupContext() {
  return useContext(CheckboxGroupContext);
}

export default CheckboxGroupContext;
