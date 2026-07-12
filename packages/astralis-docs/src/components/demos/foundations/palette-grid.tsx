import { Box, Grid, HStack, Text, VStack } from "astralis-ui";

const HUES = [
  "gray", "red", "orange", "yellow", "green",
  "teal", "blue", "cyan", "purple", "pink",
] as const;

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

export function PaletteGrid() {
  return (
    <VStack gap="2" alignItems="stretch" w="full">
      {HUES.map((hue) => (
        <HStack key={hue} gap="3" alignItems="center">
          <Box w="16">
            <Text as="span" size="xs" weight="medium" color="muted">
              {hue}
            </Text>
          </Box>
          <Grid columns="11" gap="1" w="full">
            {STEPS.map((step) => (
              <Box
                key={step}
                h="8"
                rounded="md"
                title={`${hue}-${step}`}
                style={{ background: `var(--astralis-color-${hue}-${step})` }}
              />
            ))}
          </Grid>
        </HStack>
      ))}
    </VStack>
  );
}
