import { useState } from "react";
import { Calendar, Text, Button, Tag } from "astralis-ui";

export default function CalendarShowcase() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [selectionMode, setSelectionMode] = useState<"single" | "multiple" | "range">("single");
  const [calendarValue, setCalendarValue] = useState<any>(new Date());
  
  // Quick test references
  const minLimitDate = new Date(new Date().getFullYear(), new Date().getMonth(), 2); // 2nd of current month
  const maxLimitDate = new Date(new Date().getFullYear(), new Date().getMonth(), 28); // 28th of current month

  const handleModeChange = (mode: "single" | "multiple" | "range") => {
    setSelectionMode(mode);
    if (mode === "single") setCalendarValue(new Date());
    else if (mode === "multiple") setCalendarValue([new Date()]);
    else setCalendarValue({ start: new Date(), end: null });
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const formatSelection = () => {
    if (!calendarValue) return "No Selection";
    
    if (calendarValue instanceof Date) {
      return calendarValue.toLocaleDateString();
    }
    
    if (Array.isArray(calendarValue)) {
      if (calendarValue.length === 0) return "No Dates Selected";
      return calendarValue.map((d: Date) => d.toLocaleDateString()).join(", ");
    }
    
    if (calendarValue.start) {
      const start = calendarValue.start.toLocaleDateString();
      const end = calendarValue.end ? calendarValue.end.toLocaleDateString() : "Pending end date...";
      return `${start} — ${end}`;
    }
    
    return "No Selection";
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Calendar Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium fully functional React calendar component supporting cell sizing, single/multiple/range selections, date unavailability parameters, and boundary validations.
        </p>
      </div>

      {/* Dynamic Controls Segment */}
      <div className="flex flex-wrap gap-6 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        
        {/* Selection Modes */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Selection Mode</span>
          <div className="flex gap-2">
            {(["single", "multiple", "range"] as const).map((mode) => (
              <Button
                key={mode}
                size="xs"
                variant={selectionMode === mode ? "primary" : "outline"}
                onClick={() => handleModeChange(mode)}
              >
                {mode.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Cell Size</span>
          <div className="flex gap-2">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <Button
                key={sz}
                size="xs"
                variant={size === sz ? "primary" : "outline"}
                onClick={() => setSize(sz)}
              >
                {sz.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

      </div>

      {/* Selected values label */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-950/30 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Current Selection Output</span>
          <Text size="sm" className="font-bold text-zinc-800 dark:text-zinc-150 mt-0.5">
            {formatSelection()}
          </Text>
        </div>
        <Tag colorScheme="blue" className="uppercase font-bold tracking-wider">{selectionMode} mode</Tag>
      </div>

      {/* Grid of Calendars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Interactive Main Calendar */}
        <div className="flex flex-col gap-4 items-center p-6 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide self-start">
            Interactive Dynamic Calendar
          </h4>
          <div className="py-2">
            <Calendar
              selectionMode={selectionMode}
              value={calendarValue}
              onValueChange={setCalendarValue}
              size={size}
            />
          </div>
        </div>

        {/* Validation and Custom Availability Limits */}
        <div className="flex flex-col gap-6">
          
          {/* Weekends Unavailable */}
          <div className="flex flex-col gap-3 p-5 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl items-center">
            <div className="w-full flex justify-between items-baseline mb-1">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
                Weekend Unavailability filter
              </h4>
              <Tag colorScheme="warning">Business Only</Tag>
            </div>
            <Calendar
              selectionMode="single"
              isDateUnavailable={isWeekend}
              size="sm"
            />
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium text-center self-start mt-2">
              Saturdays and Sundays are fully disabled and excluded from click selection.
            </p>
          </div>

          {/* Date Boundaries (minDate / maxDate) */}
          <div className="flex flex-col gap-3 p-5 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl items-center">
            <div className="w-full flex justify-between items-baseline mb-1">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
                Min / Max Boundary Limits
              </h4>
              <Tag colorScheme="danger">Bounded Bounds</Tag>
            </div>
            <Calendar
              selectionMode="single"
              minDate={minLimitDate}
              maxDate={maxLimitDate}
              size="sm"
            />
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium text-center self-start mt-2">
              Allows date selections strictly between the 2nd and 28th of the current month.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
