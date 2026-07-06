"use client";

import { Marquee, Text, Box } from "astralis-ui";

const stack = ["React", "TypeScript", "Tailwind", "Vite", "Next.js", "CVA", "pnpm"];

export function MarqueeDemo() {
  return (
    <Box w="full" maxW="md">
      <Marquee speed={40} gap="0.75rem" pauseOnHover gradient>
        {stack.map((name) => (
          <Marquee.Item key={name}>
            <Box border="normal" borderColor="subtle" bg="panel" px="4" py="2" rounded="full">
              <Text as="span" size="sm">{name}</Text>
            </Box>
          </Marquee.Item>
        ))}
      </Marquee>
    </Box>
  );
}
