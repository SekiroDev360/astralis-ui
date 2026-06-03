"use client";

import { Tabs } from "astralis-ui";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function DocsNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Find active tab value based on the current pathname
  let tabValue = "get-started";
  if (pathname.includes("/documentation/components")) {
    tabValue = "components";
  } else if (pathname.includes("/documentation/styling")) {
    tabValue = "styling";
  } else if (pathname.includes("/documentation/theming")) {
    tabValue = "theming";
  }

  const tabs = [
    { value: "get-started", label: "Get Started", href: "/documentation/get-started" },
    { value: "components", label: "Components", href: "/documentation/components" },
    { value: "styling", label: "Styling", href: "/documentation/styling" },
    { value: "theming", label: "Theming", href: "/documentation/theming" },
  ];

  const handleValueChange = (value: string) => {
    router.push(`/documentation/${value}`);
  };

  return (
    <div className="w-full">
      <Tabs value={tabValue} onValueChange={handleValueChange}>
        <div className="flex flex-col items-center justify-center">
          <Tabs.List centered className="max-w-xl w-full border rounded-b-2xl px-5 py-2">
            {tabs?.map((item) => (
              <Tabs.Trigger key={item?.value} value={item?.value} className="astralis-px-0 astralis-py-0">
                <Link href={item.href}>
                  {item?.label}
                </Link>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
      </Tabs>
    </div>
  );
}
