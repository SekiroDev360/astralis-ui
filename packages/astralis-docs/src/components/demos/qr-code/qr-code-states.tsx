"use client";

import { useState } from "react";
import { QrCode, Center, Text, HStack, VStack } from "astralis-ui";

export function QrCodeStates() {
  const [expired, setExpired] = useState(true);

  return (
    <HStack gap="6" wrap="wrap" alignItems="start" justifyContent="center">
      <VStack gap="1">
        <Text as="span" size="xs" color="muted">overlay + download</Text>
        <QrCode
          value="https://astralis.dev/docs"
          size="sm"
          errorLevel="H"
          downloadable
          overlay={
            <Center bg="inverted" size="full" rounded="sm">
              <Text as="span" size="xs" color="inverted" weight="bold">A</Text>
            </Center>
          }
        />
      </VStack>
      <VStack gap="1">
        <Text as="span" size="xs" color="muted">expired → refresh</Text>
        <QrCode
          value="https://astralis.dev/session"
          size="sm"
          status={expired ? "expired" : "active"}
          onRefresh={() => setExpired(false)}
        />
      </VStack>
      <VStack gap="1">
        <Text as="span" size="xs" color="muted">scanned</Text>
        <QrCode value="https://astralis.dev" size="sm" status="scanned" />
      </VStack>
    </HStack>
  );
}
