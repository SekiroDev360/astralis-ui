import { InputBase } from "./components/input";
import { InputGroup } from "./components/input-group";
import { InputPassword } from "./components/input-password";
import { InputSearch } from "./components/input-search";
import { InputTextarea } from "./components/input-textarea";

// 1️⃣ Compound API  — Input + Input.Password + Input.Search + Input.TextArea
export const Input = Object.assign(InputBase, {
  Password: InputPassword,
  Search: InputSearch,
  TextArea: InputTextarea,
});

// 2️⃣ Flat exports for tree-shaking
export { InputBase, InputGroup, InputPassword, InputSearch, InputTextarea };

// First-class alias — every peer library ships Textarea as its own component.
export { InputTextarea as Textarea };
export type { InputTextareaProps as TextareaProps } from "./input.types";

// 3️⃣ Type exports
export type {
  InputProps,
  InputGroupProps,
  InputPasswordProps,
  InputSearchProps,
  InputTextareaProps,
  InputSize,
  InputVariant,
} from "./input.types";
