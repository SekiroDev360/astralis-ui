"use client";

import { Field, Input, Box } from "astralis-ui";

export function FieldDemo() {
  return (
    <Box w="full" maxW="xs">
      <Field required>
        <Field.Label>Email address</Field.Label>
        <Input type="email" placeholder="you@example.com" />
        <Field.HelpText>We’ll never share your email.</Field.HelpText>
      </Field>
    </Box>
  );
}
