export type AccordionType = "single" | "multiple";

export interface AccordionProps {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  collapsible?: boolean;
  onValueChange?: (value: string | string[]) => void;
}

export interface AccordionItemProps {
  value: string;
  disabled?: boolean;
}

export interface AccordionTitleProps {
  children: React.ReactNode;
}
