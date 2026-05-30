import { useState } from "react";
import { Stat, Button } from "astralis-ui";

export default function StatShowcase() {
  const [countdownKey, setCountdownKey] = useState(0);
  const [targetDate, setTargetDate] = useState(() => Date.now() + 600000); // 10 minutes from now
  const [countdownFinished, setCountdownFinished] = useState(false);

  const resetCountdown = (minutes: number) => {
    setTargetDate(Date.now() + minutes * 600000);
    setCountdownFinished(false);
    setCountdownKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Stat Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium numeric visualization card component supporting prefix unit shorthand, status trends, progress tracking, and live countdowns.
        </p>
      </div>

      {/* Grid of basic and trend stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Basic Currency Stat */}
        <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-150 dark:border-zinc-800 flex flex-col gap-3">
          <Stat size="md">
            <Stat.Label info="Gross revenue across all verified merchant portal accounts.">
              Gross Revenue
            </Stat.Label>
            <Stat.Value prefix="$" suffix="USD">
              128,430.50
            </Stat.Value>
            <Stat.HelpText>Generated in the last 30 business days</Stat.HelpText>
          </Stat>
        </div>

        {/* Positive Trend Stat */}
        <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-150 dark:border-zinc-800 flex flex-col gap-3">
          <Stat size="md">
            <Stat.Label info="Total page visits recorded by analytics trackers.">
              Page Visitors
            </Stat.Label>
            <div className="flex items-baseline justify-between gap-2">
              <Stat.Value suffix="K">
                482.9
              </Stat.Value>
              <Stat.Trend type="increase" value={14.8} />
            </div>
            <Stat.HelpText>Compared to 420.5K monthly average</Stat.HelpText>
          </Stat>
        </div>

        {/* Negative Trend Stat */}
        <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-150 dark:border-zinc-800 flex flex-col gap-3">
          <Stat size="md">
            <Stat.Label info="Average duration users wait for customer support responses.">
              Support Delay
            </Stat.Label>
            <div className="flex items-baseline justify-between gap-2">
              <Stat.Value suffix="min">
                2.4
              </Stat.Value>
              <Stat.Trend type="decrease" value={8.5} />
            </div>
            <Stat.HelpText>Decrease in support response time</Stat.HelpText>
          </Stat>
        </div>

      </div>

      {/* Stats with icons and progress bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Stat with Success Icon & Progress bar */}
        <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-150 dark:border-zinc-800 flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
            <Stat size="md">
              <Stat.Label info="The percentage of automated tests passing successfully.">
                Test Stability
              </Stat.Label>
              <Stat.Value suffix="%">
                98.4
              </Stat.Value>
            </Stat>
            <Stat.Icon colorScheme="success">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L6.777 9.25l-1.97-1.97a.75.75 0 1 0-1.06 1.06L6.28 10.82a.75.75 0 0 0 1.08-.022l4.67-4.67a.75.75 0 0 0-.022-1.08z" />
              </svg>
            </Stat.Icon>
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            <Stat.Progress value={98.4} colorScheme="success" />
            <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 font-medium">
              <span>Goal: 95.0%</span>
              <span>Active Specs</span>
            </div>
          </div>
        </div>

        {/* Stat with Danger Progress bar */}
        <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-150 dark:border-zinc-800 flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
            <Stat size="md">
              <Stat.Label info="Hardware disk storage allocation consumption.">
                Disk Usage
              </Stat.Label>
              <Stat.Value suffix="%">
                87.9
              </Stat.Value>
            </Stat>
            <Stat.Icon colorScheme="danger">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm0 12V3h12v10H2zm4-6a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V7zm4 2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0V9z" />
              </svg>
            </Stat.Icon>
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            <Stat.Progress value={87.9} colorScheme="danger" />
            <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 font-medium">
              <span>Warning Limit: 80%</span>
              <span>Critical Allocation</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Countdown Stat */}
      <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-150 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col gap-1">
          <Stat size="lg">
            <Stat.Countdown
              key={countdownKey}
              targetDate={targetDate}
              onFinish={() => setCountdownFinished(true)}
              label={
                <span className="flex items-center gap-1.5 font-semibold text-zinc-500 dark:text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                  API Access Token TTL
                </span>
              }
            />
          </Stat>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mt-1">
            {countdownFinished ? "Token has expired. Requesting a new key..." : "Refreshes automatically once finished."}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => resetCountdown(0.1)}>
            Set 6s Quick Test
          </Button>
          <Button size="sm" variant="primary" onClick={() => resetCountdown(1)}>
            Set 10m Standard
          </Button>
        </div>
      </div>

    </div>
  );
}
