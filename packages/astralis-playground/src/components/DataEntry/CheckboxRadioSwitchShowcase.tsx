import { useState } from "react";
import { Checkbox, Radio, Switch, Field } from "astralis-ui";

export default function CheckboxRadioSwitchShowcase() {
  const [checkedItems, setCheckedItems] = useState<string[]>(["react"]);
  const [selectedRadio, setSelectedRadio] = useState<string>("react");
  const [switchState1, setSwitchState1] = useState(true);
  const [switchState2, setSwitchState2] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 font-sans">
          Checkbox, Radio, & Switch Toggles
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Lightweight binary and selection list toggles with keyboard focus outlines (`peer-focus-visible`), sizes, horizontal/vertical distributions, and robust read-only context blocking.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* 1. Checkboxes */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Checkbox Element Configurations
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Standard checkbox states */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-zinc-400">Checkbox States</span>
              <div className="flex flex-wrap gap-4 items-center">
                <Checkbox defaultChecked>Checked</Checkbox>
                <Checkbox>Unchecked</Checkbox>
                <Checkbox indeterminate>Indeterminate</Checkbox>
                <Checkbox invalid defaultChecked>Invalid state</Checkbox>
              </div>
            </div>

            {/* Checkbox sizes */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-zinc-400">Checkbox Sizes</span>
              <div className="flex flex-wrap gap-4 items-center">
                <Checkbox size="sm" defaultChecked>sm (Small)</Checkbox>
                <Checkbox size="md" defaultChecked>md (Medium)</Checkbox>
                <Checkbox size="lg" defaultChecked>lg (Large)</Checkbox>
              </div>
            </div>

            {/* Checkbox Group */}
            <Field>
              <Field.Label>Vertical Checkbox Group</Field.Label>
              <Checkbox.Group value={checkedItems} onChange={setCheckedItems}>
                <Checkbox value="react">React Engine</Checkbox>
                <Checkbox value="vue">Vue Engine</Checkbox>
                <Checkbox value="svelte">Svelte Compiler</Checkbox>
              </Checkbox.Group>
              <Field.HelpText>Selected: {checkedItems.join(", ")}</Field.HelpText>
            </Field>

            {/* Checkbox Group States */}
            <div className="flex flex-col gap-4">
              <Field disabled>
                <Field.Label>Disabled Group Context</Field.Label>
                <Checkbox.Group defaultValue={["react"]}>
                  <Checkbox value="react">React Engine</Checkbox>
                  <Checkbox value="vue">Vue Engine</Checkbox>
                </Checkbox.Group>
              </Field>

              <Field readOnly>
                <Field.Label>Read-Only Group Context (Keyboard Accessible)</Field.Label>
                <Checkbox.Group defaultValue={["react"]}>
                  <Checkbox value="react">React Engine (Locked)</Checkbox>
                  <Checkbox value="vue">Vue Engine (Locked)</Checkbox>
                </Checkbox.Group>
              </Field>
            </div>
          </div>
        </div>

        {/* 2. Radio Elements */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Radio Button Groups
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Radio states & sizes */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-zinc-400">Radio Sizes & States</span>
              <div className="flex flex-wrap gap-4 items-center">
                <Radio size="sm" defaultChecked>sm</Radio>
                <Radio size="md" defaultChecked>md</Radio>
                <Radio size="lg" defaultChecked>lg</Radio>
                <Radio invalid defaultChecked>Invalid State</Radio>
              </div>
            </div>

            {/* Radio Group Horizontal */}
            <Field>
              <Field.Label>Horizontal Radio Group</Field.Label>
              <Radio.Group value={selectedRadio} onChange={setSelectedRadio} orientation="horizontal">
                <Radio value="react">React</Radio>
                <Radio value="vue">Vue</Radio>
                <Radio value="svelte">Svelte</Radio>
              </Radio.Group>
              <Field.HelpText>Selected: {selectedRadio}</Field.HelpText>
            </Field>

            {/* Radio ReadOnly vs Disabled */}
            <Field disabled>
              <Field.Label>Disabled Radio Group</Field.Label>
              <Radio.Group defaultValue="react" orientation="horizontal">
                <Radio value="react">React</Radio>
                <Radio value="vue">Vue</Radio>
              </Radio.Group>
            </Field>

            <Field readOnly>
              <Field.Label>Read-Only Radio Group (Keyboard Accessible)</Field.Label>
              <Radio.Group defaultValue="react" orientation="horizontal">
                <Radio value="react">React (Locked)</Radio>
                <Radio value="vue">Vue (Locked)</Radio>
              </Radio.Group>
              <Field.HelpText>Focusable via Keyboard but state changes are fully blocked.</Field.HelpText>
            </Field>
          </div>
        </div>

        {/* 3. Switch Elements */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Switch Binary Toggles
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Switch sizes and states */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-zinc-400">Switch Sizes</span>
              <div className="flex flex-col gap-3">
                <Switch size="sm" checked={switchState1} onChange={(e) => setSwitchState1(e.target.checked)}>
                  Small Switch (sm)
                </Switch>
                <Switch size="md" checked={switchState2} onChange={(e) => setSwitchState2(e.target.checked)}>
                  Medium Switch (md)
                </Switch>
                <Switch size="lg" defaultChecked>
                  Large Switch (lg)
                </Switch>
              </div>
            </div>

            {/* Switch States (ReadOnly / Disabled / Invalid) */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-zinc-400">Form States</span>
              <div className="flex flex-col gap-3">
                <Field disabled>
                  <Switch defaultChecked>Disabled Switch</Switch>
                </Field>
                
                <Field readOnly>
                  <Switch defaultChecked>Read-Only Switch (Keyboard Accessible)</Switch>
                </Field>

                <Field invalid>
                  <Switch defaultChecked>Invalid Switch</Switch>
                </Field>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
