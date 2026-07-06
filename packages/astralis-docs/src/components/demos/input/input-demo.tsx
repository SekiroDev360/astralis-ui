"use client";

import { Input, Box } from "astralis-ui";

export function InputDemo() {
  return (
    <Box w="full" maxW="xs">
      <Input placeholder="you@example.com" type="email" />
    </Box>
  );
}
