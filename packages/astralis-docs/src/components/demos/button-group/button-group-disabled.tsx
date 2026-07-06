import { Button, ButtonGroup } from "astralis-ui";

export function ButtonGroupDisabled() {
  return (
    <ButtonGroup disabled variant="outline" colorScheme="gray">
      <Button>Cut</Button>
      <Button>Copy</Button>
      <Button>Paste</Button>
    </ButtonGroup>
  );
}
