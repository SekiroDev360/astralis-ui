import type { Metadata } from "next";
import { ThemeBuilder } from "@/modules/theme-builder";

export const metadata: Metadata = {
  title: "Theme Builder",
  description:
    "Design your Astralis theme visually — color, size, typography and motion tokens with a live component canvas, exported as one stylesheet.",
};

export default function ThemesPage() {
  return (
    <main className="flex h-[calc(100vh-3.5rem)] min-h-0 flex-col p-4 lg:overflow-hidden lg:p-5">
      <ThemeBuilder />
    </main>
  );
}
