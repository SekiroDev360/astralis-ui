import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./index";
import { Button } from "../../buttons/button";
import { HStack } from "../../layout/stack";
import { Text } from "../../typography/text";

/**
 * Modal is a focus-trapped, accessible dialog. Compose it from `Modal.Trigger`,
 * `Modal.Content`, and the structural parts (`Header`/`Body`/`Footer`/`Title`/
 * `Description`/`CloseButton`). `Modal.Close` wraps any element to close on click.
 */
const meta: Meta<typeof Modal> = {
  title: "Components/Overlay/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

/** A confirm dialog with a title, description, and footer actions. */
export const Basic: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger><Button>Delete project</Button></Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Delete project</Modal.Title>
          <Modal.Description>This action cannot be undone.</Modal.Description>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text>Are you sure you want to delete this project? All of its data will be permanently removed.</Text>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close><Button variant="text" colorScheme="gray">Cancel</Button></Modal.Close>
          <Modal.Close><Button colorScheme="red">Delete</Button></Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};

/** Sizes from `sm` to `full`. */
export const Sizes: Story = {
  render: () => (
    <HStack gap="3">
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <Modal key={size} size={size}>
          <Modal.Trigger><Button variant="outline" colorScheme="gray">{size}</Button></Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Size = {size}</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body><Text>The panel width scales with the `size` prop.</Text></Modal.Body>
          </Modal.Content>
        </Modal>
      ))}
    </HStack>
  ),
};

/** `centered={false}` anchors the panel toward the top. */
export const TopAligned: Story = {
  render: () => (
    <Modal centered={false}>
      <Modal.Trigger><Button>Open (top-aligned)</Button></Modal.Trigger>
      <Modal.Content>
        <Modal.Header><Modal.Title>Top-aligned</Modal.Title><Modal.CloseButton /></Modal.Header>
        <Modal.Body><Text>Useful for tall content that should start near the top of the viewport.</Text></Modal.Body>
      </Modal.Content>
    </Modal>
  ),
};
