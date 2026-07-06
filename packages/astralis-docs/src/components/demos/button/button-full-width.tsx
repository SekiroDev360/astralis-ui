"use client";

import { Button, Icon, VStack } from "astralis-ui";
import { CreditCard } from "lucide-react";

export function ButtonFullWidth() {
  return (
    <VStack gap="3" w="full" maxW="sm">
      <Button fullWidth leftIcon={<Icon as={CreditCard} size="xs" />}>
        Complete checkout
      </Button>
      <Button fullWidth variant="outline" colorScheme="gray">
        Continue shopping
      </Button>
    </VStack>
  );
}
