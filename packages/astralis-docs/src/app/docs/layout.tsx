import { Sidebar } from "@/components/site/sidebar";
import { Toc } from "@/components/site/toc";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex max-w-screen-2xl px-4 lg:px-8">
      <aside className="docs-scroll sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-stroke-subtle py-8 pr-3 lg:block">
        <Sidebar />
      </aside>

      <main className="min-w-0 flex-1 px-0 py-10 lg:px-12">
        <article className="mx-auto max-w-3xl">{children}</article>
      </main>

      <aside className="docs-scroll sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 xl:block">
        <Toc />
      </aside>
    </div>
  );
}
