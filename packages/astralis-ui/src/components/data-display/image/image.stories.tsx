import type { Meta, StoryObj } from "@storybook/react-vite";
import Image, { ImageGroup } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Image> = {
  title: "Components/Data Display/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Image renders a photo with built-in lazy loading, aspect-ratio control, " +
          "object-fit modes, a fallback on error, and an optional click-to-preview lightbox. " +
          "Use `ImageGroup` for multi-image galleries with a shared lightbox.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis:p-6">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Image>;

const SAMPLE = "https://picsum.photos/id/10/800/600";
const SAMPLE2 = "https://picsum.photos/id/11/800/600";
const SAMPLE3 = "https://picsum.photos/id/12/800/600";

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Image
      src={SAMPLE}
      alt="Mountain landscape"
      width={320}
      height={200}
      rounded="md"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic image with lazy loading. Shows a shimmer while loading.",
      },
    },
  },
};

/* ── Height ──────────────────────────────────────────────────────── */
export const Height: Story = {
  render: () => (
    <div className="astralis:flex astralis:items-end astralis:gap-4">
      <Image src={SAMPLE} alt="sm" width={120} height={80} rounded="md" />
      <Image src={SAMPLE} alt="md" width={200} height={140} rounded="md" />
      <Image src={SAMPLE} alt="lg" width={300} height={220} rounded="md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Control dimensions with `width` and `height` props.",
      },
    },
  },
};

/* ── Circular ────────────────────────────────────────────────────── */
export const Circular: Story = {
  render: () => (
    <div className="astralis:flex astralis:items-center astralis:gap-4">
      <Image
        src="https://i.pravatar.cc/150?img=3"
        alt="User 1"
        width={80}
        height={80}
        rounded="full"
      />
      <Image
        src="https://i.pravatar.cc/150?img=5"
        alt="User 2"
        width={80}
        height={80}
        rounded="full"
      />
      <Image
        src="https://i.pravatar.cc/150?img=8"
        alt="User 3"
        width={80}
        height={80}
        rounded="full"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: '`rounded="full"` creates a circular image.' },
    },
  },
};

/* ── Aspect Ratio ────────────────────────────────────────────────── */
export const AspectRatioStory: Story = {
  name: "Aspect Ratio",
  render: () => (
    <div className="astralis:flex astralis:flex-wrap astralis:gap-4">
      {(["square", "video", "portrait", "wide"] as const).map((ratio) => (
        <div
          key={ratio}
          className="astralis:flex astralis:flex-col astralis:gap-1"
        >
          <Image
            src={SAMPLE}
            alt={ratio}
            aspectRatio={ratio}
            rounded="md"
            style={{ width: 180 }}
          />
          <span className="astralis:text-xs astralis:text-content-secondary astralis:text-center">
            {ratio}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`aspectRatio` accepts `square` (1:1), `video` (16:9), `portrait` (3:4), `wide` (21:9), or any CSS ratio string.",
      },
    },
  },
};

/* ── Fit ─────────────────────────────────────────────────────────── */
export const Fit: Story = {
  render: () => (
    <div className="astralis:flex astralis:flex-wrap astralis:gap-4">
      {(["cover", "contain", "fill", "none", "scale-down"] as const).map(
        (fit) => (
          <div
            key={fit}
            className="astralis:flex astralis:flex-col astralis:gap-1"
          >
            <div className="astralis:w-36 astralis:h-24 astralis:border astralis:border-stroke-subtle astralis:rounded-md astralis:overflow-hidden">
              <Image
                src={SAMPLE}
                alt={fit}
                objectFit={fit}
                className="astralis:h-full astralis:w-full"
              />
            </div>
            <span className="astralis:text-xs astralis:text-content-secondary astralis:text-center">
              {fit}
            </span>
          </div>
        ),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All five `objectFit` modes demonstrated in the same 144×96 box.",
      },
    },
  },
};

/* ── Fallback ────────────────────────────────────────────────────── */
export const Fallback: Story = {
  render: () => (
    <div className="astralis:flex astralis:gap-6 astralis:items-start">
      <div className="astralis:flex astralis:flex-col astralis:gap-1">
        <Image
          src="https://broken.example.com/image.jpg"
          alt="broken — default fallback"
          width={160}
          height={120}
          rounded="md"
        />
        <span className="astralis:text-xs astralis:text-center astralis:text-content-secondary">
          Default fallback
        </span>
      </div>
      <div className="astralis:flex astralis:flex-col astralis:gap-1">
        <Image
          src="https://broken.example.com/image.jpg"
          alt="broken — custom fallback"
          width={160}
          height={120}
          rounded="md"
          fallback={
            <div className="astralis:flex astralis:flex-col astralis:items-center astralis:justify-center astralis:gap-2 astralis:h-[120px] astralis:w-[160px] astralis:rounded-md astralis:bg-gray-100 astralis:dark:bg-gray-800 astralis:text-gray-400">
              <span className="astralis:text-2xl">🖼️</span>
              <span className="astralis:text-xs">No preview</span>
            </div>
          }
        />
        <span className="astralis:text-xs astralis:text-center astralis:text-content-secondary">
          Custom fallback
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass a `fallback` element to render when the image fails to load. Without it, a default broken-image icon is shown.",
      },
    },
  },
};

/* ── Caption ─────────────────────────────────────────────────────── */
export const Caption: Story = {
  render: () => (
    <Image
      src={SAMPLE2}
      alt="Serene forest"
      width={320}
      height={200}
      rounded="lg"
      caption="A serene forest scene captured at dawn."
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `caption` to wrap the image in a `<figure>` with a `<figcaption>`.",
      },
    },
  },
};

/* ── Preview Lightbox ────────────────────────────────────────────── */
export const Preview: Story = {
  render: () => (
    <div className="astralis:flex astralis:gap-4">
      <div className="astralis:flex astralis:flex-col astralis:gap-2 astralis:items-center">
        <Image
          src={SAMPLE}
          alt="Mountain"
          width={220}
          height={150}
          rounded="lg"
          preview
        />
        <span className="astralis:text-xs astralis:text-content-secondary">
          Click to preview
        </span>
      </div>
      <div className="astralis:flex astralis:flex-col astralis:gap-2 astralis:items-center">
        <Image
          src={SAMPLE2}
          alt="Aerial"
          width={220}
          height={150}
          rounded="lg"
          preview
        />
        <span className="astralis:text-xs astralis:text-content-secondary">
          Zoom · Rotate · Close (Esc)
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Add `preview` to enable click-to-zoom lightbox with zoom in/out, rotate, and close controls (also keyboard: Esc to close).",
      },
    },
  },
};

/* ── Gallery (ImageGroup) ────────────────────────────────────────── */
export const Gallery: Story = {
  render: () => (
    <ImageGroup
      columns={3}
      gap="md"
      rounded="md"
      items={[
        { src: SAMPLE, alt: "Mountain" },
        { src: SAMPLE2, alt: "Aerial" },
        { src: SAMPLE3, alt: "Forest" },
        {
          src: "https://picsum.photos/id/13/600/400",
          alt: "Path",
        },
        {
          src: "https://picsum.photos/id/14/600/400",
          alt: "Waterfall",
        },
        {
          src: "https://picsum.photos/id/15/600/400",
          alt: "Misty hills",
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`<ImageGroup>` renders a click-to-preview grid. Arrow keys navigate between images in the lightbox.",
      },
    },
  },
};
