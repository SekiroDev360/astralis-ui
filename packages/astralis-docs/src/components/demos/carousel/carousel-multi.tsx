"use client";

import { Carousel, Center, Text, Box } from "astralis-ui";

export function CarouselMulti() {
  return (
    <Box w="full" maxW="md">
      {/* Fractional slidesPerView peeks the next slide — a strong swipe cue. */}
      <Carousel slidesPerView={1.5} slideGap={12} loop>
        <Carousel.Track>
          {[1, 2, 3, 4, 5].map((n) => (
            <Carousel.Slide key={n}>
              <Center bg="green-subtle" h="28" rounded="xl">
                <Text weight="medium">{n}</Text>
              </Center>
            </Carousel.Slide>
          ))}
        </Carousel.Track>
        <Carousel.Control>
          <Carousel.Prev />
          <Carousel.Indicators variant="number" />
          <Carousel.Next />
        </Carousel.Control>
      </Carousel>
    </Box>
  );
}
