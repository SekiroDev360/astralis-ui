import { CheckboxBase } from "./components/checkbox";
import { CheckboxGroup } from "./components/checkbox-group";

// 1️⃣ Compound API
export const Checkbox = Object.assign(CheckboxBase, {
  Group: CheckboxGroup,
});

// 2️⃣ Flat exports
export { CheckboxBase, CheckboxGroup };

// 3️⃣ Type exports
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxSize,
  CheckboxGroupContextValue,
} from "./checkbox.types";
