import { Icon } from "astralis-ui";

export default function IconShowcase() {
  const builtinIcons = [
    { name: "Home" as const, label: "Home" },
    { name: "Search" as const, label: "Search" },
    { name: "Check" as const, label: "Check" },
    { name: "X" as const, label: "X" },
    { name: "ChevronDown" as const, label: "ChevronDown" },
    { name: "User" as const, label: "User" },
    { name: "Laptop" as const, label: "Laptop" },
    { name: "Phone" as const, label: "Phone" },
  ];

  const dynamicIcons = [
    { name: "Mail" as const, label: "Mail" },
    { name: "Heart" as const, label: "Heart" },
    { name: "Settings" as const, label: "Settings" },
    { name: "Bell" as const, label: "Bell" },
    { name: "Star" as const, label: "Star" },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Encapsulated Icon Component Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          The Icon component is powered by a private, dynamic Lucide-based registry inside <span className="font-semibold text-green-600 dark:text-green-400">astralis-ui</span>, allowing you to use any icon from the set with full autocomplete without installing lucide-react in your application.
        </p>
      </div>

      {/* Built-in Icons Grid */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">1. Standard Autocomplete Icons</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {builtinIcons.map((item) => (
            <div key={item.label} className="flex flex-col items-center justify-center p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50 gap-2">
              <Icon name={item.name} size="md" className="text-green-600 dark:text-green-400" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Icons Grid */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">2. Natively Supported Dynamic Icons (Private Abstraction)</h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {dynamicIcons.map((item) => (
            <div key={item.label} className="flex flex-col items-center justify-center p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50 gap-2">
              <Icon name={item.name} size="md" className="text-green-600 dark:text-green-400" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes Showcase */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">3. Dynamic Sizing</h4>
        <div className="flex flex-wrap items-center justify-around p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50 gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Home" size="xs" className="text-green-600 dark:text-green-400" />
            <span className="text-xs text-zinc-500">XS (16px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Home" size="sm" className="text-green-600 dark:text-green-400" />
            <span className="text-xs text-zinc-500">SM (20px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Home" size="md" className="text-green-600 dark:text-green-400" />
            <span className="text-xs text-zinc-500">MD (24px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Home" size="lg" className="text-green-600 dark:text-green-400" />
            <span className="text-xs text-zinc-500">LG (32px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Home" size="xl" className="text-green-600 dark:text-green-400" />
            <span className="text-xs text-zinc-500">XL (40px)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
