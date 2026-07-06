import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with modal.types.ts */
export const modalProps: PropRow[] = [
  {
    prop: "open · defaultOpen · onOpenChange",
    type: "boolean · boolean · (open: boolean) => void",
    default: "— · false · —",
    description: "Controlled / initial state, and the change callback.",
  },
  {
    prop: "size",
    type: `"sm" | "md" | "lg" | "xl" | "full"`,
    default: `"md"`,
    description: "Panel width; full covers the viewport.",
  },
  {
    prop: "centered",
    type: "boolean",
    default: "true",
    description: "Vertically center the panel.",
  },
  {
    prop: "closeOnOverlayClick",
    type: "boolean",
    default: "true",
    description: "Dismiss when the backdrop is clicked.",
  },
  {
    prop: "closeOnEsc",
    type: "boolean",
    default: "true",
    description: "Dismiss on Escape.",
  },
];

export const modalPartsProps: PropRow[] = [
  {
    prop: "Modal.Trigger / Modal.Close",
    type: "children: ReactElement",
    description: "Wrap a single element (e.g. a Button) to open / close the modal.",
  },
  {
    prop: "Modal.Content",
    type: "children · className",
    description: "The portalled, focus-trapped dialog panel.",
  },
  {
    prop: "Modal.Header / Body / Footer",
    type: "children · className",
    description: "Layout regions; Body scrolls when content overflows.",
  },
  {
    prop: "Modal.Title / Modal.Description",
    type: "children · className",
    description: "Wired to aria-labelledby / aria-describedby automatically.",
  },
  {
    prop: "Modal.CloseButton",
    type: "className",
    description: "The corner ✕ button, placed inside the Header.",
  },
];
