import { useState } from "react";
import { Select, MultiSelect, Field } from "astralis-ui";

const frameworkOptions = [
  { value: "react", label: "React Framework" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

const groupedOptions = [
  {
    group: "Frontend Libraries",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    group: "Backend Engines",
    options: [
      { value: "node", label: "Node.js (Express)" },
      { value: "deno", label: "Deno Engine" },
      { value: "bun", label: "Bun Toolkit" },
    ],
  },
];

export default function SelectShowcase() {
  const [singleVal, setSingleVal] = useState<string | number | null>("react");
  const [multiVal, setMultiVal] = useState<Array<string | number>>(["react", "node"]);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 font-sans">
          Select & MultiSelect Dropdowns
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Rich, accessible viewport-portal dropdown overlays supporting option grouping, fuzzy string searching, multi-tag allocations, loaders, and context states.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* 1. Single Select Features */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Single Select Dropdown Features
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <Field.Label>Standard Dropdown (Outline)</Field.Label>
              <Select 
                options={frameworkOptions} 
                value={singleVal} 
                onChange={setSingleVal} 
                placeholder="Select framework"
              />
            </Field>

            <Field>
              <Field.Label>Filled variant + Clearable + Searchable</Field.Label>
              <Select 
                options={frameworkOptions} 
                variant="filled"
                clearable 
                searchable
                placeholder="Search libraries..."
              />
            </Field>

            <Field>
              <Field.Label>Option Group Categorizations</Field.Label>
              <Select 
                options={groupedOptions} 
                searchable
                placeholder="Pick technology"
              />
            </Field>

            <Field>
              <Field.Label>Asynchronous Loading Spinner</Field.Label>
              <Select 
                options={frameworkOptions} 
                loading
                placeholder="Fetching remote database..."
              />
            </Field>
          </div>
        </div>

        {/* 2. Select States */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Single Select States (Field Context)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field disabled>
              <Field.Label>Disabled Select</Field.Label>
              <Select options={frameworkOptions} defaultValue="react" />
            </Field>
            
            <Field readOnly>
              <Field.Label>Read-Only Select</Field.Label>
              <Select options={frameworkOptions} defaultValue="react" />
            </Field>

            <Field invalid>
              <Field.Label>Invalid Select</Field.Label>
              <Select options={frameworkOptions} placeholder="Pick framework" />
              <Field.ErrorText>Invalid selection choice.</Field.ErrorText>
            </Field>
          </div>
        </div>

        {/* 3. MultiSelect Features */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. MultiSelect Tag Dropdowns
          </span>
          
          <div className="flex flex-col gap-6">
            <Field>
              <Field.Label>Standard MultiSelect Tagging</Field.Label>
              <MultiSelect 
                options={frameworkOptions} 
                value={multiVal} 
                onChange={setMultiVal}
                clearable
                placeholder="Choose frontend frameworks..."
              />
            </Field>

            <Field>
              <Field.Label>Grouped + Fuzzy Searching + Max items constraint (3 max)</Field.Label>
              <MultiSelect 
                options={groupedOptions} 
                max={3}
                clearable
                placeholder="Query and select items..."
              />
            </Field>
          </div>
        </div>

        {/* 4. MultiSelect States */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            4. MultiSelect Form States
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field disabled>
              <Field.Label>Disabled MultiSelect</Field.Label>
              <MultiSelect options={frameworkOptions} defaultValue={["react", "vue"]} />
            </Field>
            
            <Field readOnly>
              <Field.Label>Read-Only MultiSelect Context (Locked Tags)</Field.Label>
              <MultiSelect options={frameworkOptions} defaultValue={["react", "vue"]} />
              <Field.HelpText>ReadOnly context blocks option editing and hides the tag deletion icons.</Field.HelpText>
            </Field>
          </div>
        </div>

      </div>
    </div>
  );
}
