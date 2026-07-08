export interface NavItem {
  title: string;
  href: string;
  /** "soon" renders a disabled entry with a badge; "legacy" flags pre-rework components. */
  status?: "soon" | "new" | "legacy";
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/**
 * The full planned sitemap. Pages ship one by one — anything marked "soon"
 * shows in the sidebar as a disabled entry so the information architecture
 * is visible from day one.
 */
export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation", status: "soon" },
      { title: "Quick Start", href: "/docs/quick-start", status: "soon" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Theming", href: "/docs/theming", status: "soon" },
      { title: "Colors", href: "/docs/colors", status: "soon" },
      { title: "Responsive Props", href: "/docs/responsive", status: "soon" },
      { title: "Style Props", href: "/docs/style-props", status: "soon" },
      { title: "Design Tokens", href: "/docs/tokens", status: "soon" },
    ],
  },
  {
    title: "Buttons",
    items: [
      { title: "Button", href: "/docs/components/button", status: "new" },
      { title: "Button Group", href: "/docs/components/button-group", status: "new" },
      { title: "Theme Toggle", href: "/docs/components/theme-toggle", status: "new" },
    ],
  },
  {
    title: "Layout",
    items: [
      { title: "Box", href: "/docs/components/box", status: "new" },
      { title: "Flex", href: "/docs/components/flex", status: "new" },
      { title: "Stack", href: "/docs/components/stack", status: "new" },
      { title: "Grid", href: "/docs/components/grid", status: "new" },
      { title: "Center", href: "/docs/components/center", status: "new" },
      { title: "Container", href: "/docs/components/container", status: "new" },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio", status: "new" },
      { title: "Float", href: "/docs/components/float", status: "new" },
      { title: "Separator", href: "/docs/components/separator", status: "new" },
    ],
  },
  {
    title: "Typography",
    items: [
      { title: "Text", href: "/docs/components/text", status: "new" },
      { title: "Heading", href: "/docs/components/heading", status: "new" },
      { title: "Blockquote", href: "/docs/components/blockquote", status: "new" },
      { title: "Code", href: "/docs/components/code", status: "new" },
      { title: "Code Block", href: "/docs/components/code-block", status: "new" },
      { title: "Highlight", href: "/docs/components/highlight", status: "new" },
      { title: "List", href: "/docs/components/list", status: "new" },
    ],
  },
  {
    title: "Disclosure",
    items: [
      { title: "Accordion", href: "/docs/components/accordion", status: "new" },
      { title: "Carousel", href: "/docs/components/carousel", status: "new" },
      { title: "Pagination", href: "/docs/components/pagination", status: "new" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Tabs", href: "/docs/components/tabs", status: "new" },
      { title: "Steps", href: "/docs/components/steps", status: "new" },
    ],
  },
  {
    title: "Icon",
    items: [{ title: "Icon", href: "/docs/components/icon", status: "new" }],
  },
  {
    title: "Overlay",
    items: [
      { title: "Modal", href: "/docs/components/modal", status: "new" },
      { title: "Drawer", href: "/docs/components/drawer", status: "new" },
      { title: "Tooltip", href: "/docs/components/tooltip", status: "new" },
      { title: "Popover", href: "/docs/components/popover", status: "new" },
    ],
  },
  {
    title: "Data Entry",
    items: [
      { title: "Input", href: "/docs/components/input", status: "new" },
      { title: "Field", href: "/docs/components/field", status: "new" },
      { title: "Checkbox", href: "/docs/components/checkbox", status: "new" },
      { title: "Radio", href: "/docs/components/radio", status: "new" },
      { title: "Switch", href: "/docs/components/switch", status: "new" },
      { title: "Select", href: "/docs/components/select", status: "new" },
      { title: "MultiSelect", href: "/docs/components/multi-select", status: "new" },
      { title: "Pin Input", href: "/docs/components/pin-input", status: "new" },
      { title: "Slider", href: "/docs/components/slider", status: "new" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "Card", href: "/docs/components/card", status: "new" },
      { title: "Tag", href: "/docs/components/tag", status: "new" },
      { title: "Image", href: "/docs/components/image", status: "new" },
      { title: "Calendar", href: "/docs/components/calendar", status: "new" },
      { title: "Data List", href: "/docs/components/data-list", status: "new" },
      { title: "Marquee", href: "/docs/components/marquee", status: "new" },
      { title: "QR Code", href: "/docs/components/qr-code", status: "new" },
      { title: "Avatar", href: "/docs/components/avatar", status: "new" },
      { title: "Badge", href: "/docs/components/badge", status: "new" },
      { title: "Stat", href: "/docs/components/stat", status: "new" },
      { title: "Table", href: "/docs/components/table", status: "new" },
      { title: "Timeline", href: "/docs/components/timeline", status: "new" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Alert", href: "/docs/components/alert", status: "new" },
      { title: "Progress", href: "/docs/components/progress", status: "new" },
      { title: "Skeleton", href: "/docs/components/skeleton", status: "new" },
      { title: "Spinner", href: "/docs/components/spinner", status: "new" },
    ],
  },
];
