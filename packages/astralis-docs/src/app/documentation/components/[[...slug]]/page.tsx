import LibraryComponents from "@/modules/docs/library-components";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0];

  if (!slug) {
    redirect("/documentation/components/tabs");
  }

  return <LibraryComponents slug={slug} />;
}
