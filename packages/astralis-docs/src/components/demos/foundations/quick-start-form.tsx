"use client";

import { useState } from "react";
import { Alert, Box, Button, Card, Field, Input, VStack } from "astralis-ui";

export function QuickStartForm() {
  const [sent, setSent] = useState(false);

  return (
    <Box w="full" maxW="sm">
      <Card>
        <Card.Header>
          <Card.Title>Create account</Card.Title>
          <Card.Description>Start your 14-day trial.</Card.Description>
        </Card.Header>
        <Card.Body>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <VStack gap="4" alignItems="stretch">
              <Field required>
                <Field.Label>Email</Field.Label>
                <Input type="email" name="email" placeholder="you@example.com" />
                <Field.HelpText>We&apos;ll send a confirmation link.</Field.HelpText>
              </Field>
              {sent && (
                <Alert status="success">
                  <Alert.Title>Check your inbox</Alert.Title>
                </Alert>
              )}
              <Button type="submit" fullWidth>
                Sign up
              </Button>
            </VStack>
          </form>
        </Card.Body>
      </Card>
    </Box>
  );
}
