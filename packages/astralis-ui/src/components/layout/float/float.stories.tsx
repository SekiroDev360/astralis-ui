import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Box } from "../box";
import { Flex } from "../flex";
import { Float } from "./index";

/**
 * Float overlays content at the edge or corner of its nearest positioned ancestor —
 * wrap it in a `position="relative"` Box. Common for notification dots, badges, and
 * overlaid close buttons. `placement` accepts a responsive map.
 */
const meta: Meta<typeof Float> = {
  title: "Components/Layout/Float",
  component: Float,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: { type: "select" },
      options: [
        "top-start", "top-center", "top-end",
        "middle-start", "middle-center", "middle-end",
        "bottom-start", "bottom-center", "bottom-end",
      ],
    },
  },
  parameters: {
    docs: { description: { component: "Anchors content to a corner/edge of a positioned parent." } },
  },
};

export default meta;
type Story = StoryObj<typeof Float>;

const Dot = () => <Box bg="red-solid" rounded="full" w="5" h="5" border="normal" borderColor="base" />;

const Anchor = ({ children }: { children: React.ReactNode }) => (
  <Box position="relative" bg="muted" rounded="lg" w="24" h="24" border="normal" borderColor="muted">
    {children}
  </Box>
);

/** A notification dot pinned to the top-end corner. */
export const Usage: Story = {
  render: () => (
    <Anchor>
      <Float placement="top-end">
        <Dot />
      </Float>
    </Anchor>
  ),
};

/** Every placement, shown on its own anchor. */
export const Placements: Story = {
  render: () => (
    <Flex gap="8" wrap="wrap">
      {([
        "top-start", "top-center", "top-end",
        "middle-start", "middle-center", "middle-end",
        "bottom-start", "bottom-center", "bottom-end",
      ] as const).map((p) => (
        <Box key={p}>
          <Text size="xs" color="muted" align="center" gutterBottom>{p}</Text>
          <Anchor>
            <Float placement={p}>
              <Box bg="brand-500" color="white" rounded="full" px="2" py="0.5">
                <Text color="current" size="xs">9</Text>
              </Box>
            </Float>
          </Anchor>
        </Box>
      ))}
    </Flex>
  ),
};

/** Float carries Box props, so the floated content can be any styled element. */
export const AsBadge: Story = {
  render: () => (
    <Flex position="relative" bg="subtle" rounded="lg" w="40" h="20" border="normal" borderColor="muted" alignItems="center" justifyContent="center">
      <Text size="sm" color="muted">Inbox</Text>
      <Float placement="top-end">
        <Box bg="brand-500" color="white" rounded="full" px="2" py="0.5">
          <Text color="current" size="xs">12 new</Text>
        </Box>
      </Float>
    </Flex>
  ),
};
