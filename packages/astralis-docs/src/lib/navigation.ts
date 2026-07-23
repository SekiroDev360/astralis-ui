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
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Theming", href: "/docs/theming" },
      { title: "Colors", href: "/docs/colors" },
      { title: "Responsive Props", href: "/docs/responsive" },
      { title: "Style Props", href: "/docs/style-props" },
      { title: "Design Tokens", href: "/docs/tokens" },
    ],
  },
  {
    title: "Buttons",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Button Group", href: "/docs/components/button-group" },
      { title: "Floating Button", href: "/docs/components/floating-button", status: "new" },
      { title: "Theme Toggle", href: "/docs/components/theme-toggle" },
    ],
  },
  {
    title: "Layout",
    items: [
      { title: "Box", href: "/docs/components/box" },
      { title: "Flex", href: "/docs/components/flex" },
      { title: "Stack", href: "/docs/components/stack" },
      { title: "Grid", href: "/docs/components/grid" },
      { title: "Center", href: "/docs/components/center" },
      { title: "Container", href: "/docs/components/container" },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { title: "Float", href: "/docs/components/float" },
      { title: "Separator", href: "/docs/components/separator" },
    ],
  },
  {
    title: "Typography",
    items: [
      { title: "Text", href: "/docs/components/text" },
      { title: "Heading", href: "/docs/components/heading" },
      { title: "Blockquote", href: "/docs/components/blockquote" },
      { title: "Code", href: "/docs/components/code" },
      { title: "Code Block", href: "/docs/components/code-block" },
      { title: "Highlight", href: "/docs/components/highlight" },
      { title: "List", href: "/docs/components/list" },
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "Link", href: "/docs/components/link" },
    ],
  },
  {
    title: "Disclosure",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Carousel", href: "/docs/components/carousel" },
      { title: "Pagination", href: "/docs/components/pagination" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Steps", href: "/docs/components/steps" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Menu", href: "/docs/components/menu" },
    ],
  },
  {
    title: "Icon",
    items: [{ title: "Icon", href: "/docs/components/icon" }],
  },
  {
    title: "Overlay",
    items: [
      { title: "Modal", href: "/docs/components/modal" },
      { title: "Drawer", href: "/docs/components/drawer" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Popover", href: "/docs/components/popover" },
    ],
  },
  {
    title: "Data Entry",
    items: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Field", href: "/docs/components/field" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio", href: "/docs/components/radio" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Select", href: "/docs/components/select" },
      { title: "MultiSelect", href: "/docs/components/multi-select" },
      { title: "Pin Input", href: "/docs/components/pin-input" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Number Input", href: "/docs/components/number-input" },
      { title: "Combobox", href: "/docs/components/combobox" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "Card", href: "/docs/components/card" },
      { title: "Tag", href: "/docs/components/tag" },
      { title: "Image", href: "/docs/components/image" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Data List", href: "/docs/components/data-list" },
      { title: "Marquee", href: "/docs/components/marquee" },
      { title: "QR Code", href: "/docs/components/qr-code" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Stat", href: "/docs/components/stat" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Timeline", href: "/docs/components/timeline" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Toast", href: "/docs/components/toast" },
    ],
  },
];
