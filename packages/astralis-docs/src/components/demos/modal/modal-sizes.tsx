"use client";

import { Modal, Button, HStack } from "astralis-ui";

const sizes = ["sm", "md", "lg", "xl", "full"] as const;

export function ModalSizes() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      {sizes.map((size) => (
        <Modal key={size} size={size}>
          <Modal.Trigger>
            <Button variant="outline" colorScheme="gray" size="sm">
              {size}
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Size {size}</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              <Modal.Description>
                The panel width tracks the size prop; full covers the viewport.
              </Modal.Description>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      ))}
    </HStack>
  );
}
