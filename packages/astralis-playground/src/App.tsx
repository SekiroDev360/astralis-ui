import { useEffect } from "react";
import { Button, Text, useTheme } from "astralis-ui";
// import TypographyShowcase from "./components/Typography";
// import NavigationShowcase from "./components/Navigation";
// import DisclosureShowcase from "./components/Disclosure";
// import IconCategoryShowcase from "./components/Icon";
// import OverlayShowcase from "./components/Overlay";
// import ButtonsShowcase from "./components/Buttons";
// import DataEntryShowcase from "./components/DataEntry";
// import DataDisplayShowcase from "./components/DataDisplay";
// import LayoutShowcase from "./components/Layout";

function App() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="">
      <Button className="bg-blue-600">Paul</Button>
      <p className="border text-yellow-500">dfghjkl</p>

      {/* Premium Header */}
      {/* <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Astralis UI
            </span>
            <span className="text-xs px-2.5 py-0.5 font-medium rounded-full bg-green-100 dark:bg-green-950/55 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/40">
              Green Theme Active
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm transition-all duration-200"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <span>☀️ Light Mode</span>
                </>
              ) : (
                <>
                  <span>🌙 Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header> */}

      {/* Main Content Showcase */}
      {/* <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
        <section className="flex flex-col gap-4">
          <IconCategoryShowcase />
        </section>

        <section className="flex flex-col gap-4">
          <ButtonsShowcase />
        </section>

        <section className="flex flex-col gap-4">
          <DataEntryShowcase />
        </section>

        <section className="flex flex-col gap-4">
          <NavigationShowcase />
        </section>

        <section className="flex flex-col gap-4">
          <DisclosureShowcase />
        </section>

        <section className="flex flex-col gap-4">
          <LayoutShowcase />
        </section>

        <section className="flex flex-col gap-4">
          <DataDisplayShowcase />
        </section>

        <section className="flex flex-col gap-4">
          <OverlayShowcase />
        </section>

        <section className="flex flex-col gap-4">
          <TypographyShowcase />
        </section>
      </main> */}
    </div>
  );
}

export default App;
