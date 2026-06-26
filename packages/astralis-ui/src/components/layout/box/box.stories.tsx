import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Flex } from "../flex";
import { VStack, HStack } from "../stack";
import Box from "./box";

/**
 * Box is the most primitive building block in Astralis UI — a polymorphic element
 * that exposes the full set of style props (spacing, sizing, color, border, radius,
 * shadow, position, overflow, etc.). Every other layout component is built on top of it.
 *
 * Box is transparent by default; `bg` is opt-in so nested layers composite cleanly.
 * Every style prop also accepts a responsive object, e.g. `p={{ base: "2", md: "6" }}`.
 */
const meta: Meta<typeof Box> = {
  title: "Components/Layout/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "text" },
      description: "The HTML element or React component to render as.",
      table: { defaultValue: { summary: "div" } },
    },
    bg: {
      control: { type: "text" },
      description: "Background color — semantic token, palette shade, or brand.",
    },
    p: { control: { type: "text" }, description: "Padding (spacing scale)." },
    rounded: { control: { type: "text" }, description: "Border radius." },
    shadow: { control: { type: "text" }, description: "Elevation / box-shadow." },
    border: { control: { type: "text" }, description: "Border width." },
    borderColor: { control: { type: "text" }, description: "Border color token." },
    w: { control: { type: "text" }, description: "Width (sizing scale)." },
    h: { control: { type: "text" }, description: "Height (sizing scale)." },
    display: { control: { type: "text" }, description: "CSS display." },
    children: { control: { type: "text" }, description: "Box content." },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The most abstract styling primitive in Astralis UI, on top of which all other components are built.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

const Swatch = ({ children }: { children: React.ReactNode }) => (
  <Box bg="brand-500" color="white" px="3" py="2" rounded="md" display="inline-block">
    {children}
  </Box>
);

/** Basic Box with a handful of style props applied together. */
export const Usage: Story = {
  render: () => (
    <Box bg="muted" p="8" rounded="xl" border="normal" borderColor="base" w="full">
      <Text>This is a Box</Text>
    </Box>
  ),
};

/** Padding (`p`, `px`, `py`, `pt/pr/pb/pl`) and margin (`m`, `mx`, `my`, …) use the spacing scale. */
export const Spacing: Story = {
  render: () => (
    <VStack gap="6" w="full">
      <VStack gap="2" alignItems="start" w="full">
        <Text size="sm" color="muted">Padding — p="2" → p="8"</Text>
        <HStack gap="3" alignItems="end" wrap="wrap">
          {(["2", "4", "6", "8"] as const).map((p) => (
            <Box key={p} bg="subtle" border="normal" borderColor="muted" rounded="md" p={p}>
              <Box bg="blue-solid" w="12" h="12" rounded="sm" />
            </Box>
          ))}
        </HStack>
      </VStack>
      <VStack gap="2" alignItems="start" w="full">
        <Text size="sm" color="muted">Margin — mt on the inner box</Text>
        <HStack gap="3" alignItems="start">
          {(["0.5", "2", "4", "8"] as const).map((m) => (
            <Box key={m} bg="subtle" border="normal" borderColor="muted" rounded="md">
              <Box bg="green-solid" w="12" h="12" rounded="sm" mt={m} mx="2" mb="2" />
            </Box>
          ))}
        </HStack>
      </VStack>
    </VStack>
  ),
};

/** Width/height (`w`, `h`, `minW/maxW`, `minH/maxH`, `size`) accept numbers, fractions, t-shirt sizes, and keywords. */
export const Sizing: Story = {
  render: () => (
    <VStack gap="3" w="full">
      <Text size="sm" color="muted">w — fractions of the container</Text>
      {(["1/4", "1/2", "3/4", "full"] as const).map((w) => (
        <Box key={w} bg="brand-500" color="white" w={w} px="3" py="2" rounded="md">
          <Text color="current" size="sm">w="{w}"</Text>
        </Box>
      ))}
      <Text size="sm" color="muted">size — equal width & height</Text>
      <HStack gap="3" alignItems="end">
        {(["10", "16", "20"] as const).map((s) => (
          <Box key={s} bg="blue-solid" size={s} rounded="md" />
        ))}
      </HStack>
    </VStack>
  ),
};

/** `bg` accepts semantic surface tokens, any palette shade, or the dynamic brand scale. */
export const BackgroundColors: Story = {
  render: () => (
    <VStack gap="6" w="full">
      <VStack gap="2" alignItems="start" w="full">
        <Text size="sm" color="muted">Semantic surfaces</Text>
        <Flex gap="3" wrap="wrap">
          {(["base", "muted", "subtle", "info", "success", "warning", "error"] as const).map((bg) => (
            <Box key={bg} bg={bg} border="normal" borderColor="muted" px="4" py="3" rounded="md">
              <Text size="sm">{bg}</Text>
            </Box>
          ))}
        </Flex>
      </VStack>
      <VStack gap="2" alignItems="start" w="full">
        <Text size="sm" color="muted">Brand scale (driven by the theme token)</Text>
        <Flex rounded="md" overflow="hidden">
          {(["100", "300", "500", "700", "900"] as const).map((shade) => (
            <Box key={shade} bg={`brand-${shade}` as "brand-500"} w="16" h="12" />
          ))}
        </Flex>
      </VStack>
    </VStack>
  ),
};

/** Border width (`border`), style (`borderStyle`) and color (`borderColor`) are independent props. */
export const Borders: Story = {
  render: () => (
    <VStack gap="6" w="full">
      <HStack gap="4" wrap="wrap">
        {(["normal", "moderate", "thick", "thicker"] as const).map((b) => (
          <Box key={b} border={b} borderColor="base" px="4" py="3" rounded="md">
            <Text size="sm">border="{b}"</Text>
          </Box>
        ))}
      </HStack>
      <HStack gap="4" wrap="wrap">
        {(["solid", "dashed", "dotted", "double"] as const).map((s) => (
          <Box key={s} border="thick" borderStyle={s} borderColor="brand-500" px="4" py="3" rounded="md">
            <Text size="sm">{s}</Text>
          </Box>
        ))}
      </HStack>
    </VStack>
  ),
};

/** `rounded` sets every corner; `roundedT/R/B/L` and per-corner props target a side or corner. */
export const Rounded: Story = {
  render: () => (
    <VStack gap="6" w="full">
      <HStack gap="4" wrap="wrap" alignItems="end">
        {(["none", "sm", "md", "lg", "xl", "2xl", "full"] as const).map((r) => (
          <VStack key={r} gap="1" alignItems="center">
            <Box bg="brand-500" w="16" h="16" rounded={r} />
            <Text size="xs" color="muted">{r}</Text>
          </VStack>
        ))}
      </HStack>
      <HStack gap="4">
        <Box bg="blue-solid" w="20" h="16" roundedT="2xl" />
        <Box bg="blue-solid" w="20" h="16" roundedTl="2xl" roundedBr="2xl" />
      </HStack>
    </VStack>
  ),
};

/** `shadow` applies elevation; values deepen automatically in dark mode. */
export const Shadow: Story = {
  render: () => (
    <Flex gap="8" wrap="wrap" p="4">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
        <VStack key={s} gap="2" alignItems="center">
          <Box bg="base" border="normal" borderColor="subtle" w="24" h="24" rounded="lg" shadow={s} />
          <Text size="xs" color="muted">shadow="{s}"</Text>
        </VStack>
      ))}
    </Flex>
  ),
};

/** Use `position` with the offset props (`inset`, `top`, `right`, `bottom`, `left`) to place children. */
export const Positioning: Story = {
  render: () => (
    <Box position="relative" bg="subtle" w="full" h="48" rounded="lg" border="normal" borderColor="muted">
      <Box position="absolute" top="2" left="2"><Swatch>top/left</Swatch></Box>
      <Box position="absolute" top="2" right="2"><Swatch>top/right</Swatch></Box>
      <Box position="absolute" bottom="2" left="2"><Swatch>bottom/left</Swatch></Box>
      <Box position="absolute" bottom="2" right="2"><Swatch>bottom/right</Swatch></Box>
      <Box position="absolute" top="1/2" left="1/2"><Swatch>center-ish</Swatch></Box>
    </Box>
  ),
};

/** `overflow` (and `overflowX`/`overflowY`) control clipping and scrolling. */
export const Overflow: Story = {
  render: () => (
    <Box overflowY="auto" h="40" w="full" maxW="sm" bg="subtle" rounded="lg" border="normal" borderColor="muted" p="4">
      <Text>
        This Box has a fixed height with overflowY="auto". When the content exceeds the
        available space it becomes scrollable. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
      </Text>
    </Box>
  ),
};

/** `aspectRatio` locks an element's proportions using the named aspect tokens. */
export const AspectRatio: Story = {
  render: () => (
    <Flex gap="4" wrap="wrap">
      {(["square", "landscape", "portrait", "wide"] as const).map((a) => (
        <Flex key={a} aspectRatio={a} w="40" bg="brand-500" color={'white'} rounded="lg" alignItems="center" justifyContent="center">
          <Text color="current" size="sm">{a}</Text>
        </Flex>
      ))}
    </Flex>
  ),
};

/** `opacity` applies a token-based transparency level. */
export const Opacity: Story = {
  render: () => (
    <HStack gap="4" wrap="wrap">
      {(["lowest", "low", "moderate", "high", "max"] as const).map((o) => (
        <VStack key={o} gap="1" alignItems="center">
          <Box bg="brand-500" w="16" h="16" rounded="md" opacity={o} />
          <Text size="xs">{o}</Text>
        </VStack>
      ))}
    </HStack>
  ),
};

/** Every style prop accepts a responsive map — resize the canvas to see it change. */
export const Responsive: Story = {
  render: () => (
    <Box
      bg={{ base: "red-solid", md: "yellow-solid", lg: "green-solid" }}
      p={{ base: "4", md: "8" }}
      rounded={{ base: "md", lg: "2xl" }}
      w="full"
      color="white"
    >
      <Text color="current">
        bg + padding + radius change at the md and lg breakpoints.
      </Text>
    </Box>
  ),
};

/** The `as` prop renders any element/component while keeping all style props. */
export const Polymorphism: Story = {
  render: () => (
    <VStack gap="3" w="full" alignItems="start">
      <Box as="section" bg="subtle" p="4" rounded="md" w="full"><Text>as="section"</Text></Box>
      <Box as="a" href="#" bg="brand-solid" color="white" px="4" py="2" rounded="md" cursor="pointer">
        <Text color="current">as="a" (anchor)</Text>
      </Box>
      <Box as="button" bg="blue-solid" color="white" px="4" py="2" rounded="md" border="normal" borderColor="info">
        <Text color="current">as="button"</Text>
      </Box>
    </VStack>
  ),
};
