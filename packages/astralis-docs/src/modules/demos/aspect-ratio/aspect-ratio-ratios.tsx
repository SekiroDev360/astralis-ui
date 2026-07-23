import { AspectRatio, Center, Text, Grid, VStack } from "astralis-ui";

const ratios = ["square", "landscape", "portrait", "wide", "golden"] as const;

export function AspectRatioRatios() {
  return (
    <Grid columns={{ base: "2", md: "3" }} gap="4" w="full" maxW="md" alignItems="end">
      {ratios.map((ratio) => (
        <VStack key={ratio} gap="1" alignItems="stretch">
          <Text as="span" size="xs" color="muted">{ratio}</Text>
          <AspectRatio ratio={ratio} rounded="lg" overflow="hidden">
            <Center bg="pink-subtle">
              <Text size="xs" color="muted">{ratio}</Text>
            </Center>
          </AspectRatio>
        </VStack>
      ))}
    </Grid>
  );
}
