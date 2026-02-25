import { forwardRef, useRef } from "react";
import { InputBase } from "../input";
import type { InputSearchProps } from "../input.types";

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  (
    { onSearch, showSearchButton = false, className = "", onKeyDown, ...props },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(e.currentTarget.value);
      }
      onKeyDown?.(e);
    };

    const handleSearchClick = () => {
      onSearch?.(inputRef.current?.value ?? "");
    };

    return (
      <div className="astralis-relative astralis-flex astralis-items-center">
        {/* Search icon on the left */}
        <span className="astralis-absolute astralis-left-3 astralis-flex astralis-items-center astralis-text-content-tertiary astralis-pointer-events-none astralis-z-10">
          <svg
            aria-hidden="true"
            className="astralis-h-4 astralis-w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <div
          className={`astralis-w-full [&>input]:astralis-pl-9 ${showSearchButton ? "[&>input]:astralis-rounded-r-none" : ""}`}
        >
          <InputBase
            ref={inputRef}
            type="search"
            onKeyDown={handleKeyDown}
            className={className}
            {...props}
          />
        </div>

        {showSearchButton && (
          <button
            type="button"
            onClick={handleSearchClick}
            className="astralis-h-10 astralis-px-4 astralis-bg-primary-600 astralis-text-white astralis-text-sm astralis-font-medium astralis-rounded-r-lg hover:astralis-bg-primary-700 astralis-transition-colors astralis-shrink-0"
          >
            Search
          </button>
        )}
      </div>
    );
  },
);

InputSearch.displayName = "Input.Search";
