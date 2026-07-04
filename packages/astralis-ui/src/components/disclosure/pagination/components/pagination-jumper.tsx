import { useState, type KeyboardEvent } from "react";
import { usePagination } from "../pagination.context";
import type { PaginationJumperProps } from "../pagination.types";
import { paginationJumperInputVariants } from "../pagination.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

/** A quick-jump input (Ant's showQuickJumper). Press Enter to jump. */
export function PaginationJumper({ className = "", label = "Go to" }: PaginationJumperProps) {
  const { setPage, totalPages, size, disabled } = usePagination();
  const [value, setValue] = useState("");

  const submit = () => {
    const n = parseInt(value, 10);
    if (!Number.isNaN(n)) setPage(n);
    setValue("");
  };

  return (
    <li className="astralis:inline-flex astralis:items-center astralis:gap-2">
      {label && <span className="astralis:text-sm astralis:text-label-muted">{label}</span>}
      <input
        type="number"
        min={1}
        max={totalPages}
        inputMode="numeric"
        aria-label="Jump to page"
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") { e.preventDefault(); submit(); }
        }}
        className={astralisMerge(paginationJumperInputVariants({ size }), className)}
      />
    </li>
  );
}
