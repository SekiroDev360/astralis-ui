import { ReactNode } from "react";

export interface ComponentLink {
  name: string;
  url: string;
  slug: string;
  content: ReactNode | string;
}

export interface ComponentSection {
  title: string;
  links: ComponentLink[];
}
