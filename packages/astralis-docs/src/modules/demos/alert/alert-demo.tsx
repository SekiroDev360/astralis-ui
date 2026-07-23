"use client";

import { Alert, VStack } from "astralis-ui";

export function AlertDemo() {
  return (
    <VStack gap="3" alignItems="stretch" className="astralis:w-full astralis:max-w-xl">
      <Alert status="info">
        <Alert.Title>Scheduled maintenance</Alert.Title>
        <Alert.Description>The dashboard will be read-only on Saturday from 02:00–04:00 UTC.</Alert.Description>
      </Alert>
      <Alert status="success">
        <Alert.Title>Deploy complete</Alert.Title>
        <Alert.Description>v0.2.0 is live on all regions.</Alert.Description>
      </Alert>
      <Alert status="warning">
        <Alert.Title>Approaching quota</Alert.Title>
        <Alert.Description>You have used 90% of this month&apos;s build minutes.</Alert.Description>
      </Alert>
      <Alert status="error">
        <Alert.Title>Payment failed</Alert.Title>
        <Alert.Description>Your card was declined — update billing to keep deploys running.</Alert.Description>
      </Alert>
    </VStack>
  );
}
