import { useState } from "react";
import { Tag, Icon } from "astralis-ui";

export default function TagShowcase() {
  const colorSchemes = ["neutral", "primary", "success", "warning", "danger", "blue"] as const;
  const sizes = ["sm", "md", "lg"] as const;

  // Closable tag list state
  const [closableTags, setClosableTags] = useState([
    { id: "react", label: "React" },
    { id: "tailwind", label: "Tailwind CSS" },
    { id: "typescript", label: "TypeScript" },
    { id: "vite", label: "Vite" },
  ]);

  const removeTag = (id: string) => {
    setClosableTags((prev) => prev.filter((t) => t.id !== id));
  };

  const resetClosableTags = () => {
    setClosableTags([
      { id: "react", label: "React" },
      { id: "tailwind", label: "Tailwind CSS" },
      { id: "typescript", label: "TypeScript" },
      { id: "vite", label: "Vite" },
    ]);
  };

  // Checkable Tag states
  const [singleValue, setSingleValue] = useState<Array<string | number>>(["frontend"]);
  const [multiValue, setMultiValue] = useState<Array<string | number>>(["music", "travel"]);

  const singleOptions = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Fullstack", value: "fullstack" },
  ];

  const multiOptions = [
    { label: "Music 🎵", value: "music" },
    { label: "Travel ✈️", value: "travel" },
    { label: "Gaming 🎮", value: "gaming" },
    { label: "Reading 📚", value: "reading" },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Tag & Metadata Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Visual keywords, categorical attributes, and interactive selectors. Supports closable tags, custom icon anchors, and single/multiple checkable select groups.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Style Variants Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Subtle, Solid & Outline Variants
          </span>
          <div className="flex flex-col gap-4">
            {/* Subtle */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs text-zinc-400 w-16">Subtle:</span>
              {colorSchemes.map((scheme) => (
                <Tag key={scheme} variant="subtle" colorScheme={scheme}>
                  {scheme}
                </Tag>
              ))}
            </div>
            {/* Solid */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs text-zinc-400 w-16">Solid:</span>
              {colorSchemes.map((scheme) => (
                <Tag key={scheme} variant="solid" colorScheme={scheme}>
                  {scheme}
                </Tag>
              ))}
            </div>
            {/* Outline */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs text-zinc-400 w-16">Outline:</span>
              {colorSchemes.map((scheme) => (
                <Tag key={scheme} variant="outline" colorScheme={scheme}>
                  {scheme}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        {/* Sizes & Icons Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Dynamic Sizing & Icon Placement
          </span>
          <div className="flex flex-wrap gap-6 items-center">
            {sizes.map((sz) => (
              <div key={sz} className="flex items-center gap-3">
                <Tag size={sz} variant="subtle" colorScheme="primary" startElement={<Icon name="Home" size="xs" />}>
                  Start Icon
                </Tag>
                <Tag size={sz} variant="subtle" colorScheme="success" endElement={<Icon name="Check" size="xs" />}>
                  End Icon
                </Tag>
                <span className="text-xs font-mono text-zinc-400 capitalize">({sz})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closable Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Closable Tags (Interactive Deletions)
          </span>
          <div className="flex flex-wrap gap-3 items-center">
            {closableTags.length > 0 ? (
              closableTags.map((tag) => (
                <Tag
                  key={tag.id}
                  variant="subtle"
                  colorScheme="danger"
                  closable
                  onClose={() => removeTag(tag.id)}
                >
                  {tag.label}
                </Tag>
              ))
            ) : (
              <span className="text-sm text-zinc-400">All tags removed.</span>
            )}
            {closableTags.length < 4 && (
              <button
                onClick={resetClosableTags}
                className="text-xs font-semibold text-green-600 dark:text-green-400 hover:underline focus:outline-none ml-2"
              >
                Reset tags
              </button>
            )}
          </div>
        </div>

        {/* Checkable Tag Groups Section */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            4. Checkable Tag Groups (Tactile Toggle Selectors)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Single Select */}
            <div className="flex flex-col gap-3">
              <span className="text-xs text-zinc-400 font-semibold">Single Select Mode:</span>
              <div className="p-4 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-800 rounded-lg">
                <Tag.Group
                  options={singleOptions}
                  value={singleValue}
                  onChange={setSingleValue}
                  multiple={false}
                  size="md"
                />
              </div>
              <span className="text-xs text-zinc-400">Selected Value: <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-zinc-600 dark:text-zinc-300">{JSON.stringify(singleValue)}</code></span>
            </div>

            {/* Multiple Select */}
            <div className="flex flex-col gap-3">
              <span className="text-xs text-zinc-400 font-semibold">Multiple Select Mode:</span>
              <div className="p-4 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-800 rounded-lg">
                <Tag.Group
                  options={multiOptions}
                  value={multiValue}
                  onChange={setMultiValue}
                  multiple={true}
                  size="md"
                />
              </div>
              <span className="text-xs text-zinc-400">Selected Values: <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-zinc-600 dark:text-zinc-300">{JSON.stringify(multiValue)}</code></span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
