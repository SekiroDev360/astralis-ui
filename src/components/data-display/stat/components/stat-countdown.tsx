import { useState, useEffect, useRef } from "react";
import type { StatCountdownProps } from "../stat.types";

function getRemaining(target: Date | number): number {
  return Math.max(0, Number(target) - Date.now());
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function StatCountdown({
  targetDate,
  onFinish,
  label,
  className = "",
  style,
}: StatCountdownProps) {
  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));
  const finishedRef = useRef(false);

  useEffect(() => {
    if (remaining <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish?.();
      }
      return;
    }
    const id = setInterval(() => {
      const r = getRemaining(targetDate);
      setRemaining(r);
      if (r <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate, onFinish, remaining]);

  return (
    <div
      className={["astralis-flex astralis-flex-col astralis-gap-0.5", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {label && (
        <p className="astralis-text-sm astralis-font-medium astralis-text-content-secondary">
          {label}
        </p>
      )}
      <p className="astralis-text-3xl astralis-font-bold astralis-tabular-nums astralis-text-content-primary astralis-leading-none">
        {remaining <= 0 ? "00:00" : formatMs(remaining)}
      </p>
    </div>
  );
}
StatCountdown.displayName = "StatCountdown";
