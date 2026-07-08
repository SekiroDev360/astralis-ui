"use client";

import { Button, HStack, Toaster, toast } from "astralis-ui";

export function ToastDemo() {
  return (
    <>
      {/* Mount ONE Toaster near your app root — it catches toasts from anywhere. */}
      <Toaster placement="bottom-end" />
      <HStack gap="3" wrap="wrap">
        <Button size="sm" colorScheme="blue" variant="subtle" onClick={() => toast.info("Heads up", { description: "A new version is available." })}>
          Info
        </Button>
        <Button size="sm" colorScheme="green" variant="subtle" onClick={() => toast.success("Deploy complete", { description: "v0.2.0 is live." })}>
          Success
        </Button>
        <Button size="sm" colorScheme="orange" variant="subtle" onClick={() => toast.warning("Approaching quota")}>
          Warning
        </Button>
        <Button size="sm" colorScheme="red" variant="subtle" onClick={() => toast.error("Payment failed", { description: "Your card was declined." })}>
          Error
        </Button>
      </HStack>
    </>
  );
}
