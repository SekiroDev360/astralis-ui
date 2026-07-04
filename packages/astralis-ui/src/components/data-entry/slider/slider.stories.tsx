import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slider, RangeSlider } from "./index";
import { Field } from "../field";
import { Box } from "../../layout/box";
import { VStack, HStack } from "../../layout/stack";
import { Text } from "../../typography/text";

const meta: Meta = {
  title: "Components/Data Entry/Slider",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Slider is a custom-built range control with full keyboard support (← → Home End), mouse/touch drag, optional value tooltip, tick marks with labels, `colorScheme`, and a RangeSlider variant for selecting a min–max interval.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** Basic controlled slider — drag, click the track, or use ← → to adjust. */
export const Basic: Story = {
  render: () => {
    const [val, setVal] = useState(40);
    return (
      <VStack gap="4" alignItems="stretch">
        <Slider value={val} onChange={setVal} />
        <Text size="sm" color="muted">
          Value: <Text as="span" weight="semibold" color="base">{val}</Text>
        </Text>
      </VStack>
    );
  },
};

/** Three track + thumb sizes: `sm`, `md`, `lg`. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="8" alignItems="stretch">
      <Slider size="sm" defaultValue={30} />
      <Slider size="md" defaultValue={60} />
      <Slider size="lg" defaultValue={80} />
    </VStack>
  ),
};

/** `colorScheme` tints the filled track and thumb via the accent channel. */
export const Colors: Story = {
  render: () => (
    <VStack gap="8" alignItems="stretch">
      <Slider colorScheme="brand" defaultValue={40} />
      <Slider colorScheme="green" defaultValue={55} />
      <Slider colorScheme="purple" defaultValue={70} />
      <Slider colorScheme="red" defaultValue={85} />
    </VStack>
  ),
};

/** `step={25}` snaps to 0, 25, 50, 75, 100. */
export const WithStep: Story = {
  render: () => {
    const [val, setVal] = useState(25);
    return (
      <VStack gap="4" alignItems="stretch">
        <Slider min={0} max={100} step={25} value={val} onChange={setVal} />
        <Text size="sm" color="muted">
          Value: <Text as="span" weight="semibold" color="base">{val}</Text> (step 25)
        </Text>
      </VStack>
    );
  },
};

/** `marks` auto-generates ticks; pass an array for custom labelled marks. */
export const WithMarks: Story = {
  render: () => {
    const [val, setVal] = useState(50);
    return (
      <VStack gap="10" alignItems="stretch">
        <Box>
          <Box mb="4"><Text size="xs" color="subtle">Auto marks (step=25)</Text></Box>
          <Slider step={25} marks value={val} onChange={setVal} />
        </Box>
        <Box>
          <Box mb="4"><Text size="xs" color="subtle">Custom marks with labels</Text></Box>
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
        </Box>
      </VStack>
    );
  },
};

/** Default, disabled, and invalid states. */
export const States: Story = {
  render: () => (
    <VStack gap="8" alignItems="stretch">
      <Slider defaultValue={60} />
      <Slider defaultValue={40} disabled />
      <Slider defaultValue={70} invalid />
    </VStack>
  ),
};

/** `RangeSlider` has two thumbs; click the track to move the nearest. */
export const Range: Story = {
  render: () => {
    const [val, setVal] = useState<[number, number]>([20, 75]);
    return (
      <VStack gap="4" alignItems="stretch">
        <RangeSlider value={val} onChange={setVal} />
        <Text size="sm" color="muted">
          Range: <Text as="span" weight="semibold" color="base">{val[0]}</Text> — <Text as="span" weight="semibold" color="base">{val[1]}</Text>
        </Text>
      </VStack>
    );
  },
};

/** Price-range filter — RangeSlider with custom currency labels. */
export const RangeWithMarks: Story = {
  render: () => {
    const [val, setVal] = useState<[number, number]>([1000, 5000]);
    return (
      <VStack gap="4" alignItems="stretch">
        <RangeSlider
          min={0}
          max={10000}
          step={500}
          value={val}
          onChange={setVal}
          colorScheme="teal"
          marks={[
            { value: 0, label: "$0" },
            { value: 2500, label: "$2.5k" },
            { value: 5000, label: "$5k" },
            { value: 7500, label: "$7.5k" },
            { value: 10000, label: "$10k" },
          ]}
        />
        <Text size="sm" color="muted">
          Budget: <Text as="span" weight="semibold" color="base">${val[0].toLocaleString()}</Text> – <Text as="span" weight="semibold" color="base">${val[1].toLocaleString()}</Text>
        </Text>
      </VStack>
    );
  },
};

/** Slider inside a Field — the label updates live. */
export const InField: Story = {
  render: () => {
    const [volume, setVolume] = useState(70);
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
};

/** `showTooltip={false}` disables the thumb tooltip; value shown above instead. */
export const NoTooltip: Story = {
  render: () => {
    const [val, setVal] = useState(50);
    return (
      <VStack gap="3" alignItems="stretch">
        <HStack justifyContent="between">
          <Text size="sm" color="muted">0</Text>
          <Text size="sm" weight="semibold" color="base">{val}</Text>
          <Text size="sm" color="muted">100</Text>
        </HStack>
        <Slider value={val} onChange={setVal} showTooltip={false} />
      </VStack>
    );
  },
};
