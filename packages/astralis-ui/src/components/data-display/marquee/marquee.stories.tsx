import type { Meta, StoryObj } from "@storybook/react-vite";
import { Marquee } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Marquee> = {
  title: "Components/Data Display/Marquee",
  component: Marquee,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Marquee creates a continuously scrolling strip of content — logos, cards, text tickers. " +
          "It uses CSS keyframe animations with zero dependencies. " +
          "Children are automatically duplicated to create a seamless infinite loop.",
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
type Story = StoryObj<typeof Marquee>;

/* ── Sample logos (inline SVG placeholders) ─────────────────────── */
const LOGOS = [
  { name: "React", emoji: "⚛️", color: "#61DAFB" },
  { name: "TypeScript", emoji: "🔷", color: "#3178C6" },
  { name: "Vite", emoji: "⚡", color: "#646CFF" },
  { name: "Tailwind", emoji: "🌊", color: "#06B6D4" },
  { name: "Storybook", emoji: "📖", color: "#FF4785" },
  { name: "Node.js", emoji: "🟢", color: "#339933" },
];

function LogoChip({
  name,
  emoji,
  color,
}: {
  name: string;
  emoji: string;
  color: string;
}) {
  return (
    <div
      className="astralis:flex astralis:items-center astralis:gap-2 astralis:px-4 astralis:py-2 astralis:rounded-full astralis:border astralis:border-stroke-subtle astralis:bg-surface-raised astralis:text-sm astralis:font-medium astralis:text-content-primary astralis:whitespace-nowrap"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <span>{emoji}</span>
      <span>{name}</span>
    </div>
  );
}

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Marquee gap="0.75rem">
      {LOGOS.map((logo) => (
        <Marquee.Item key={logo.name}>
          <LogoChip {...logo} />
        </Marquee.Item>
      ))}
    </Marquee>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default horizontal left-to-right marquee with technology logo chips.",
      },
    },
  },
};

/* ── Pause On Hover ──────────────────────────────────────────────── */
export const PauseOnHover: Story = {
  render: () => (
    <Marquee pauseOnHover gap="0.75rem">
      {LOGOS.map((logo) => (
        <Marquee.Item key={logo.name}>
          <LogoChip {...logo} />
        </Marquee.Item>
      ))}
    </Marquee>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`pauseOnHover` halts the animation when the user hovers over the marquee.",
      },
    },
  },
};

/* ── Reversed ────────────────────────────────────────────────────── */
export const Reversed: Story = {
  render: () => (
    <div className="astralis:flex astralis:flex-col astralis:gap-4">
      <Marquee gap="0.75rem">
        {LOGOS.map((logo) => (
          <Marquee.Item key={logo.name}>
            <LogoChip {...logo} />
          </Marquee.Item>
        ))}
      </Marquee>
      <Marquee reverse gap="0.75rem">
        {[...LOGOS].reverse().map((logo) => (
          <Marquee.Item key={logo.name}>
            <LogoChip {...logo} />
          </Marquee.Item>
        ))}
      </Marquee>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Two rows — one left-scrolling, one `reverse` (right-scrolling) — for a dynamic ticker wall.",
      },
    },
  },
};

/* ── Edge Gradient ───────────────────────────────────────────────── */
export const EdgeGradient: Story = {
  render: () => (
    <div className="astralis:rounded-xl astralis:overflow-hidden">
      <Marquee gradient gradientWidth="15%" pauseOnHover gap="0.75rem">
        {LOGOS.map((logo) => (
          <Marquee.Item key={logo.name}>
            <LogoChip {...logo} />
          </Marquee.Item>
        ))}
      </Marquee>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`gradient` renders a fade-out mask at both edges for a polished infinite feel.",
      },
    },
  },
};

/* ── Vertical ────────────────────────────────────────────────────── */
export const Vertical: Story = {
  render: () => (
    <div className="astralis:flex astralis:gap-4">
      <Marquee direction="up" gap="0.5rem" speed={40} style={{ height: 220 }}>
        {LOGOS.map((logo) => (
          <Marquee.Item key={logo.name}>
            <LogoChip {...logo} />
          </Marquee.Item>
        ))}
      </Marquee>
      <Marquee direction="down" gap="0.5rem" speed={40} style={{ height: 220 }}>
        {[...LOGOS].reverse().map((logo) => (
          <Marquee.Item key={logo.name}>
            <LogoChip {...logo} />
          </Marquee.Item>
        ))}
      </Marquee>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical marquees (`direction="up"` and `direction="down"`) — provide a fixed `height` on the container.',
      },
    },
  },
};

/* ── Speed Control ───────────────────────────────────────────────── */
export const SpeedControl: Story = {
  render: () => (
    <div className="astralis:flex astralis:flex-col astralis:gap-6">
      {([20, 50, 120] as const).map((spd) => (
        <div key={spd}>
          <p className="astralis:text-xs astralis:text-content-secondary astralis:font-medium astralis:mb-2">
            speed={spd}px/s
          </p>
          <Marquee speed={spd} gap="0.75rem">
            {LOGOS.map((logo) => (
              <Marquee.Item key={logo.name}>
                <LogoChip {...logo} />
              </Marquee.Item>
            ))}
          </Marquee>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "`speed` controls pixels-per-second. Higher = faster.",
      },
    },
  },
};

/* ── News Ticker ─────────────────────────────────────────────────── */
export const NewsTicker: Story = {
  render: () => {
    const headlines = [
      "🚀 Astralis UI v2.0 released with 50+ new components",
      "📦 Bundle size reduced by 40% in latest optimisation pass",
      "🎨 New dark mode design tokens now available",
      "🔒 Security patch deployed to all CDN regions",
      "⚡ Storybook integration now supports hot module reloading",
    ];
    return (
      <div className="astralis:flex astralis:items-center astralis:rounded-lg astralis:border astralis:border-stroke-subtle astralis:overflow-hidden">
        {/* Label */}
        <div className="astralis:shrink-0 astralis:px-3 astralis:py-2 astralis:bg-primary-600 astralis:text-white astralis:text-xs astralis:font-bold astralis:uppercase astralis:tracking-wide">
          LIVE
        </div>
        {/* Ticker */}
        <Marquee
          speed={80}
          gap="3rem"
          gradient
          gradientWidth="5%"
          className="astralis:py-2"
        >
          {headlines.map((h, i) => (
            <Marquee.Item key={i}>
              <span className="astralis:text-sm astralis:text-content-primary astralis:whitespace-nowrap">
                {h}
              </span>
            </Marquee.Item>
          ))}
        </Marquee>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "News ticker with a coloured label badge and fast scrolling headlines.",
      },
    },
  },
};

/* ── Testimonials ─────────────────────────────────────────────────── */
export const Testimonials: Story = {
  render: () => {
    const testimonials = [
      {
        author: "Sophie D.",
        role: "Lead Designer",
        text: "The design system is beautiful and the dark mode is flawless.",
        avatar: "SD",
        color: "#EC4899",
      },
      {
        author: "Alex C.",
        role: "Senior Engineer",
        text: "Cut our component build time in half. Outstanding DX.",
        avatar: "AC",
        color: "#3B82F6",
      },
      {
        author: "Jordan K.",
        role: "PM",
        text: "Our team onboarded in one afternoon. Perfect documentation.",
        avatar: "JK",
        color: "#10B981",
      },
      {
        author: "Taylor R.",
        role: "Founder",
        text: "Shipped our MVP three weeks faster thanks to Astralis UI.",
        avatar: "TR",
        color: "#8B5CF6",
      },
      {
        author: "Morgan L.",
        role: "Frontend Dev",
        text: "The accessibility defaults saved me countless hours.",
        avatar: "ML",
        color: "#F59E0B",
      },
    ];
    return (
      <div className="astralis:flex astralis:flex-col astralis:gap-4">
        <Marquee gap="1rem" pauseOnHover speed={40}>
          {testimonials.slice(0, 3).map((t) => (
            <Marquee.Item key={t.author}>
              <div className="astralis:w-72 astralis:rounded-xl astralis:border astralis:border-stroke-subtle astralis:bg-surface-raised astralis:p-4 astralis:flex astralis:flex-col astralis:gap-3">
                <p className="astralis:text-sm astralis:text-content-secondary astralis:leading-relaxed">
                  "{t.text}"
                </p>
                <div className="astralis:flex astralis:items-center astralis:gap-2">
                  <div
                    className="astralis:h-8 astralis:w-8 astralis:rounded-full astralis:flex astralis:items-center astralis:justify-center astralis:text-white astralis:text-xs astralis:font-bold astralis:shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="astralis:text-xs astralis:font-semibold astralis:text-content-primary">
                      {t.author}
                    </p>
                    <p className="astralis:text-xs astralis:text-content-secondary">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </Marquee.Item>
          ))}
        </Marquee>
        <Marquee gap="1rem" pauseOnHover speed={40} reverse>
          {testimonials.slice(2).map((t) => (
            <Marquee.Item key={t.author}>
              <div className="astralis:w-72 astralis:rounded-xl astralis:border astralis:border-stroke-subtle astralis:bg-surface-raised astralis:p-4 astralis:flex astralis:flex-col astralis:gap-3">
                <p className="astralis:text-sm astralis:text-content-secondary astralis:leading-relaxed">
                  "{t.text}"
                </p>
                <div className="astralis:flex astralis:items-center astralis:gap-2">
                  <div
                    className="astralis:h-8 astralis:w-8 astralis:rounded-full astralis:flex astralis:items-center astralis:justify-center astralis:text-white astralis:text-xs astralis:font-bold astralis:shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="astralis:text-xs astralis:font-semibold astralis:text-content-primary">
                      {t.author}
                    </p>
                    <p className="astralis:text-xs astralis:text-content-secondary">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </Marquee.Item>
          ))}
        </Marquee>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Social proof section — two rows of testimonial cards scrolling in opposite directions.",
      },
    },
  },
};
