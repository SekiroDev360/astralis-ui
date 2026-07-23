"use client";

import { useState } from "react";
import { Alert, Button, VStack } from "astralis-ui";

export function AlertVariants() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <VStack gap="3" alignItems="stretch" className="astralis:w-full astralis:max-w-xl">
      <Alert status="success" variant="subtle">
        <Alert.Title>subtle — the default tinted panel</Alert.Title>
      </Alert>
      <Alert status="success" variant="solid">
        <Alert.Title>solid — maximum emphasis</Alert.Title>
      </Alert>
      <Alert status="success" variant="outline">
        <Alert.Title>outline — quiet, keeps the surface</Alert.Title>
      </Alert>
      <Alert status="success" variant="left-accent">
        <Alert.Title>left-accent — editorial side rule</Alert.Title>
      </Alert>
      {dismissed ? (
        <Button size="sm" variant="subtle" onClick={() => setDismissed(false)}>
          Bring back the dismissible alert
        </Button>
      ) : (
        <Alert status="info" onClose={() => setDismissed(true)}>
          <Alert.Title>Dismissible</Alert.Title>
          <Alert.Description>The ✕ calls your onClose handler.</Alert.Description>
        </Alert>
      )}
    </VStack>
  );
}
