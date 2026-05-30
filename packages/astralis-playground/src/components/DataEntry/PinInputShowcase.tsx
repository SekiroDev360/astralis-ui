import { useState } from "react";
import { PinInput, Field } from "astralis-ui";

export default function PinInputShowcase() {
  const [completeLog1, setCompleteLog1] = useState("");
  const [completeLog2, setCompleteLog2] = useState("");

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 font-sans">
          PinInput One-Time Code Toggles
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Segmented alphanumeric character fields supporting numeric validation, character masking (password mode), auto-focus transitions, and read-only state checks.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* 1. Basic Configurations */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Core Validation & Character Masks
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Field>
              <Field.Label>Standard 4-Digit Numeric (autofocus triggerable)</Field.Label>
              <PinInput 
                type="numeric" 
                length={4} 
                onComplete={setCompleteLog1}
              />
              {completeLog1 && (
                <Field.HelpText>
                  PIN completed: <strong className="text-primary-600 font-mono">{completeLog1}</strong>
                </Field.HelpText>
              )}
            </Field>

            <Field>
              <Field.Label>Masked Secure PIN (6-Length password input)</Field.Label>
              <PinInput 
                type="numeric" 
                length={6} 
                mask 
                onComplete={setCompleteLog2}
              />
              {completeLog2 && (
                <Field.HelpText>
                  Secure code length verified: <strong className="text-emerald-600 font-mono">{completeLog2.length} digits</strong>
                </Field.HelpText>
              )}
            </Field>

            <Field>
              <Field.Label>Alpha Only (A-Z)</Field.Label>
              <PinInput type="alpha" length={4} placeholder="A" />
            </Field>

            <Field>
              <Field.Label>Alphanumeric (Letters & Numbers)</Field.Label>
              <PinInput type="alphanumeric" length={5} placeholder="-" />
            </Field>

          </div>
        </div>

        {/* 2. Responsive Sizes */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Visual Sizing Layouts
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <span className="text-xs font-semibold text-zinc-400 w-16">Small (sm)</span>
              <PinInput size="sm" length={4} />
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs font-semibold text-zinc-400 w-16">Medium (md)</span>
              <PinInput size="md" length={4} />
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs font-semibold text-zinc-400 w-16">Large (lg)</span>
              <PinInput size="lg" length={4} />
            </div>
          </div>
        </div>

        {/* 3. Segmented States */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Context Form States (Field-Wired)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Field disabled>
              <Field.Label>Disabled PIN Context</Field.Label>
              <PinInput length={4} defaultValue="1234" />
            </Field>

            <Field readOnly>
              <Field.Label>Read-Only PIN Context</Field.Label>
              <PinInput length={4} defaultValue="1234" />
              <Field.HelpText>Locked box state prevents input/backspace while maintaining layout.</Field.HelpText>
            </Field>

            <Field invalid>
              <Field.Label>Invalid PIN Context</Field.Label>
              <PinInput length={4} defaultValue="12" />
              <Field.ErrorText>Incomplete secure authorization pin.</Field.ErrorText>
            </Field>

          </div>
        </div>

      </div>
    </div>
  );
}
