import { RadioBase } from "./components/radio";
import { RadioGroup } from "./components/radio-group";

// 1️⃣ Compound API
export const Radio = Object.assign(RadioBase, {
  Group: RadioGroup,
});

// 2️⃣ Flat exports
export { RadioBase, RadioGroup };

// 3️⃣ Type exports
export type {
  RadioProps,
  RadioGroupProps,
  RadioSize,
  RadioGroupContextValue,
} from "./radio.types";
