import type { ReactNode } from "react";
import DocsNavbar from "@/modules/docs/components/navbar";

export default function DocumentationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <DocsNavbar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
