"use client";
import { useState } from "react";
import DocsNavbar from "./components/navbar";
import GetStarted from "./get-started";
import LibraryComponents from "./library-components";

export default function DocumentationPage() {
  const [tabValue, setTabValue] = useState("components");

  const updateTab = (value: string) => {
    setTabValue(value);
  };

  return (
    <div>
      <DocsNavbar tabValue={tabValue} updateTab={updateTab} />

      {tabValue == 'get-started' && <GetStarted/>}
      {tabValue == 'components' && <LibraryComponents/>}
      {tabValue == 'styling' && <LibraryComponents/>}
      {tabValue == 'theming' && <LibraryComponents/>}
    </div>
  );
}
