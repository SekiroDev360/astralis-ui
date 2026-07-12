"use client";

import { useState } from "react";
import { Badge, Box, Button, HStack, Tag, Text, VStack, generateBrandTokens, useTheme } from "astralis-ui";

const PRESETS = [
  { name: "Default", color: undefined },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Ocean", color: "#0284c7" },
  { name: "Emerald", color: "#059669" },
  { name: "Rose", color: "#e11d48" },
];

export function BrandTheming() {
  const [brand, setBrand] = useState<string | undefined>("#8b5cf6");
  const { resolvedTheme } = useTheme();

  return (
    <VStack gap="5" alignItems="stretch" w="full" maxW="md">
      <HStack gap="2" wrap="wrap">
        {PRESETS.map((preset) => (
          <Button
            key={preset.name}
            size="xs"
            variant={brand === preset.color ? "solid" : "outline"}
            colorScheme="gray"
            onClick={() => setBrand(preset.color)}
          >
            {preset.name}
          </Button>
        ))}
        <input
          type="color"
          aria-label="Pick a custom brand color"
          value={brand ?? "#eab308"}
          onChange={(event) => setBrand(event.target.value)}
        />
      </HStack>

      {/* The same vars the provider injects for tokens={{ brandColor }} */}
      <Box p="5" rounded="xl" bg="subtle" style={generateBrandTokens(brand, resolvedTheme)}>
        <VStack gap="3" alignItems="start">
          <HStack gap="2" wrap="wrap">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="subtle">Subtle</Button>
            <Button size="sm" variant="outline">Outline</Button>
          </HStack>
          <HStack gap="2">
            <Badge>Badge</Badge>
            <Tag>Tag</Tag>
          </HStack>
          <Text size="sm" color="muted">
            One hex in, a full palette out — shades, hover states and a
            readable text color are all derived at runtime.
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
}
