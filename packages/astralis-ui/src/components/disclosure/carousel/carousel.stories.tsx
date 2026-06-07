import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel } from "./index";

/* ------------------------------------------------------------------ */
/* Meta                                                                 */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof Carousel> = {
  title: "Components/Disclosure/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    loop: { control: "boolean" },
    autoPlay: { control: "boolean" },
    autoPlayInterval: { control: "number" },
    pauseOnHover: { control: "boolean" },
    animation: { control: { type: "select" }, options: ["slide", "fade"] },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    speed: { control: "number" },
    easing: { control: "text" },
    disabled: { control: "boolean" },
    swipeable: { control: "boolean" },
    draggable: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="astralis-flex astralis-items-center astralis-justify-center">
        <div className="astralis-w-lg">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

/* ------------------------------------------------------------------ */
/* Slide content                                                        */
/* ------------------------------------------------------------------ */

const SLIDES = [
  {
    bg: "astralis-bg-brand-600",
    label: "Slide 1",
    text: "astralis-text-white",
  },
  {
    bg: "astralis-bg-surface-muted",
    label: "Slide 2",
    text: "astralis-text-label-base",
  },
  {
    bg: "astralis-bg-surface-subtle",
    label: "Slide 3",
    text: "astralis-text-label-base",
  },
  {
    bg: "astralis-bg-brand-600",
    label: "Slide 4",
    text: "astralis-text-white",
  },
];

function Slide({
  label,
  bg,
  text,
  height = "astralis-h-52",
}: {
  label: string;
  bg: string;
  text: string;
  height?: string;
}) {
  return (
    <div
      className={`${height} ${bg} astralis-flex astralis-items-center astralis-justify-center astralis-rounded-xl`}
    >
      <span className={`${text} astralis-text-lg astralis-font-semibold`}>
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable slide list                                                  */
/* ------------------------------------------------------------------ */
function Slides({ height }: { height?: string }) {
  return (
    <>
      {SLIDES.map(({ bg, label, text }, i) => (
        <Carousel.Slide key={i}>
          <Slide bg={bg} label={label} text={text} height={height} />
        </Carousel.Slide>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Default                                                              */
/* Standard layout: relative wrapper → Track + Prev/Next overlaid,    */
/* Indicators sit below outside the relative wrapper.                   */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      {/* Relative wrapper is the positioning reference for Prev/Next */}
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <Carousel.Indicators />
    </Carousel>
  ),
  args: { defaultIndex: 0 },
};

/* ------------------------------------------------------------------ */
/* Loop                                                                 */
/* ------------------------------------------------------------------ */

export const Loop: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <Carousel.Indicators />
    </Carousel>
  ),
  args: { loop: true },
  parameters: {
    docs: {
      description: {
        story:
          "loop={true} — Next wraps from the last slide back to slide 1. Prev/Next never disable.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* AutoPlay                                                             */
/* AutoPlayTrigger sits between Prev and Next in a control bar below   */
/* the slide — no indicator dots mixed in.                             */
/* ------------------------------------------------------------------ */

export const AutoPlay: Story = {
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>
        <Slides />
      </Carousel.Track>
      {/* Control bar: Prev — AutoPlayTrigger — Next */}
      <div className="astralis-flex astralis-justify-center astralis-items-center astralis-gap-4 astralis-mt-4">
        <Carousel.Prev overlay={false} />
        <Carousel.AutoPlayTrigger />
        <Carousel.Next overlay={false} />
      </div>
    </Carousel>
  ),
  args: {
    autoPlay: true,
    autoPlayInterval: 2500,
    pauseOnHover: true,
    loop: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "autoPlay with a control bar. Hover to pause. The AutoPlayTrigger between Prev and Next lets users toggle playback.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* AutoPlay — custom trigger render prop                                */
/* ------------------------------------------------------------------ */

export const AutoPlayCustomTrigger: Story = {
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Track>
        <Slides />
      </Carousel.Track>
      <div className="astralis-flex astralis-justify-center astralis-items-center astralis-gap-4 astralis-mt-4">
        <Carousel.Prev overlay={false} />
        <Carousel.AutoPlayTrigger>
          {(playing) => (
            <span className="astralis-text-xs astralis-font-semibold astralis-text-label-muted astralis-px-2">
              {playing ? "⏸ Pause" : "▶ Play"}
            </span>
          )}
        </Carousel.AutoPlayTrigger>
        <Carousel.Next overlay={false} />
      </div>
    </Carousel>
  ),
  args: { autoPlay: true, loop: true },
};

/* ------------------------------------------------------------------ */
/* Fade Animation                                                       */
/* Parent of CarouselTrack must define a height in fade mode.          */
/* ------------------------------------------------------------------ */

export const FadeAnimation: Story = {
  render: (args) => (
    <Carousel {...args}>
      {/* h-52 provides the height context; track's h-full fills it;
          slides are position:absolute inset-0 inside the track */}
      <div className="astralis-relative astralis-h-52">
        <Carousel.Track>
          <Slides height="astralis-h-52" />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <Carousel.Indicators />
    </Carousel>
  ),
  args: { animation: "fade", speed: 500 },
  parameters: {
    docs: {
      description: {
        story:
          'animation="fade" crossfades slides via opacity. Wrap CarouselTrack in a fixed-height container so the absolutely-stacked slides have a height reference.',
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Vertical Orientation                                                 */
/* Matches Chakra UI's layout: slide on the left, controls on the      */
/* right in a column [Prev ▲] [dots] [Next ▼]                          */
/* ------------------------------------------------------------------ */

export const Vertical: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-flex astralis-flex-row astralis-gap-3 astralis-items-stretch">
        {/* Left: the slide viewport */}
        <div className="astralis-flex-1 astralis-overflow-hidden astralis-h-52 astralis-rounded-xl">
          <Carousel.Track>
            <Slides height="astralis-h-52" />
          </Carousel.Track>
        </div>
        {/* Right: Up → dots → Down stacked vertically */}
        <div className="astralis-flex astralis-flex-col astralis-justify-between astralis-items-center astralis-py-1">
          <Carousel.Prev overlay={false} />
          <Carousel.Indicators />
          <Carousel.Next overlay={false} />
        </div>
      </div>
    </Carousel>
  ),
  args: { orientation: "vertical", loop: true },
  parameters: {
    docs: {
      description: {
        story:
          "Vertical orientation: slide on the left, [Prev ▲] / dots / [Next ▼] stacked in a column on the right — matching Chakra UI's vertical carousel layout.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Indicator Variants                                                   */
/* ------------------------------------------------------------------ */

export const IndicatorVariants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      {(["dot", "line", "number"] as const).map((variant) => (
        <div
          key={variant}
          className="astralis-flex astralis-flex-col astralis-gap-1.5"
        >
          <p className="astralis-text-sm astralis-font-semibold astralis-text-label-muted">
            variant=&quot;{variant}&quot;
          </p>
          <Carousel defaultIndex={1}>
            <div className="astralis-relative">
              <Carousel.Track>
                <Slides height="astralis-h-40" />
              </Carousel.Track>
              <Carousel.Prev />
              <Carousel.Next />
            </div>
            <Carousel.Indicators variant={variant} />
          </Carousel>
        </div>
      ))}
    </div>
  ),
};

/* ------------------------------------------------------------------ */
/* Progress Text                                                        */
/* ------------------------------------------------------------------ */

export const WithProgressText: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <div className="astralis-flex astralis-justify-center astralis-mt-4">
        <Carousel.ProgressText />
      </div>
    </Carousel>
  ),
  args: {},
};

/* ------------------------------------------------------------------ */
/* Custom Progress Text format                                          */
/* ------------------------------------------------------------------ */

export const CustomProgressFormat: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <div className="astralis-flex astralis-justify-center astralis-mt-4">
        <Carousel.ProgressText
          format={(i, total) => (
            <span>
              Slide <strong className="astralis-text-brand-600">{i + 1}</strong>{" "}
              of {total}
            </span>
          )}
        />
      </div>
    </Carousel>
  ),
  args: {},
};

/* ------------------------------------------------------------------ */
/* Disabled                                                             */
/* ------------------------------------------------------------------ */

export const Disabled: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <Carousel.Indicators />
    </Carousel>
  ),
  args: { disabled: true, defaultIndex: 1 },
};

/* ------------------------------------------------------------------ */
/* Custom Speed & Easing                                                */
/* ------------------------------------------------------------------ */

export const SlowEase: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <Carousel.Indicators />
    </Carousel>
  ),
  args: { speed: 800, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  parameters: {
    docs: {
      description: {
        story: "speed=800ms with a spring cubic-bezier for a bouncy slide-in.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Custom Control Icons                                                 */
/* ------------------------------------------------------------------ */

export const CustomControlIcons: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev
          icon={
            <span className="astralis-text-base astralis-font-bold">‹</span>
          }
        />
        <Carousel.Next
          icon={
            <span className="astralis-text-base astralis-font-bold">›</span>
          }
        />
      </div>
      <Carousel.Indicators />
    </Carousel>
  ),
  args: { loop: true },
};

/* ------------------------------------------------------------------ */
/* Swipeable (touch)                                                    */
/* ------------------------------------------------------------------ */

export const Swipeable: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <div className="astralis-flex astralis-justify-center astralis-mt-4">
        <Carousel.Indicators />
      </div>
      <p className="astralis-text-xs astralis-text-center astralis-text-label-muted astralis-mt-2">
        Swipe left or right on a touch device to navigate slides.
      </p>
    </Carousel>
  ),
  args: { swipeable: true, loop: true },
  parameters: {
    docs: {
      description: {
        story:
          "swipeable={true} (default) enables touch-swipe on mobile. Swipe left for next, right for previous. Threshold is 50px.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Draggable (desktop mouse drag)                                       */
/* ------------------------------------------------------------------ */

export const Draggable: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="astralis-relative">
        <Carousel.Track>
          <Slides />
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </div>
      <Carousel.Indicators />
      <p className="astralis-text-xs astralis-text-center astralis-text-label-muted astralis-mt-2">
        Click and drag left or right to navigate slides.
      </p>
    </Carousel>
  ),
  args: { draggable: true, loop: true },
  parameters: {
    docs: {
      description: {
        story:
          "draggable={true} enables mouse-drag navigation on desktop. Drag threshold is 50px.",
      },
    },
  },
};
