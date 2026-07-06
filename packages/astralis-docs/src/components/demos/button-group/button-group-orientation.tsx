import { Button, ButtonGroup, HStack } from "astralis-ui";

export function ButtonGroupOrientation() {
  return (
    <HStack gap="8" alignItems="start">
      <ButtonGroup orientation="vertical" variant="surface">
        <Button>Profile</Button>
        <Button>Settings</Button>
        <Button>Sign out</Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical" attached variant="outline" colorScheme="gray">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>
    </HStack>
  );
}
