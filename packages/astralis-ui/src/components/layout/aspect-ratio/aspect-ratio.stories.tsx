import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Box } from "../box";
import { Flex } from "../flex";
import { AspectRatio } from "./index";

/**
 * AspectRatio locks its content to a fixed width:height ratio. The single child is
 * stretched to fill the frame (images/videos default to `object-cover`), so it's
 * ideal for media, embeds, and placeholders. `ratio` uses the named aspect tokens
 * and accepts a responsive map.
 */
const meta: Meta<typeof AspectRatio> = {
  title: "Components/Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "select" },
      options: ["square", "landscape", "portrait", "wide", "ultrawide", "golden", "auto"],
    },
  },
  parameters: {
    docs: { description: { component: "Constrains content to a fixed aspect ratio." } },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

const Fill = ({ label }: { label: string }) => (
  <Flex bg="brand-500" color="white" alignItems="center" justifyContent="center">
    <Text color="current" size="sm">{label}</Text>
  </Flex>
);

/** A 16:9 frame with content stretched to fill it. */
export const Usage: Story = {
  render: () => (
    <Box w="full" maxW="md">
      <AspectRatio ratio="wide" rounded="lg">
        <Fill label="16 : 9" />
      </AspectRatio>
    </Box>
  ),
};

/** The named ratio tokens. */
export const Ratios: Story = {
  render: () => (
    <Flex gap="4" wrap="wrap" alignItems="start">
      {(["square", "landscape", "portrait", "wide", "golden"] as const).map((r) => (
        <Box key={r} w="48">
          <Text size="sm" color="muted" gutterBottom>ratio="{r}"</Text>
          <AspectRatio ratio={r} rounded="lg">
            <Fill label={r} />
          </AspectRatio>
        </Box>
      ))}
    </Flex>
  ),
};

/** Media fills the frame with `object-cover` automatically. */
export const WithImage: Story = {
  render: () => (
    <Box w="full" maxW="md">
      <AspectRatio ratio="wide" rounded="lg" border="normal" borderColor="muted">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
          alt="Sky"
        />
      </AspectRatio>
    </Box>
  ),
};

/** `ratio` can be responsive — portrait on small screens, wide on large. */
export const Responsive: Story = {
  render: () => (
    <Box w="full" maxW="md">
      <Text size="sm" color="muted" gutterBottom>{`ratio={{ base: "portrait", md: "wide" }}`}</Text>
      <AspectRatio ratio={{ base: "portrait", md: "wide" }} rounded="lg">
        <Fill label="resize me" />
      </AspectRatio>
    </Box>
  ),
};
