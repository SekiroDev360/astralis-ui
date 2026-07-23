"use client";

import { Modal, Button, Text } from "astralis-ui";

export function ModalDemo() {
  return (
    <Modal>
      <Modal.Trigger>
        <Button>Delete project</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Delete this project?</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Modal.Description>
            This permanently removes the project and all of its data.
          </Modal.Description>
          <Text size="sm" color="muted">
            Type the project name to confirm — just kidding, this is a demo.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="text" colorScheme="gray">Cancel</Button>
          </Modal.Close>
          <Modal.Close>
            <Button colorScheme="red">Delete</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
