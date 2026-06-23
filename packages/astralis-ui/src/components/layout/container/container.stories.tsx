import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Box } from "../box";
import { Container } from "./index";

/**
 * Container centers content horizontally up to a max width, with default horizontal
 * padding — the standard page/section wrapper. `maxW` and `px` are Box props (with
 * defaults of `5xl` / `4`); `centerContent` stacks children in a centered column.
 */
const meta: Meta<typeof Container> = {
  title: "Components/Layout/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    maxW: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
    },
    centerContent: { control: { type: "boolean" } },
  },
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "A centered, max-width page/section wrapper." } },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

const Band = ({ children }: { children: React.ReactNode }) => (
  <Box bg="brand-500" color="white" p="6" rounded="lg" w="full">
    <Text color="current" align="center">{children}</Text>
  </Box>
);

/** Default container — centered, maxW 5xl. The dashed frame marks the viewport edge. */
export const Usage: Story = {
  render: () => (
    <Box bg="subtle" py="8" w="full" border="normal" borderStyle="dashed" borderColor="muted">
      <Container>
        <Band>Centered content, maxW="5xl"</Band>
      </Container>
    </Box>
  ),
};

/** Different `maxW` values. */
export const MaxWidths: Story = {
  render: () => (
    <Box bg="subtle" py="8" w="full">
      <Box display="flex" >
        <Box w="full" display="block">
          {(["sm", "lg", "2xl", "5xl"] as const).map((m) => (
            <Box key={m} mb="4">
              <Container maxW={m}>
                <Band>maxW="{m}"</Band>
              </Container>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  ),
};

/** `centerContent` stacks children in a centered column. */
export const CenterContent: Story = {
  render: () => (
    <Box bg="subtle" py="8" w="full">
      <Container centerContent maxW="lg">
        <Text size="2xl" weight="bold">Centered heading</Text>
        <Text color="muted" align="center">
          With centerContent, children stack vertically and align to the center.
        </Text>
        <Box bg="brand-500" color="white" px="5" py="3" rounded="md"><Text color="current">A button-ish box</Text></Box>
      </Container>
    </Box>
  ),
};
