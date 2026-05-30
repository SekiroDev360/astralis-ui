import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`AspectRatio` constrains its child to a fixed width-to-height ratio using the CSS `aspect-ratio` property. Pass any number to `ratio` — common values are `16/9`, `4/3`, `1` (square) and `9/16` (portrait). Children are positioned absolutely to fill the container, making it easy to embed images, videos or iframes at a precise ratio.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-4">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AspectRatio>;

// ─── Shared helper ────────────────────────────────────────────────────────────

const ColorBlock = ({ label, color }: { label: string; color: string }) => (
  <div
    className={`astralis-w-full astralis-h-full astralis-flex astralis-items-center astralis-justify-center astralis-rounded-lg ${color}`}
  >
    <span className="astralis-text-sm astralis-font-semibold astralis-text-white astralis-drop-shadow">
      {label}
    </span>
  </div>
);

// ─── Common Ratios ────────────────────────────────────────────────────────────

/** The three most common aspect ratios at a glance. */
export const Common: Story = {
  render: () => (
    <div className="astralis-grid astralis-grid-cols-3 astralis-gap-6">
      {(
        [
          { label: "16:9", ratio: 16 / 9, color: "astralis-bg-primary-500" },
          { label: "4:3", ratio: 4 / 3, color: "astralis-bg-secondary-500" },
          { label: "1:1", ratio: 1, color: "astralis-bg-success-500" },
        ] as const
      ).map(({ label, ratio, color }) => (
        <div key={label}>
          <p className="astralis-text-xs astralis-text-content-tertiary astralis-font-mono astralis-mb-2">
            ratio={"{"}
            {ratio.toFixed(4).replace(/\.?0+$/, "")}
            {"}"}
          </p>
          <AspectRatio ratio={ratio}>
            <ColorBlock label={label} color={color} />
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three of the most common aspect ratios: widescreen `16/9`, traditional `4/3`, and square `1`. The coloured block perfectly fills the constrained area.",
      },
    },
  },
};

// ─── Portrait Ratios ──────────────────────────────────────────────────────────

/** Portrait and vertical ratios for mobile hero images or social media cards. */
export const Portrait: Story = {
  render: () => (
    <div className="astralis-grid astralis-grid-cols-4 astralis-gap-4">
      {(
        [
          { label: "9:16", ratio: 9 / 16, color: "astralis-bg-primary-400" },
          { label: "2:3", ratio: 2 / 3, color: "astralis-bg-secondary-400" },
          { label: "3:4", ratio: 3 / 4, color: "astralis-bg-warning-400" },
          { label: "1:1", ratio: 1, color: "astralis-bg-success-400" },
        ] as const
      ).map(({ label, ratio, color }) => (
        <div key={label}>
          <p className="astralis-text-xs astralis-text-content-tertiary astralis-font-mono astralis-mb-2">
            {label}
          </p>
          <AspectRatio ratio={ratio}>
            <ColorBlock label={label} color={color} />
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Portrait and near-square ratios — useful for profile photos, social media cards, or mobile hero images.",
      },
    },
  },
};

// ─── With Image ───────────────────────────────────────────────────────────────

/** An `<img>` cropped to a 16:9 frame. */
export const WithImage: Story = {
  render: () => (
    <div className="astralis-max-w-sm">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
          alt="Mountain landscape"
          className="astralis-w-full astralis-h-full astralis-object-cover astralis-rounded-lg"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Place an `<img>` with `object-cover` and `w-full h-full` inside `AspectRatio` to crop it to any ratio without distortion.",
      },
    },
  },
};

// ─── Video Embed ──────────────────────────────────────────────────────────────

/** An `<iframe>` embed constrained to 16:9. */
export const VideoEmbed: Story = {
  render: () => (
    <div className="astralis-max-w-lg">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="astralis-w-full astralis-h-full astralis-rounded-lg"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Wrap a `<iframe>` in `AspectRatio` to keep embedded videos responsive. The iframe fills 100% of the constrained box.",
      },
    },
  },
};
