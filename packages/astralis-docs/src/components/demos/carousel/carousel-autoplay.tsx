"use client";

import { Carousel, Center, Text, Box } from "astralis-ui";

export function CarouselAutoplay() {
  return (
    <Box w="full" maxW="md">
      <Carousel autoPlay autoPlayInterval={2500} loop>
        <Carousel.Track>
          {["Aurora", "Nebula", "Quasar"].map((name) => (
            <Carousel.Slide key={name}>
              <Center bg="blue-subtle" h="32" rounded="xl">
                <Text weight="medium">{name}</Text>
              </Center>
            </Carousel.Slide>
          ))}
        </Carousel.Track>
        <Carousel.Control>
          <Carousel.AutoPlayTrigger />
          <Carousel.Indicators variant="line" />
          <Carousel.ProgressText />
        </Carousel.Control>
      </Carousel>
    </Box>
  );
}
