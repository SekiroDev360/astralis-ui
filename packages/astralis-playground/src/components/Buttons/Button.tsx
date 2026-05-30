import { useState } from "react";
import { Button, Icon } from "astralis-ui";

export default function ButtonShowcase() {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const toggleLoading = (key: string) => {
    setLoadingMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingMap((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Title & Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Button Component Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Advanced button elements supporting tactile click scaling, strict semantic dark/light mode coloring, left/right icons, square layout auto-mapping, and asynchronous loading spinner states.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Variants Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Visual Style Variants
          </span>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline Option</Button>
            <Button variant="ghost">Ghost Option</Button>
            <Button variant="danger">Danger Action</Button>
          </div>
        </div>

        {/* Sizes Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Dynamic Sizing Layouts
          </span>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="xs" variant="primary">Extra Small (xs)</Button>
            <Button size="sm" variant="primary">Small (sm)</Button>
            <Button size="md" variant="primary">Medium (md)</Button>
            <Button size="lg" variant="primary">Large (lg)</Button>
            <Button size="xl" variant="primary">Extra Large (xl)</Button>
          </div>
        </div>

        {/* Icons & Loading States Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Icons & Asynchronous States
          </span>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" leftIcon={<Icon name="Search" size="xs" />}>
              Search database
            </Button>
            <Button variant="secondary" rightIcon={<Icon name="ChevronDown" size="xs" />}>
              Open menu
            </Button>
            
            {/* Icon Only */}
            <Button variant="outline" leftIcon={<Icon name="Laptop" size="xs" />} aria-label="Device settings" />
            <Button variant="outline" leftIcon={<Icon name="Phone" size="xs" />} aria-label="Call support" />

            {/* Asynchronous Loading Demo */}
            <Button 
              variant="primary" 
              leftIcon={<Icon name="Check" size="xs" />}
              loading={loadingMap["save"]}
              onClick={() => toggleLoading("save")}
            >
              {loadingMap["save"] ? "Saving changes..." : "Click to Save"}
            </Button>

            <Button 
              variant="danger" 
              leftIcon={<Icon name="X" size="xs" />}
              loading={loadingMap["delete"]}
              onClick={() => toggleLoading("delete")}
            >
              {loadingMap["delete"] ? "Deleting..." : "Click to Delete"}
            </Button>
          </div>
        </div>

        {/* Block Button Section */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            4. Block Level Alignment (Full Width)
          </span>
          <div className="flex flex-col gap-3">
            <Button variant="primary" fullWidth>
              Complete checkout process
            </Button>
            <Button variant="outline" fullWidth leftIcon={<Icon name="User" size="xs" />}>
              Sign in with administrative account
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
