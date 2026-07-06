"use client";

import { useState } from "react";
import { Field, Input, Switch, VStack } from "astralis-ui";

export function FieldError() {
  const [invalid, setInvalid] = useState(true);

  return (
    <VStack gap="5" alignItems="stretch" w="full" maxW="xs">
      <Switch checked={invalid} onChange={(e) => setInvalid(e.target.checked)} size="sm">
        Simulate a validation error
      </Switch>

      {/* One `invalid` flag restyles the input and swaps the message. */}
      <Field invalid={invalid} required>
        <Field.Label>Username</Field.Label>
        <Input placeholder="astro_naut" />
        {invalid ? (
          <Field.ErrorText>That username is already taken.</Field.ErrorText>
        ) : (
          <Field.HelpText>Letters, numbers and underscores only.</Field.HelpText>
        )}
      </Field>
    </VStack>
  );
}
