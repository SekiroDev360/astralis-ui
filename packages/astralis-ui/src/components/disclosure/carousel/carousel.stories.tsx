import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel } from "./index";
import type { CarouselIndicatorVariant } from "./index";
import { Box } from "../../layout/box";
import { VStack } from "../../layout/stack";

/**
 * Carousel is a compound component for stepping through slides. The track is
 * transform-driven, so it supports multiple slides per view (`slidesPerView`,
 * fractional for peek), `slideGap`, `slidesToScroll`, a `fade` mode, autoplay,
 * swipe/drag, keyboard arrows, and `colorScheme`. `Carousel.Control` lays the
 * navigation out for you — no wrapper markup required.
 */
const meta: Meta<typeof Carousel> = {
  title: "Components/Disclosure/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    slidesPerView: { control: { type: "number", step: 0.1 } },
    slidesToScroll: { control: { type: "number" } },
    slideGap: { control: { type: "number" } },
    loop: { control: "boolean" },
    autoPlay: { control: "boolean" },
    autoPlayInterval: { control: "number" },
    animation: { control: { type: "select" }, options: ["slide", "fade"] },
    orientation: { control: { type: "select" }, options: ["horizontal", "vertical"] },
    speed: { control: "number" },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    colorScheme: {
      control: { type: "select" },
      options: ["brand", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// Demo slide content — plain inline styles, the way a consumer would style their own slides.
const COLORS = ["#f5c518", "#e5e7eb", "#d1d5db", "#fde68a", "#e5e7eb", "#f5c518"];
function Slide({ i, height = 208 }: { i: number; height?: number }) {
  return (
    <Box
      style={{
        height,
        background: COLORS[i % COLORS.length],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        fontWeight: 600,
        color: "#1f2937",
      }}
    >
      Slide {i + 1}
    </Box>
  );
}

const slides = (count = 4, height?: number) =>
  Array.from({ length: count }).map((_, i) => (
    <Carousel.Slide key={i}>
      <Slide i={i} height={height} />
    </Carousel.Slide>
  ));

/** Prev / Indicators / Next are arranged by `Carousel.Control` — no wrapper markup. */
export const Default: Story = {
  args: { defaultIndex: 0 },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides()}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.Indicators />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};

/** `slidesPerView={3}` with a `slideGap` shows several slides and scrolls by `slidesToScroll`. */
export const MultipleSlides: Story = {
  args: { slidesPerView: 3, slidesToScroll: 3, slideGap: 16, loop: true },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides(6, 144)}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.Indicators />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};

/** A fractional `slidesPerView` lets the next slide peek in at the edge. */
export const Peek: Story = {
  args: { slidesPerView: 1.15, slideGap: 12, loop: true },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides(5)}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Indicators />
      </Carousel.Control>
    </Carousel>
  ),
};

/** Next wraps back to the first page; controls never disable. */
export const Loop: Story = {
  args: { loop: true },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides()}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.Indicators />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};

/** Autoplay with an inline trigger between the arrows; hover to pause. */
export const AutoPlay: Story = {
  args: { autoPlay: true, autoPlayInterval: 2500, loop: true },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides()}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.AutoPlayTrigger />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};

/** `animation="fade"` cross-fades stacked slides; the viewport auto-sizes to the slides. */
export const Fade: Story = {
  args: { animation: "fade", speed: 500, loop: true },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides()}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.Indicators />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};

/** Vertical orientation: the viewport and a full-height control column sit side by side. */
export const Vertical: Story = {
  args: { orientation: "vertical", loop: true, style: { height: 208 } },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides(4)}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.Indicators />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};

const IVARIANTS = ["dot", "line", "number"] as const;

/** Three indicator styles. */
export const IndicatorVariants: Story = {
  render: () => (
    <VStack gap="8" alignItems="stretch">
      {IVARIANTS.map((variant: CarouselIndicatorVariant) => (
        <Carousel key={variant} defaultIndex={1}>
          <Carousel.Track>{slides(4, 144)}</Carousel.Track>
          <Carousel.Control>
            <Carousel.Prev />
            <Carousel.Indicators variant={variant} />
            <Carousel.Next />
          </Carousel.Control>
        </Carousel>
      ))}
    </VStack>
  ),
};

/** `colorScheme` recolours active indicators and focus rings. */
export const ColorScheme: Story = {
  args: { colorScheme: "green", defaultIndex: 1 },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides()}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.Indicators />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};

/** Control + indicator sizing. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="8" alignItems="stretch">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Carousel key={s} size={s} defaultIndex={1}>
          <Carousel.Track>{slides(4, 144)}</Carousel.Track>
          <Carousel.Control>
            <Carousel.Prev />
            <Carousel.Indicators />
            <Carousel.Next />
          </Carousel.Control>
        </Carousel>
      ))}
    </VStack>
  ),
};

/** Progress text reads between the arrows; pass `format` to customise it. */
export const WithProgressText: Story = {
  render: () => (
    <Carousel>
      <Carousel.Track>{slides()}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.ProgressText format={(i, total) => `Slide ${i + 1} of ${total}`} />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};

/** Draggable on desktop; swipeable on touch; arrow keys when focused. */
export const Draggable: Story = {
  args: { draggable: true, loop: true },
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>{slides()}</Carousel.Track>
      <Carousel.Control>
        <Carousel.Prev />
        <Carousel.Indicators />
        <Carousel.Next />
      </Carousel.Control>
    </Carousel>
  ),
};
