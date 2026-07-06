import { Button, ButtonGroup } from "astralis-ui";

export function ButtonGroupDemo() {
  return (
    <ButtonGroup variant="outline" colorScheme="gray">
      <Button>Save draft</Button>
      <Button>Preview</Button>
      {/* An explicit prop on a child always wins over the group default. */}
      <Button variant="solid" colorScheme="brand">
        Publish
      </Button>
    </ButtonGroup>
  );
}
