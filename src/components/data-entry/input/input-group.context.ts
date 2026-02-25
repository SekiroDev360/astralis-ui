import { createContext, useContext } from "react";

interface InputGroupContextValue {
  hasPrefix: boolean;
  hasSuffix: boolean;
}

const InputGroupContext = createContext<InputGroupContextValue>({
  hasPrefix: false,
  hasSuffix: false,
});

export function useInputGroupContext() {
  return useContext(InputGroupContext);
}

export default InputGroupContext;
