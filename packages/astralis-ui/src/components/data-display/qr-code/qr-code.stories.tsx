import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { QrCode } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof QrCode> = {
  title: "Components/Data Display/QR Code",
  component: QrCode,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "QrCode generates scannable QR codes entirely client-side as SVG — no network requests, no canvas. " +
          "Supports logo overlays, status states (loading / expired / scanned), colour customisation, " +
          "multiple error-correction levels, and a one-click SVG download.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof QrCode>;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => <QrCode value="https://astralis-ui.dev" />,
  parameters: {
    docs: {
      description: { story: "A minimal QR code pointing to a URL." },
    },
  },
};

/* ── Sizes ────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-end astralis-gap-6 astralis-flex-wrap">
      {(["sm", "md", "lg", "xl"] as const).map((s) => (
        <div
          key={s}
          className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2"
        >
          <QrCode value="https://astralis-ui.dev" size={s} />
          <span className="astralis-text-xs astralis-text-content-secondary astralis-font-medium">
            size="{s}"
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Four preset sizes: `sm` (96px), `md` (160px), `lg` (220px), `xl` (280px).",
      },
    },
  },
};

/* ── Error Levels ────────────────────────────────────────────────── */
export const ErrorLevels: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-6 astralis-flex-wrap astralis-items-end">
      {(["L", "M", "Q", "H"] as const).map((level) => (
        <div
          key={level}
          className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2"
        >
          <QrCode value="https://astralis-ui.dev" errorLevel={level} />
          <div className="astralis-text-center">
            <p className="astralis-text-xs astralis-font-semibold astralis-text-content-primary">
              Level {level}
            </p>
            <p className="astralis-text-xs astralis-text-content-secondary">
              {level === "L" && "7% restore"}
              {level === "M" && "15% restore"}
              {level === "Q" && "25% restore"}
              {level === "H" && "30% restore"}
            </p>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Error correction levels (L → H). Higher levels add more redundancy — use `H` when adding an overlay logo.",
      },
    },
  },
};

/* ── With Logo ───────────────────────────────────────────────────── */
export const WithLogo: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-6 astralis-flex-wrap">
      <QrCode
        value="https://astralis-ui.dev"
        size="lg"
        errorLevel="H"
        overlay={
          <div className="astralis-w-full astralis-h-full astralis-bg-primary-600 astralis-flex astralis-items-center astralis-justify-center">
            <span className="astralis-text-white astralis-font-bold astralis-text-sm">
              A
            </span>
          </div>
        }
        overlaySize={18}
      />
      <QrCode
        value="https://github.com"
        size="lg"
        errorLevel="H"
        overlay={
          <div className="astralis-w-full astralis-h-full astralis-bg-gray-900 dark:astralis-bg-gray-100 astralis-flex astralis-items-center astralis-justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="astralis-text-white dark:astralis-text-gray-900"
              style={{ width: "60%", height: "60%" }}
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
        }
        overlaySize={18}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use `overlay` to embed a logo in the centre. Set `errorLevel="H"` to ensure the code remains scannable despite the obscured area.',
      },
    },
  },
};

/* ── Custom Colors ────────────────────────────────────────────────── */
export const CustomColors: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-6 astralis-flex-wrap astralis-items-end">
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2 astralis-p-4 astralis-rounded-xl astralis-bg-gray-900">
        <QrCode
          value="https://astralis-ui.dev"
          color="#a855f7"
          bgColor="#1f2937"
        />
        <span className="astralis-text-xs astralis-text-gray-300">
          Purple on dark
        </span>
      </div>
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2 astralis-p-4 astralis-rounded-xl astralis-bg-blue-600">
        <QrCode
          value="https://astralis-ui.dev"
          color="#ffffff"
          bgColor="#2563EB"
        />
        <span className="astralis-text-xs astralis-text-white">
          White on blue
        </span>
      </div>
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2 astralis-p-4 astralis-rounded-xl astralis-bg-green-50">
        <QrCode
          value="https://astralis-ui.dev"
          color="#16a34a"
          bgColor="#f0fdf4"
        />
        <span className="astralis-text-xs astralis-text-green-700">
          Green themed
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`color` sets the dark module colour; `bgColor` sets the light module fill. Both accept any valid CSS colour string.",
      },
    },
  },
};

/* ── Status States ────────────────────────────────────────────────── */
export const StatusStates: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-6 astralis-flex-wrap astralis-items-end">
      {(["active", "loading", "expired", "scanned"] as const).map((s) => (
        <div
          key={s}
          className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2"
        >
          <QrCode
            value="https://astralis-ui.dev"
            status={s}
            onRefresh={() => alert("Refreshing…")}
          />
          <span className="astralis-text-xs astralis-text-content-secondary astralis-font-medium capitalize">
            {s}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Four status states: `active` (normal), `loading` (spinner overlay), `expired` (refresh prompt), `scanned` (success indicator).",
      },
    },
  },
};

/* ── Downloadable ────────────────────────────────────────────────── */
export const Downloadable: Story = {
  render: () => (
    <QrCode
      value="https://astralis-ui.dev"
      size="lg"
      downloadable
      downloadFileName="astralis-qrcode"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`downloadable` renders a button to export the QR code as an SVG file.",
      },
    },
  },
};

/* ── Live Input ──────────────────────────────────────────────────── */
export const LiveInput: Story = {
  render: () => {
    const [val, setVal] = useState("https://astralis-ui.dev");
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-4 astralis-max-w-xs">
        <div className="astralis-flex astralis-flex-col astralis-gap-1">
          <label className="astralis-text-xs astralis-font-medium astralis-text-content-secondary">
            Enter a URL or text
          </label>
          <input
            className={[
              "astralis-w-full astralis-rounded-lg astralis-border astralis-border-stroke-default",
              "astralis-bg-surface-default astralis-text-content-primary astralis-text-sm",
              "astralis-px-3 astralis-py-2 astralis-outline-none",
              "focus:astralis-ring-2 focus:astralis-ring-primary-500 focus:astralis-ring-offset-1",
              "astralis-transition-shadow astralis-duration-150",
            ].join(" ")}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="https://…"
          />
        </div>
        {val.trim() && (
          <QrCode value={val.trim()} size="lg" errorLevel="M" downloadable />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Live input demo — type any URL or text to see the QR code update in real time.",
      },
    },
  },
};
