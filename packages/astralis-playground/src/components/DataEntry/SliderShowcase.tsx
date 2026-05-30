import { useState } from "react";
import { Slider, RangeSlider, Field } from "astralis-ui";

const customMarks = [
  { value: 0, label: "0°C" },
  { value: 20, label: "20°C" },
  { value: 37, label: "Body Temp" },
  { value: 50, label: "50°C" },
  { value: 100, label: "Boiling (100°C)" },
];

export default function SliderShowcase() {
  const [sliderVal, setSliderVal] = useState(30);
  const [rangeVal, setRangeVal] = useState<[number, number]>([20, 75]);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 font-sans">
          Sliders & RangeSliders
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Linear scale controls supporting numeric step snapping, value hover tooltips, visual marks, responsive sizes, and contrast-corrected dark mode style tokens.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* 1. Single Slider configurations */}
        <div className="flex flex-col gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Single Slider Toggles
          </span>
          <div className="flex flex-col gap-6">
            
            <Field>
              <Field.Label>Standard Slider (0-100 scale)</Field.Label>
              <div className="pt-2">
                <Slider value={sliderVal} onChange={setSliderVal} />
              </div>
              <Field.HelpText>Current value: {sliderVal}</Field.HelpText>
            </Field>

            <Field>
              <Field.Label>Temperature Slider (with Custom Marks & Labels)</Field.Label>
              <div className="pt-4 pb-4">
                <Slider 
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={20}
                  marks={customMarks}
                />
              </div>
            </Field>

          </div>
        </div>

        {/* 2. Range Slider Configurations */}
        <div className="flex flex-col gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Range Sliders (Dual Thumb)
          </span>
          <div className="flex flex-col gap-6">
            
            <Field>
              <Field.Label>Standard Range Selection scale</Field.Label>
              <div className="pt-2">
                <RangeSlider value={rangeVal} onChange={setRangeVal} />
              </div>
              <Field.HelpText>Range selected: {rangeVal[0]} to {rangeVal[1]}</Field.HelpText>
            </Field>

            <Field>
              <Field.Label>Range Selection with Automatic ticks (step=10)</Field.Label>
              <div className="pt-4 pb-2">
                <RangeSlider 
                  min={0}
                  max={100}
                  step={10}
                  defaultValue={[30, 70]}
                  marks
                />
              </div>
            </Field>

          </div>
        </div>

        {/* 3. Slider Sizes */}
        <div className="flex flex-col gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Visual Slider Sizes
          </span>
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold text-zinc-400">Small (sm)</span>
              <div className="pt-1"><Slider size="sm" defaultValue={40} /></div>
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400">Medium (md)</span>
              <div className="pt-1"><Slider size="md" defaultValue={50} /></div>
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400">Large (lg)</span>
              <div className="pt-1"><Slider size="lg" defaultValue={60} /></div>
            </div>
          </div>
        </div>

        {/* 4. Form states */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            4. Form States (Field-Wired)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <Field disabled>
              <Field.Label>Disabled Slider Group Context</Field.Label>
              <div className="pt-2"><Slider defaultValue={35} /></div>
            </Field>

            <Field readOnly>
              <Field.Label>Read-Only Slider Group Context</Field.Label>
              <div className="pt-2"><Slider defaultValue={55} /></div>
              <Field.HelpText>ReadOnly slider values are visible but thumbs cannot be dragged or adjusted.</Field.HelpText>
            </Field>

            <Field disabled>
              <Field.Label>Disabled RangeSlider</Field.Label>
              <div className="pt-2"><RangeSlider defaultValue={[25, 75]} /></div>
            </Field>

            <Field readOnly>
              <Field.Label>Read-Only RangeSlider</Field.Label>
              <div className="pt-2"><RangeSlider defaultValue={[25, 75]} /></div>
            </Field>

          </div>
        </div>

      </div>
    </div>
  );
}
