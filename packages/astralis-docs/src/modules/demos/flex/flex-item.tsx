"use client";

import { Flex, Center, Text } from "astralis-ui";

export function FlexItem() {
  return (
    <Flex gap="3" w="full" maxW="md">
      <Flex.Item basis="24">
        <Center bg="brand-subtle" p="3" rounded="lg">
          <Text size="xs">basis 24</Text>
        </Center>
      </Flex.Item>
      <Flex.Item grow>
        <Center bg="brand-muted" p="3" rounded="lg">
          <Text size="xs">grow</Text>
        </Center>
      </Flex.Item>
      <Flex.Item order="first">
        <Center bg="brand-solid" p="3" rounded="lg">
          <Text size="xs" color="inverted">order first</Text>
        </Center>
      </Flex.Item>
    </Flex>
  );
}
