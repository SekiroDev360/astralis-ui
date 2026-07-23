"use client";

import { useState } from "react";
import { Button, HStack } from "astralis-ui";

export function ButtonLoading() {
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  };

  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <Button loading>Loading</Button>
      <Button variant="outline" loading loadingText="Submitting…" />
      <Button variant="subtle" loading loaderPlacement="end" loadingText="Uploading" />
      <Button onClick={save} loading={saving} loadingText="Saving…">
        Click to save
      </Button>
    </HStack>
  );
}
