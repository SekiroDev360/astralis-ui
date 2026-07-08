"use client";

import { Button, HStack, toast } from "astralis-ui";

export function ToastOptions() {
  return (
    <HStack gap="3" wrap="wrap">
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          toast({
            title: "File deleted",
            description: "report-final-v2.pdf was moved to trash.",
            status: "info",
            action: { label: "Undo", onClick: () => toast.success("Restored") },
          })
        }
      >
        With action
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          toast({
            title: "Copies itself to your clipboard history",
            duration: null,
            status: "warning",
          })
        }
      >
        Sticky (duration: null)
      </Button>
      <Button size="sm" variant="text" colorScheme="gray" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </HStack>
  );
}
