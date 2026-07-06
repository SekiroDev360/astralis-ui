"use client";

import { Carousel, Center, Text, Box } from "astralis-ui";

const slides = [
  { label: "Slide one", bg: "brand-subtle" },
  { label: "Slide two", bg: "teal-subtle" },
  { label: "Slide three", bg: "purple-subtle" },
] as const;

export function CarouselDemo() {
  return (
    <Box w="full" maxW="md">
      <Carousel>
        <Carousel.Track>
          {slides.map((slide) => (
            <Carousel.Slide key={slide.label}>
              <Center bg={slide.bg} h="40" rounded="xl">
                <Text weight="medium">{slide.label}</Text>
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
