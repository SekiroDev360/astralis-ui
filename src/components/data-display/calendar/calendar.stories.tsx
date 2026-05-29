import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AstralisProvider } from "../../../theme";
import { Calendar } from "./index";
import type { CalendarRangeValue } from "./calendar.types";

const meta: Meta<typeof Calendar> = {
  title: "Components/Data Display/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Calendar displays dates in a month grid with keyboard-friendly controls and Chakra-style compound parts. " +
          "Supports `single`, `multiple`, and `range` selection modes.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => <Calendar defaultMonth={new Date(2026, 2, 1)} />,
  parameters: {
    docs: {
      description: {
        story:
          "Default month view with single-date selection and outside days shown.",
      },
    },
  },
};

export const SingleControlled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 2, 8));

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <Calendar
          selectionMode="single"
          value={value}
          onValueChange={(next) => {
            setValue(next instanceof Date ? next : null);
          }}
          defaultMonth={new Date(2026, 2, 1)}
        />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Selected: {value ? value.toDateString() : "None"}
        </p>
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<Date[]>([
      new Date(2026, 2, 3),
      new Date(2026, 2, 8),
      new Date(2026, 2, 21),
    ]);

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <Calendar
          selectionMode="multiple"
          value={value}
          onValueChange={(next) => {
            setValue(Array.isArray(next) ? next : []);
          }}
          defaultMonth={new Date(2026, 2, 1)}
        />
        <p className="astralis-text-sm astralis-text-content-secondary">
          {value.length} date(s) selected
        </p>
      </div>
    );
  },
};

export const RangeSelection: Story = {
  render: () => {
    const [value, setValue] = useState<CalendarRangeValue>({
      start: new Date(2026, 2, 10),
      end: new Date(2026, 2, 15),
    });

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <Calendar
          selectionMode="range"
          value={value}
          onValueChange={(next) => {
            if (next && !Array.isArray(next) && !(next instanceof Date)) {
              setValue(next);
            }
          }}
          defaultMonth={new Date(2026, 2, 1)}
        />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Range: {value.start ? value.start.toDateString() : "-"} to {" "}
          {value.end ? value.end.toDateString() : "-"}
        </p>
      </div>
    );
  },
};

export const DisabledDates: Story = {
  render: () => (
    <Calendar
      defaultMonth={new Date(2026, 2, 1)}
      minDate={new Date(2026, 2, 5)}
      maxDate={new Date(2026, 2, 28)}
      isDateUnavailable={(date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `minDate`, `maxDate`, and `isDateUnavailable` to block unavailable days (weekends in this example).",
      },
    },
  },
};
