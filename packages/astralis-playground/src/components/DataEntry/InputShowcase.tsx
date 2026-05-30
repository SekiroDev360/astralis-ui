import { useState } from "react";
import { Input, InputGroup, Field, Icon } from "astralis-ui";

export default function InputShowcase() {
  const [searchValue, setSearchValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("Premium text area with Character Counter");

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 font-sans">
          Inputs & Textareas
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Flexible text inputs supporting standard validation, disabled and robust read-only states, icon slotting, search triggers, and textarea character counting.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* 1. Visual Variant Styles */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Visual Style Variants
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <Field.Label>Outline (Default)</Field.Label>
              <Input variant="outline" placeholder="Type something..." defaultValue="Standard outline style" />
            </Field>
            <Field>
              <Field.Label>Filled</Field.Label>
              <Input variant="filled" placeholder="Type something..." defaultValue="Filled container style" />
            </Field>
            <Field>
              <Field.Label>Underline</Field.Label>
              <Input variant="underline" placeholder="Type something..." defaultValue="Elegant underline style" />
            </Field>
            <Field>
              <Field.Label>Unstyled</Field.Label>
              <Input variant="unstyled" placeholder="Type something..." defaultValue="Minimalist unstyled style" />
            </Field>
          </div>
        </div>

        {/* 2. Sizes */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Responsive Sizing Layouts
          </span>
          <div className="flex flex-col gap-4">
            <Input size="sm" placeholder="Small input (sm)" />
            <Input size="md" placeholder="Medium input (md - default)" />
            <Input size="lg" placeholder="Large input (lg)" />
          </div>
        </div>

        {/* 3. States: Disabled, ReadOnly, Invalid */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Context Form States (Field-Wired)
          </span>
          
          <div className="flex flex-col gap-6">
            {/* Field disabled */}
            <Field disabled>
              <Field.Label>Disabled Field Context</Field.Label>
              <Input placeholder="Inherits disabled from FieldRoot..." />
              <Field.HelpText>This input cannot be selected or modified.</Field.HelpText>
            </Field>

            {/* Field read-only */}
            <Field readOnly>
              <Field.Label>Read-Only Field Context</Field.Label>
              <Input defaultValue="This text is read-only and inherits context from FieldRoot" />
              <Field.HelpText>ReadOnly inputs are focusable but immutable, using flat backgrounds.</Field.HelpText>
            </Field>

            {/* Field invalid */}
            <Field invalid>
              <Field.Label>Invalid/Error State</Field.Label>
              <Input placeholder="Invalid field..." defaultValue="Incorrect input value" />
              <Field.ErrorText>Please correct this input value to proceed.</Field.ErrorText>
            </Field>
          </div>
        </div>

        {/* 4. Groups with prefixes/suffixes, Password, and Search */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            4. Specialized Types & Prefix Blocks
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <Field.Label>Input Group Prefixes/Suffixes</Field.Label>
              <InputGroup 
                prefix={<Icon name="Laptop" size="xs" className="text-zinc-400" />}
                suffix={<span className="text-xs font-semibold text-zinc-400">USD</span>}
              >
                <Input placeholder="Enter cost amount" />
              </InputGroup>
            </Field>

            <Field>
              <Field.Label>Secure Password Input</Field.Label>
              <Input.Password placeholder="Enter secure key" defaultValue="AstralisSecure123" />
            </Field>

            <Field>
              <Field.Label>Search Input</Field.Label>
              <Input.Search 
                placeholder="Query Astralis UI components..." 
                onSearch={setSearchValue}
                showSearchButton
              />
              {searchValue && (
                <Field.HelpText>
                  Search triggered: <strong className="text-primary-600 font-mono">{searchValue}</strong>
                </Field.HelpText>
              )}
            </Field>
            
            <Field readOnly>
              <Field.Label>Search Input (Read-Only Context)</Field.Label>
              <Input.Search 
                placeholder="Query Astralis UI components..." 
                onSearch={setSearchValue}
                defaultValue="Locked query content"
                showSearchButton
              />
            </Field>
          </div>
        </div>

        {/* 5. Textareas */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            5. Textareas with counters
          </span>
          <div className="flex flex-col gap-4">
            <Field>
              <Field.Label>Character Count Textarea</Field.Label>
              <Input.TextArea 
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                maxLength={100}
                showCount
                placeholder="Type here..."
              />
            </Field>

            <Field readOnly>
              <Field.Label>Read-Only Textarea Context</Field.Label>
              <Input.TextArea 
                defaultValue="This textarea content is fully locked in read-only mode."
                maxLength={100}
                showCount
              />
            </Field>
          </div>
        </div>

      </div>
    </div>
  );
}
