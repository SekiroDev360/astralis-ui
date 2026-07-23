"use client";

import { useState } from "react";
import { Switch } from "astralis-ui";

export function SwitchDemo() {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <Switch checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}>
      {isPublic ? "Profile is public" : "Profile is private"}
    </Switch>
  );
}
