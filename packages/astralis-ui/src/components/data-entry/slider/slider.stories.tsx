import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Slider, RangeSlider } from "./index";
import { Field } from "../field";
import { AstralisProvider } from "../../../theme";

const meta: Meta = {
  title: "Components/Data Entry/Slider",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Slider is a custom-built range control with full keyboard support (← → Home End), mouse/touch drag, optional value tooltip, tick marks with labels, and a RangeSlider variant for selecting a min–max interval.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-8 astralis-w-96">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => {
    const [val, setVal] = React.useState(40);
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-4">
        <Slider value={val} onChange={setVal} />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Value: <strong>{val}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic controlled slider. Drag the thumb, click the track, or use ← → to adjust.",
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      <Slider size="sm" defaultValue={30} />
      <Slider size="md" defaultValue={60} />
      <Slider size="lg" defaultValue={80} />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Three track + thumb sizes: `sm`, `md`, `lg`." },
    },
  },
};

// ─── With step ────────────────────────────────────────────────────────────────

export const WithStep: Story = {
  render: () => {
    const [val, setVal] = React.useState(25);
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-4">
        <Slider min={0} max={100} step={25} value={val} onChange={setVal} />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Value: <strong>{val}</strong> (step 25)
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "`step={25}` — snaps to 0, 25, 50, 75, 100." },
    },
  },
};

// ─── With marks ───────────────────────────────────────────────────────────────

export const WithMarks: Story = {
  render: () => {
    const [val, setVal] = React.useState(50);
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-10">
        {/* Auto marks */}
        <div>
          <p className="astralis-text-xs astralis-text-content-tertiary astralis-mb-4">
            Auto marks (step=25)
          </p>
          <Slider step={25} marks value={val} onChange={setVal} />
        </div>

        {/* Custom marks with labels */}
        <div>
          <p className="astralis-text-xs astralis-text-content-tertiary astralis-mb-4">
            Custom marks with labels
          </p>
          <Slider
            min={0}
            max={100}
            marks={[
              { value: 0, label: "0°C" },
              { value: 37, label: "Body" },
              { value: 100, label: "100°C" },
            ]}
            value={val}
            onChange={setVal}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`marks={true}` auto-generates ticks at each step. Pass an array for custom marks with optional labels.",
      },
    },
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      <Slider defaultValue={60} />
      <Slider defaultValue={40} disabled />
      <Slider defaultValue={70} invalid />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Default, disabled, and invalid states." } },
  },
};

// ─── Range slider ─────────────────────────────────────────────────────────────

export const Range: Story = {
  render: () => {
    const [val, setVal] = React.useState<[number, number]>([20, 75]);
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-4">
        <RangeSlider value={val} onChange={setVal} />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Range: <strong>{val[0]}</strong> — <strong>{val[1]}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`RangeSlider` has two thumbs. Click the track to move the nearest thumb. Each thumb is independently keyboard-navigable.",
      },
    },
  },
};

// ─── Range with marks ─────────────────────────────────────────────────────────

export const RangeWithMarks: Story = {
  render: () => {
    const [val, setVal] = React.useState<[number, number]>([1000, 5000]);
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-4">
        <RangeSlider
          min={0}
          max={10000}
          step={500}
          value={val}
          onChange={setVal}
          marks={[
            { value: 0, label: "$0" },
            { value: 2500, label: "$2.5k" },
            { value: 5000, label: "$5k" },
            { value: 7500, label: "$7.5k" },
            { value: 10000, label: "$10k" },
          ]}
        />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Budget: <strong>${val[0].toLocaleString()}</strong> –{" "}
          <strong>${val[1].toLocaleString()}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Price range filter — RangeSlider with custom currency labels.",
      },
    },
  },
};

// ─── In a Field ───────────────────────────────────────────────────────────────

export const InField: Story = {
  render: () => {
    const [volume, setVolume] = React.useState(70);
    return (
      <Field>
        <Field.Label>Volume — {volume}%</Field.Label>
        <Slider
          min={0}
          max={100}
          step={5}
          value={volume}
          onChange={setVolume}
          marks={[
            { value: 0, label: "0" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
        <Field.HelpText>Adjust the playback volume.</Field.HelpText>
      </Field>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Slider inside a Field — the label updates live with the current value.",
      },
    },
  },
};

// ─── No tooltip ───────────────────────────────────────────────────────────────

export const NoTooltip: Story = {
  render: () => {
    const [val, setVal] = React.useState(50);
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <div className="astralis-flex astralis-justify-between astralis-text-sm astralis-text-content-secondary">
          <span>0</span>
          <span className="astralis-font-semibold astralis-text-content-primary">
            {val}
          </span>
          <span>100</span>
        </div>
        <Slider value={val} onChange={setVal} showTooltip={false} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`showTooltip={false}` disables the thumb tooltip. Value shown above instead.",
      },
    },
  },
};
