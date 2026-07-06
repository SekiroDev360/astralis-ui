"use client";

import { Input, InputGroup, Icon, Text, VStack } from "astralis-ui";
import { Mail, Link2 } from "lucide-react";

export function InputGroupDemo() {
  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="xs">
      <InputGroup prefix={<Icon as={Mail} size="xs" />}>
        <Input placeholder="Email address" />
      </InputGroup>
      <InputGroup
        prefix={<Icon as={Link2} size="xs" />}
        suffix={<Text as="span" size="xs" color="subtle">.astralis.dev</Text>}
      >
        <Input placeholder="your-site" />
      </InputGroup>
    </VStack>
  );
}
