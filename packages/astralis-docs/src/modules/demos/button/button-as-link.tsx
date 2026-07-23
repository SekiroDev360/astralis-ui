"use client";

import { Button, Icon, HStack } from "astralis-ui";
import { ExternalLink } from "lucide-react";

export function ButtonAsLink() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      {/* Renders a real <a>; href/target come from the anchor's prop types. */}
      <Button
        as="a"
        href="https://github.com"
        target="_blank"
        variant="surface"
        rightIcon={<Icon as={ExternalLink} size="xs" />}
      >
        View on GitHub
      </Button>
      <Button as="a" href="#usage" variant="link">
        Jump to usage
      </Button>
    </HStack>
  );
}
