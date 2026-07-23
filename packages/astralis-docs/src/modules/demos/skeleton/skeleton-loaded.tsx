"use client";

import { useState } from "react";
import { Avatar, Box, Button, HStack, Skeleton, Text, VStack } from "astralis-ui";

export function SkeletonLoaded() {
  const [loaded, setLoaded] = useState(false);

  return (
    <VStack gap="4" alignItems="start">
      <Box w="sm" maxW="full">
        <HStack gap="4" alignItems="center">
          <Skeleton variant="circle" loaded={loaded} className="astralis:size-12 astralis:shrink-0">
            <Avatar name="Nova Starling" />
          </Skeleton>
          <VStack gap="1" alignItems="stretch" className="astralis:flex-1">
            <Skeleton variant="text" loaded={loaded} className="astralis:w-1/2">
              <Text weight="semibold">Nova Starling</Text>
            </Skeleton>
            <Skeleton variant="text" loaded={loaded}>
              <Text size="sm" color="muted">Mission specialist · Astralis Station</Text>
            </Skeleton>
          </VStack>
        </HStack>
      </Box>
      <Button size="sm" variant="subtle" onClick={() => setLoaded((v) => !v)}>
        {loaded ? "Show skeleton" : "Finish loading"}
      </Button>
    </VStack>
  );
}
