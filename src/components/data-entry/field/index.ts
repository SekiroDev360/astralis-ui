import { FieldRoot } from "./components/field-root";
import { FieldLabel } from "./components/field-label";
import { FieldHelpText } from "./components/field-help-text";
import { FieldErrorText } from "./components/field-error-text";

// 1️⃣ Compound API
export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  HelpText: FieldHelpText,
  ErrorText: FieldErrorText,
});

// 2️⃣ Flat exports for tree-shaking
export { FieldRoot, FieldLabel, FieldHelpText, FieldErrorText };

// 3️⃣ Context hook for custom components
export { useFieldContext } from "./field.context";

// 4️⃣ Type exports
export type {
  FieldRootProps,
  FieldLabelProps,
  FieldHelpTextProps,
  FieldErrorTextProps,
  FieldContextValue,
} from "./field.types";
