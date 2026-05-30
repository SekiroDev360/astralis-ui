import { useState } from "react";
import { Steps } from "astralis-ui";

export default function StepsShowcase() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { title: "Personal Info", description: "Name, email and details" },
    { title: "Verification", description: "Confirm your credentials" },
    { title: "Complete", description: "Review and launch project" },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Clickable Steps Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Click any step indicator or title to jump directly to that step. Complete the sequence to finalize setup.
        </p>
      </div>

      <div className="flex w-full items-center justify-center py-6 border-y border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-lg">
        <Steps value={currentStep} onValueChange={setCurrentStep} clickable>
          <Steps.List>
            {steps.map((item, i) => (
              <Steps.Item key={i}>
                <Steps.Indicator />
                <Steps.Content>
                  <Steps.Title>{item.title}</Steps.Title>
                  <Steps.Description>{item.description}</Steps.Description>
                </Steps.Content>
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps>
      </div>

      <div className="p-6 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Status: Interactive</span>
        </div>
        <div className="h-20 flex flex-col justify-center">
          <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-50">{steps[currentStep].title}</h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{steps[currentStep].description}</p>
        </div>
        <div className="flex justify-between gap-4 mt-2">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 text-sm font-medium bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
