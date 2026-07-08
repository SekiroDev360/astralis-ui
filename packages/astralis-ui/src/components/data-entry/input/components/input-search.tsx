import { useRef } from "react";
import type { KeyboardEvent, Ref, RefObject } from "react";
import { InputBase } from "./input";
import { useFieldContext } from "../../field/field.context";
import type { InputSearchProps } from "../input.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { SearchIcon } from "../../../icon/internal-icons";

export function InputSearch({
  onSearch,
  showSearchButton = false,
  className = "",
  onKeyDown,
  ref,
  ...props
}: InputSearchProps & { ref?: Ref<HTMLInputElement> }) {
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as RefObject<HTMLInputElement>) ?? innerRef;
    const field = useFieldContext();

    const isDisabled = props.disabled ?? field?.disabled;
    const isReadOnly = props.readOnly ?? field?.readOnly;

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (isReadOnly) return;
      if (e.key === "Enter") onSearch?.(e.currentTarget.value);
      onKeyDown?.(e);
    };

    const handleSearchClick = () => {
      if (isDisabled || isReadOnly) return;
      onSearch?.(inputRef.current?.value ?? "");
    };

    return (
      <div className="astralis:relative astralis:flex astralis:items-center">
        <span className="astralis:absolute astralis:left-3 astralis:z-10 astralis:flex astralis:items-center astralis:text-label-subtle astralis:pointer-events-none">
          <SearchIcon className="astralis:h-4 astralis:w-4" aria-hidden="true" />
        </span>

        <div className="astralis:w-full">
          <InputBase
            ref={inputRef}
            type="search"
            onKeyDown={handleKeyDown}
            className={astralisMerge("astralis:pl-9", showSearchButton && "astralis:rounded-r-none", className)}
            {...props}
          />
        </div>

        {showSearchButton && (
          <button
            type="button"
            disabled={!!isDisabled || !!isReadOnly}
            onClick={handleSearchClick}
            className="astralis:h-10 astralis:shrink-0 astralis:rounded-r-lg astralis:bg-accent-solid astralis:px-4 astralis:text-sm astralis:font-medium astralis:text-accent-contrast astralis:transition-opacity astralis:hover:opacity-higher astralis:disabled:cursor-not-allowed astralis:disabled:opacity-moderate"
          >
            Search
          </button>
        )}
      </div>
    );
}

InputSearch.displayName = "Input.Search";
