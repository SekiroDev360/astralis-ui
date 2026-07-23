"use client";

import { useState } from "react";
import { Modal, Button } from "astralis-ui";

export function ModalControlled() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setOpen(false); // close only after the work finishes
    }, 1200);
  };

  return (
    <Modal open={open} onOpenChange={setOpen} closeOnOverlayClick={false}>
      <Modal.Trigger>
        <Button variant="subtle">Edit profile</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Edit profile</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Modal.Description>
            Controlled mode: the modal stays open until saving completes, and
            overlay clicks are disabled.
          </Modal.Description>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="text" colorScheme="gray">Cancel</Button>
          </Modal.Close>
          <Button onClick={save} loading={saving} loadingText="Saving…">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
