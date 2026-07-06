"use client";

import { Marquee, Text, Box, VStack } from "astralis-ui";

const row1 = ["Semantic tokens", "Runtime theming", "Dark mode", "Responsive props"];
const row2 = ["Compound components", "Accent channel", "Zero build step", "Typed styles"];

export function MarqueeReverse() {
  return (
    /* Two rows in opposite directions — the classic logo-wall move. */
    <VStack gap="3" w="full" maxW="md">
      <Marquee speed={35} gap="0.75rem" gradient>
        {row1.map((label) => (
          <Marquee.Item key={label}>
            <Box bg="brand-subtle" px="4" py="1.5" rounded="full">
              <Text as="span" size="xs">{label}</Text>
            </Box>
          </Marquee.Item>
        ))}
      </Marquee>
      <Marquee speed={35} gap="0.75rem" gradient reverse>
        {row2.map((label) => (
          <Marquee.Item key={label}>
            <Box bg="purple-subtle" px="4" py="1.5" rounded="full">
              <Text as="span" size="xs">{label}</Text>
            </Box>
          </Marquee.Item>
        ))}
      </Marquee>
    </VStack>
  );
}
