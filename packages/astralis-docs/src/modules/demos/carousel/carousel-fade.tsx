"use client";

import { Carousel, Center, Text, Box } from "astralis-ui";

export function CarouselFade() {
  return (
    <Box w="full" maxW="md">
      <Carousel animation="fade" speed={500} loop colorScheme="pink">
        <Carousel.Track>
          {["First", "Second", "Third"].map((label) => (
            <Carousel.Slide key={label}>
              <Center bg="pink-subtle" h="32" rounded="xl">
                <Text weight="medium">{label} slide</Text>
              </Center>
            </Carousel.Slide>
          ))}
        </Carousel.Track>
        <Carousel.Control>
          <Carousel.Prev />
          <Carousel.Indicators />
          <Carousel.Next />
        </Carousel.Control>
      </Carousel>
    </Box>
  );
}
