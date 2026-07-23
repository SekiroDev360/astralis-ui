import fs from "fs";
import path from "path";
import { demos } from "@/modules/demos";
import { CodeBlock } from "./code-block";
import { PreviewTabs } from "./preview-tabs";

interface ComponentPreviewProps {
  /** Registry key of the demo (see src/modules/demos/index.ts). */
  name: keyof typeof demos;
  align?: "center" | "start";
}

/**
 * Live demo + its own source. The code tab shows the demo file verbatim from
 * disk, so example code can never drift from what actually renders.
 */
export function ComponentPreview({ name, align }: ComponentPreviewProps) {
  const demo = demos[name];
  if (!demo) {
    throw new Error(`[docs] Unknown demo "${String(name)}" — add it to src/modules/demos/index.ts`);
  }

  const source = fs.readFileSync(
    path.join(process.cwd(), "src", "modules", "demos", demo.file),
    "utf8",
  );

  const Demo = demo.component;

  return (
    <PreviewTabs
      align={align}
      preview={<Demo />}
      code={<CodeBlock code={source} lang="tsx" />}
    />
  );
}
